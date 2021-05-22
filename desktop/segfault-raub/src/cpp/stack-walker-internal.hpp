#ifndef _STACK_WALKER_INTERNAL_HPP_
#define _STACK_WALKER_INTERNAL_HPP_


#define TTBUFLEN 8096

class StackWalkerInternal {
public:
	StackWalkerInternal(StackWalker *parent, HANDLE hProcess) {
		m_parent = parent;
		m_hDbhHelp = NULL;
		pSC = NULL;
		m_hProcess = hProcess;
		m_szSymPath = NULL;
		pSFTA = NULL;
		pSGLFA = NULL;
		pSGMB = NULL;
		pSGMI = NULL;
		pSGO = NULL;
		pSGSFA = NULL;
		pSI = NULL;
		pSLM = NULL;
		pSSO = NULL;
		pSW = NULL;
		pUDSN = NULL;
		pSGSP = NULL;
	}
	
	
	~StackWalkerInternal() {
		if (pSC != NULL) {
			pSC(m_hProcess); // SymCleanup
		}
		if (m_hDbhHelp != NULL) {
			FreeLibrary(m_hDbhHelp);
		}
		m_hDbhHelp = NULL;
		m_parent = NULL;
		if(m_szSymPath != NULL) {
			free(m_szSymPath);
		}
		m_szSymPath = NULL;
	}
	
	
	bool loadDbgHelpDll() {
		// First try to load the newsest one from
		TCHAR szTemp[4096];
		// But before we do this, we first check if the ".local" file exists
		if (GetModuleFileName(NULL, szTemp, 4096) > 0) {
			_tcscat_s(szTemp, _T(".local"));
			if (GetFileAttributes(szTemp) == INVALID_FILE_ATTRIBUTES) {
				// ".local" file does not exist, so we can try to load the dbghelp.dll
				// from the "Debugging Tools for Windows"
				if (GetEnvironmentVariable(_T("ProgramFiles"), szTemp, 4096) > 0) {
					_tcscat_s(szTemp, _T("\\Debugging Tools for Windows\\dbghelp.dll"));
					// now check if the file exists:
					if (GetFileAttributes(szTemp) != INVALID_FILE_ATTRIBUTES) {
						m_hDbhHelp = LoadLibrary(szTemp);
					}
				}
					// Still not found? Then try to load the 64-Bit version:
				if (
					(m_hDbhHelp == NULL) &&
					(GetEnvironmentVariable(_T("ProgramFiles"), szTemp, 4096) > 0)
				) {
					_tcscat_s(szTemp, _T("\\Debugging Tools for Windows 64-Bit\\dbghelp.dll"));
					if (GetFileAttributes(szTemp) != INVALID_FILE_ATTRIBUTES) {
						m_hDbhHelp = LoadLibrary(szTemp);
					}
				}
			}
		}
		
		// if not already loaded, try to load a default-one
		if (m_hDbhHelp == NULL) {
			m_hDbhHelp = LoadLibrary(_T("dbghelp.dll"));
		}
		
		return m_hDbhHelp != NULL;
		
	}
	
	
	bool loadDbgFuncs() {
		
		pSI = (tSI) GetProcAddress(m_hDbhHelp, "SymInitialize");
		pSC = (tSC) GetProcAddress(m_hDbhHelp, "SymCleanup");
	
		pSW = (tSW) GetProcAddress(m_hDbhHelp, "StackWalk64");
		pSGO = (tSGO) GetProcAddress(m_hDbhHelp, "SymGetOptions");
		pSSO = (tSSO) GetProcAddress(m_hDbhHelp, "SymSetOptions");
	
		pSFTA = (tSFTA) GetProcAddress(m_hDbhHelp, "SymFunctionTableAccess64");
		pSGLFA = (tSGLFA) GetProcAddress(m_hDbhHelp, "SymGetLineFromAddr64");
		pSGMB = (tSGMB) GetProcAddress(m_hDbhHelp, "SymGetModuleBase64");
		pSGMI = (tSGMI) GetProcAddress(m_hDbhHelp, "SymGetModuleInfo64");
		//pSGMI_V3 = (tSGMI_V3) GetProcAddress(m_hDbhHelp, "SymGetModuleInfo64");
		pSGSFA = (tSGSFA) GetProcAddress(m_hDbhHelp, "SymGetSymFromAddr64");
		pUDSN = (tUDSN) GetProcAddress(m_hDbhHelp, "UnDecorateSymbolName");
		pSLM = (tSLM) GetProcAddress(m_hDbhHelp, "SymLoadModule64");
		pSGSP =(tSGSP) GetProcAddress(m_hDbhHelp, "SymGetSearchPath");
		
		return !(
			pSC == NULL || pSFTA == NULL || pSGMB == NULL || pSGMI == NULL ||
			pSGO == NULL || pSGSFA == NULL || pSI == NULL || pSSO == NULL ||
			pSW == NULL || pUDSN == NULL || pSLM == NULL
		);
		
	}
	
	
	BOOL Init(LPCSTR szSymPath) {
		if (m_parent == NULL) {
			return FALSE;
		}
		
		// Dynamically load the Entry-Points for dbghelp.dll:
		if (!loadDbgHelpDll()) {
			return FALSE;
		}
		
		if (!loadDbgFuncs()) {
			FreeLibrary(m_hDbhHelp);
			m_hDbhHelp = NULL;
			pSC = NULL;
			return FALSE;
		}
		
		// SymInitialize
		if (szSymPath != NULL) {
			m_szSymPath = _strdup(szSymPath);
		}
		if (this->pSI(m_hProcess, m_szSymPath, FALSE) == FALSE) {
			GetLastError();
		}
		
		DWORD symOptions = this->pSGO(); // SymGetOptions
		symOptions |= SYMOPT_LOAD_LINES;
		symOptions |= SYMOPT_FAIL_CRITICAL_ERRORS;
		//symOptions |= SYMOPT_NO_PROMPTS;
		// SymSetOptions
		symOptions = this->pSSO(symOptions);
		
		char buf[STACKWALK_MAX_NAMELEN] = {0};
		if (this->pSGSP != NULL) {
			if (
				this->pSGSP(m_hProcess, buf, STACKWALK_MAX_NAMELEN) == FALSE
			) {
				GetLastError();
			}
		}
		
		return TRUE;
	}
	
	
	StackWalker *m_parent;
	
