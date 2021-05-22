#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>

#include <time.h>
#include <uv.h>

#ifdef _WIN32
#include "stack-walker.hpp"
#include <io.h>
#include <process.h>
#include <windows.h>
#else
#include <assert.h>
#include <errno.h>
#include <execinfo.h>
#include <signal.h>
#include <stdarg.h>
#include <unistd.h>
#include <pthread.h>
#endif

#include "segfault-handler.hpp"


#define STDERR_FD 2

#ifdef _WIN32
#define CLOSE _close
#define GETPID _getpid
#define O_FLAGS _O_CREAT | _O_APPEND | _O_WRONLY
#define OPEN _open
#define S_FLAGS _S_IWRITE
#define SEGFAULT_HANDLER LONG CALLBACK segfault_handler(PEXCEPTION_POINTERS exceptionInfo)
#define SNPRINTF _snprintf
#define WRITE _write
#else
#define CLOSE close
#define GETPID getpid
#define O_FLAGS O_CREAT | O_APPEND | O_WRONLY
#define OPEN open
#define S_FLAGS S_IRUSR | S_IRGRP | S_IROTH
#define SEGFAULT_HANDLER static void segfault_handler(int sig, siginfo_t *si, void *unused)
#define SNPRINTF snprintf
#define WRITE write
#endif

#define BUFF_SIZE 256


SEGFAULT_HANDLER {
	size_t address;
	#ifndef _WIN32
		void *array[32]; // Array to store backtrace symbols
		size_t size; // To store the size of the stack backtrace
	#endif
	char sbuff[BUFF_SIZE];
	int n; // chars written to buffer
	int fd;
	int pid;
	time_t result;
	
	pid = GETPID();
	
	if(access("segfault.log", F_OK) != -1) {
		fd = OPEN("segfault.log", O_FLAGS, S_FLAGS);
		result = time(NULL);
		n = SNPRINTF(sbuff, BUFF_SIZE, "\n\nAt %s", ctime(&result));
		WRITE(fd, sbuff, n);
	} else {
		fprintf(
			stderr,
			"NOTE: The segfault won't be logged into a file, unless 'segfault.log' exists.\n"
		);
		fd = 0;
	}
	
	
	#ifdef _WIN32
		address = reinterpret_cast<size_t>(exceptionInfo->ExceptionRecord->ExceptionAddress);
	#else
		address = reinterpret_cast<size_t>(si->si_addr);
	#endif
	
	// Write the header line
	uint64_t outAddr = static_cast<uint64_t>(address);
	n = SNPRINTF(
		sbuff,
		BUFF_SIZE,
		"\nPID %d received SIGSEGV for address: 0x%llx\n",
		pid,
		outAddr
	);
	
	if(fd > 0) {
		if (WRITE(fd, sbuff, n) != n) {
			fprintf(stderr, "SegfaultHandler: Error writing to file\n");
		}
	}
	fprintf(stderr, "%s", sbuff);
	
	#ifdef _WIN32
		// will generate the stack trace and write to fd and stderr
		StackWalker sw(fd);
		sw.ShowCallstack();
	#else
		// Write the Backtrace
		size = backtrace(array, 32);
		if(fd > 0) backtrace_symbols_fd(array, size, fd);
		backtrace_symbols_fd(array, size, STDERR_FD);
	#endif
	
	CLOSE(fd);
	
	#ifdef _WIN32
		return EXCEPTION_EXECUTE_HANDLER;
	#endif
}

// create some stack frames to inspect from CauseSegfault
#ifndef _WIN32
__attribute__ ((noinline))
#else
__declspec(noinline)
#endif
void segfault_stack_frame_1() {
	int *foo = reinterpret_cast<int*>(1);
	fprintf(stderr, "SegfaultHandler: about to dereference NULL (will cause a SIGSEGV)\n");
	*foo = 78; // trigger a SIGSEGV
}

#ifndef _WIN32
__attribute__ ((noinline))
#else
__declspec(noinline)
#endif
void segfault_stack_frame_2(void) {
	// use a function pointer to thwart inlining
	void (*fn_ptr)() = segfault_stack_frame_1;
	fn_ptr();
}

JS_METHOD(CauseSegfault) { NAPI_ENV;
	// use a function pointer to thwart inlining
	void (*fn_ptr)() = segfault_stack_frame_2;
	fn_ptr();
	RET_UNDEFINED;
}

void RegisterHandler() {
	#ifdef _WIN32
		AddVectoredExceptionHandler(1, segfault_handler);
	#else
		struct sigaction sa;
		memset(&sa, 0, sizeof(struct sigaction));
		sigemptyset(&sa.sa_mask);
		sa.sa_sigaction = segfault_handler;
		sa.sa_flags   = SA_SIGINFO | SA_RESETHAND;
		sigaction(SIGSEGV, &sa, NULL);
	#endif
}