	HMODULE m_hDbhHelp;
	HANDLE m_hProcess;
	LPSTR m_szSymPath;
	
	struct IMAGEHLP_MODULE64_V2 {
		DWORD    SizeOfStruct;           // set to sizeof(IMAGEHLP_MODULE64)
		DWORD64  BaseOfImage;            // base load address of module
		DWORD    ImageSize;              // virtual size of the loaded module
		DWORD    TimeDateStamp;          // date/time stamp from pe header
		DWORD    CheckSum;               // checksum from the pe header
		DWORD    NumSyms;                // number of symbols in the symbol table
		SYM_TYPE SymType;                // type of symbols loaded
		CHAR     ModuleName[32];         // module name
		CHAR     ImageName[256];         // image name
		CHAR     LoadedImageName[256];   // symbol file name
	};
	
	// SymCleanup()
	typedef BOOL (__stdcall *tSC)(IN HANDLE hProcess);
	tSC pSC;
	
	// SymFunctionTableAccess64()
	typedef PVOID (__stdcall *tSFTA)(HANDLE hProcess, DWORD64 AddrBase);
	tSFTA pSFTA;
	
	// SymGetLineFromAddr64()
	typedef BOOL (__stdcall *tSGLFA)(IN HANDLE hProcess, IN DWORD64 dwAddr,
		OUT PDWORD pdwDisplacement, OUT PIMAGEHLP_LINE64 Line);
	tSGLFA pSGLFA;
	
	// SymGetModuleBase64()
	typedef DWORD64 (__stdcall *tSGMB)(IN HANDLE hProcess, IN DWORD64 dwAddr);
	tSGMB pSGMB;
	
	// SymGetModuleInfo64()
	typedef BOOL (__stdcall *tSGMI)(
		IN HANDLE hProcess, IN DWORD64 dwAddr, OUT IMAGEHLP_MODULE64_V2 *ModuleInfo
	);
	tSGMI pSGMI;
	
	// SymGetOptions()
	typedef DWORD (__stdcall *tSGO)(VOID);
	tSGO pSGO;
	
	// SymGetSymFromAddr64()
	typedef BOOL (__stdcall *tSGSFA)(IN HANDLE hProcess, IN DWORD64 dwAddr,
		OUT PDWORD64 pdwDisplacement, OUT PIMAGEHLP_SYMBOL64 Symbol);
	tSGSFA pSGSFA;
	
	// SymInitialize()
	typedef BOOL (__stdcall *tSI)(
		IN HANDLE hProcess, IN PSTR UserSearchPath, IN BOOL fInvadeProcess
	);
	tSI pSI;
	
	// SymLoadModule64()
	typedef DWORD64 (__stdcall *tSLM)(IN HANDLE hProcess, IN HANDLE hFile,
		IN PSTR ImageName, IN PSTR ModuleName, IN DWORD64 BaseOfDll, IN DWORD SizeOfDll);
	tSLM pSLM;
	
	// SymSetOptions()
	typedef DWORD (__stdcall *tSSO)(IN DWORD SymOptions);
	tSSO pSSO;
	
	// StackWalk64()
	typedef BOOL (__stdcall *tSW)(
		DWORD MachineType,
		HANDLE hProcess,
		HANDLE hThread,
		LPSTACKFRAME64 StackFrame,
		PVOID ContextRecord,
		PREAD_PROCESS_MEMORY_ROUTINE64 ReadMemoryRoutine,
		PFUNCTION_TABLE_ACCESS_ROUTINE64 FunctionTableAccessRoutine,
		PGET_MODULE_BASE_ROUTINE64 GetModuleBaseRoutine,
		PTRANSLATE_ADDRESS_ROUTINE64 TranslateAddress);
	tSW pSW;
	
	// UnDecorateSymbolName()
	typedef DWORD (__stdcall WINAPI *tUDSN)(PCSTR DecoratedName, PSTR UnDecoratedName,
		DWORD UndecoratedLength, DWORD Flags);
	tUDSN pUDSN;
	
	typedef BOOL (__stdcall WINAPI *tSGSP)(
		HANDLE hProcess, PSTR SearchPath, DWORD SearchPathLength
	);
	tSGSP pSGSP;
	
	
private:
	// **************************************** ToolHelp32 ************************
	#define MAX_MODULE_NAME32 255
	#define TH32CS_SNAPMODULE   0x00000008
	#pragma pack(push, 8)
	typedef struct tagMODULEENTRY32 {
			DWORD   dwSize;
			DWORD   th32ModuleID;       // This module
			DWORD   th32ProcessID;      // owning process
			DWORD   GlblcntUsage;       // Global usage count on the module
			DWORD   ProccntUsage;       // Module usage count in th32ProcessID's context
			BYTE  * modBaseAddr;        // Base address of module in th32ProcessID's context
			DWORD   modBaseSize;        // Size in bytes of module starting at modBaseAddr
			HMODULE hModule;            // The hModule of this module in th32ProcessID's context
			char    szModule[MAX_MODULE_NAME32 + 1];
			char    szExePath[MAX_PATH];
	} MODULEENTRY32;
	typedef MODULEENTRY32 *  PMODULEENTRY32;
	typedef MODULEENTRY32 *  LPMODULEENTRY32;
	#pragma pack(pop)
	
	BOOL GetModuleListTH32(HANDLE hProcess, DWORD pid) {
		// CreateToolhelp32Snapshot()
		typedef HANDLE (__stdcall *tCT32S)(DWORD dwFlags, DWORD th32ProcessID);
		// Module32First()
		typedef BOOL (__stdcall *tM32F)(HANDLE hSnapshot, LPMODULEENTRY32 lpme);
		// Module32Next()
		typedef BOOL (__stdcall *tM32N)(HANDLE hSnapshot, LPMODULEENTRY32 lpme);
		
		// try both dlls...
		const TCHAR *dllname[] = { _T("kernel32.dll"), _T("tlhelp32.dll") };
		HINSTANCE hToolhelp = NULL;
		tCT32S pCT32S = NULL;
		tM32F pM32F = NULL;
		tM32N pM32N = NULL;
		
		HANDLE hSnap;
		MODULEENTRY32 me;
		me.dwSize = sizeof(me);
		BOOL keepGoing;
		size_t i;
		
		for (i = 0; i < (sizeof(dllname) / sizeof(dllname[0])); i++) {
			hToolhelp = LoadLibrary(dllname[i]);
			if (hToolhelp == NULL)
				continue;
			pCT32S = (tCT32S) GetProcAddress(hToolhelp, "CreateToolhelp32Snapshot");
			pM32F = (tM32F) GetProcAddress(hToolhelp, "Module32First");
			pM32N = (tM32N) GetProcAddress(hToolhelp, "Module32Next");
			if ((pCT32S != NULL) && (pM32F != NULL) && (pM32N != NULL))
				break; // found the functions!
			FreeLibrary(hToolhelp);
			hToolhelp = NULL;
		}
		
		if (hToolhelp == NULL) {
			return FALSE;
		}
		
		hSnap = pCT32S(TH32CS_SNAPMODULE, pid);
		if (hSnap == (HANDLE) -1) {
			return FALSE;
		}

		keepGoing = !!pM32F(hSnap, &me);
		int cnt = 0;
		while (keepGoing) {
			this->LoadModule(hProcess, me.szExePath, me.szModule, (DWORD64) me.modBaseAddr, me.modBaseSize);
			cnt++;
			keepGoing = !!pM32N(hSnap, &me);
		}
		CloseHandle(hSnap);
		FreeLibrary(hToolhelp);
		if (cnt <= 0)
			return FALSE;
		return TRUE;
	} // GetModuleListTH32
	
	
	// **************************************** PSAPI ************************
	
	typedef struct _MODULEINFO {
			LPVOID lpBaseOfDll;
			DWORD SizeOfImage;
			LPVOID EntryPoint;
	} MODULEINFO, *LPMODULEINFO;
	
	// EnumProcessModules()
	typedef BOOL (__stdcall *tEPM)(
		HANDLE hProcess, HMODULE *lphModule, DWORD cb, LPDWORD lpcbNeeded
	);
	// GetModuleFileNameEx()
	typedef DWORD (__stdcall *tGMFNE)(
		HANDLE hProcess, HMODULE hModule, LPSTR lpFilename, DWORD nSize
	);
	// GetModuleBaseName()
	typedef DWORD (__stdcall *tGMBN)(
		HANDLE hProcess, HMODULE hModule, LPSTR lpFilename, DWORD nSize
	);
	// GetModuleInformation()
	typedef BOOL (__stdcall *tGMI)(
		HANDLE hProcess, HMODULE hModule, LPMODULEINFO pmi, DWORD nSize
	);
	
	
	bool loadPsapi(
		HINSTANCE *hPsapi,
		tEPM *pEPM,
		tGMFNE *pGMFNE,
		tGMBN *pGMBN,
		tGMI *pGMI
	) {
		
		*hPsapi = LoadLibrary(_T("psapi.dll"));
		if (*hPsapi == NULL) {
			return false;
		}
		
		*pEPM = (tEPM) GetProcAddress(*hPsapi, "EnumProcessModules");
		*pGMFNE = (tGMFNE) GetProcAddress(*hPsapi, "GetModuleFileNameExA");
		*pGMBN = (tGMFNE) GetProcAddress(*hPsapi, "GetModuleBaseNameA");
		*pGMI = (tGMI) GetProcAddress(*hPsapi, "GetModuleInformation");
		
		if (
			*pEPM == NULL ||
			*pGMFNE == NULL ||
			*pGMBN == NULL ||
			*pGMI == NULL
		) {
			// we couldn't find all functions
			FreeLibrary(*hPsapi);
			return false;
		}
		
		return true;
		
	}
	
	
	bool allocMods(HMODULE **hMods, char **tt, char **tt2) {
		*hMods = reinterpret_cast<HMODULE*>(
			malloc(sizeof(HMODULE) * (TTBUFLEN / sizeof HMODULE))
		);
		*tt = reinterpret_cast<char*>(
			malloc(sizeof(char) * TTBUFLEN)
		);
		*tt2 = reinterpret_cast<char*>(
			malloc(sizeof(char) * TTBUFLEN)
		);
		return !(*hMods == NULL || *tt == NULL || *tt2 == NULL);
	}
	
	
	void freeMods(HMODULE *hMods, char *tt, char *tt2) {
		if (tt2 != NULL) {
			free(tt2);
		}
		if (tt != NULL) {
			free(tt);
		}
		if (hMods != NULL) {
			free(hMods);
		}
	}
	
	
	BOOL GetModuleListPSAPI(HANDLE hProcess) {
		
		DWORD i;
		DWORD cbNeeded;
		MODULEINFO mi;
		
		int cnt = 0;
		
		HINSTANCE hPsapi;
		tEPM pEPM;
		tGMFNE pGMFNE;
		tGMBN pGMBN;
		tGMI pGMI;
		if (!loadPsapi(&hPsapi, &pEPM, &pGMFNE, &pGMBN, &pGMI)) {
			return FALSE;
		}
		
		HMODULE *hMods;
		char *tt;
		char *tt2;
		if (!allocMods(&hMods, &tt, &tt2)) {
			goto cleanup;
		}
		
		if (!pEPM(hProcess, hMods, TTBUFLEN, &cbNeeded)) {
			//_ftprintf(fLogFile, _T("%lu: EPM failed, GetLastError = %lu\n"), g_dwShowCount, gle);
			goto cleanup;
		}
		
		if (cbNeeded > TTBUFLEN) {
			//_ftprintf(fLogFile, _T("%lu: More than %lu module handles. Huh?\n"), g_dwShowCount, lenof(hMods));
			goto cleanup;
		}
		
		for (i = 0; i < cbNeeded / sizeof hMods[0]; i++) {
			// base address, size
			pGMI(hProcess, hMods[i], &mi, sizeof mi);
			// image file name
			tt[0] = 0;
			pGMFNE(hProcess, hMods[i], tt, TTBUFLEN);
			// module name
			tt2[0] = 0;
			pGMBN(hProcess, hMods[i], tt2, TTBUFLEN);
			
			DWORD dwRes = this->LoadModule(
				hProcess, tt, tt2, (DWORD64) mi.lpBaseOfDll, mi.SizeOfImage
			);
			if (dwRes != ERROR_SUCCESS) {
				GetLastError();
			}
			cnt++;
		}
		
	cleanup:
		if (hPsapi != NULL) {
			FreeLibrary(hPsapi);
		}
		freeMods(hMods, tt, tt2);
		return cnt != 0;
	}  // GetModuleListPSAPI
	
	
	ULONGLONG getFileVersion(CHAR *szImg) {
		ULONGLONG fileVersion = 0;
		// try to retrive the file-version:
		if ((this->m_parent->m_options & StackWalker::RetrieveFileVersion) != 0) {
			VS_FIXEDFILEINFO *fInfo = NULL;
			DWORD dwHandle;
			DWORD dwSize = GetFileVersionInfoSizeA(szImg, &dwHandle);
			if (dwSize > 0) {
				LPVOID vData = malloc(dwSize);
				if (vData != NULL) {
					if (GetFileVersionInfoA(szImg, dwHandle, dwSize, vData) != 0) {
						UINT len;
						TCHAR szSubBlock[] = _T("\\");
						if (
							VerQueryValue(
								vData,
								szSubBlock,
								reinterpret_cast<LPVOID*>(&fInfo),
								&len
							) == 0
						) {
							fInfo = NULL;
						} else {
							fileVersion = ((ULONGLONG)fInfo->dwFileVersionLS) +
								((ULONGLONG)fInfo->dwFileVersionMS << 32);
						}
					}
					free(vData);
				}
			}
		}
		return fileVersion;
	}
	
	
	inline void setSymType(SYM_TYPE SymType, const char **szSymType) {
		switch(SymType) {
			case SymNone:
				*szSymType = "-nosymbols-";
				break;
			case SymCoff:
				*szSymType = "COFF";
				break;
			case SymCv:
				*szSymType = "CV";
				break;
			case SymPdb:
				*szSymType = "PDB";
				break;
			case SymExport:
				*szSymType = "-exported-";
				break;
			case SymDeferred:
				*szSymType = "-deferred-";
				break;
			case SymSym:
				*szSymType = "SYM";
				break;
			case 8: //SymVirtual:
				*szSymType = "Virtual";
				break;
			case 9: // SymDia:
				*szSymType = "DIA";
				break;
		}
	}
	
	
	DWORD LoadModule(
		HANDLE hProcess,
		LPCSTR img,
		LPCSTR mod,
		DWORD64 baseAddr,
		DWORD size
	) {
		CHAR *szImg = _strdup(img);
		CHAR *szMod = _strdup(mod);
		DWORD result = ERROR_SUCCESS;
		if ((szImg == NULL) || (szMod == NULL)) {
			result = ERROR_NOT_ENOUGH_MEMORY;
		} else if (pSLM(hProcess, 0, szImg, szMod, baseAddr, size) == 0) {
			result = GetLastError();
		}
		
		if ((m_parent != NULL) && (szImg != NULL)) {
			// try to retrive the file-version:
			ULONGLONG fileVersion = getFileVersion(szImg);
			
			// Retrive some additional-infos about the module
			IMAGEHLP_MODULE64_V2 Module;
			const char *szSymType = "-unknown-";
			if (this->GetModuleInfo(hProcess, baseAddr, &Module) != FALSE) {
				setSymType(Module.SymType, &szSymType);
			}
			this->m_parent->OnLoadModule(
				img, mod, baseAddr, size,
				result, szSymType, Module.LoadedImageName, fileVersion
			);
		}
		if (szImg != NULL) {
			free(szImg);
		}
		if (szMod != NULL) {
			free(szMod);
		}
		return result;
	}
	
	
public:
	BOOL LoadModules(HANDLE hProcess, DWORD dwProcessId) {
		// first try toolhelp32
		if (GetModuleListTH32(hProcess, dwProcessId))
			return true;
		// then try psapi
		return GetModuleListPSAPI(hProcess);
	}
	
	
	BOOL GetModuleInfo(
		HANDLE hProcess,
		DWORD64 baseAddr,
		IMAGEHLP_MODULE64_V2 *pModuleInfo
	) {
		if(this->pSGMI == NULL) {
			SetLastError(ERROR_DLL_INIT_FAILED);
			return FALSE;
		}
		// First try to use the larger ModuleInfo-Structure
//    memset(pModuleInfo, 0, sizeof(IMAGEHLP_MODULE64_V3));
//    pModuleInfo->SizeOfStruct = sizeof(IMAGEHLP_MODULE64_V3);
//    if (this->pSGMI_V3 != NULL)
//    {
//      if (this->pSGMI_V3(hProcess, baseAddr, pModuleInfo) != FALSE)
//        return TRUE;
//      // check if the parameter was wrong (size is bad...)
//      if (GetLastError() != ERROR_INVALID_PARAMETER)
//        return FALSE;
//    }
		// could not retrive the bigger structure, try with the smaller one (as defined in VC7.1)...
		pModuleInfo->SizeOfStruct = sizeof(IMAGEHLP_MODULE64_V2);
		// reserve enough memory, so the bug in v6.3.5.1 does not lead to memory-overwrites...
		void *pData = malloc(4096);
		if (pData == NULL) {
			SetLastError(ERROR_NOT_ENOUGH_MEMORY);
			return FALSE;
		}
		memcpy(pData, pModuleInfo, sizeof(IMAGEHLP_MODULE64_V2));
		if (
			this->pSGMI(
				hProcess, baseAddr, reinterpret_cast<IMAGEHLP_MODULE64_V2*>(pData)
			) != FALSE
		) {
			// only copy as much memory as is reserved...
			memcpy(pModuleInfo, pData, sizeof(IMAGEHLP_MODULE64_V2));
			pModuleInfo->SizeOfStruct = sizeof(IMAGEHLP_MODULE64_V2);
			free(pData);
			return TRUE;
		}
		free(pData);
		SetLastError(ERROR_DLL_INIT_FAILED);
		return FALSE;
	}
};


#endif /* _STACK_WALKER_INTERNAL_HPP_ */
