echo 'FreeImage Build Started'

(
	
	cd src
	rm -rf FreeImage
	unzip -qq FreeImage3180.zip -d .
	


	(
		cd FreeImage
		
		export DYLIB_INSTALL_NAME_BASE=@rpath
		make -f Makefile.osx \
			CPP_X86_64='g++ -w' \
			CC_X86_64='gcc -w' \
			COMPILERFLAGS_X86_64='-arch x86_64 -D__ANSI__ -DDISABLE_PERF_MEASUREMENT' \
			LIBRARIES_X86_64="-flat_namespace -install_name \"@rpath/freeimage.dylib\" -Wl,-syslibroot $(xcrun --sdk macosx --show-sdk-path)" \
			INCLUDE_X86_64="-isysroot $(xcrun --sdk macosx --show-sdk-path)" \
			libfreeimage-3.18.0.dylib-x86_64 \
#			>/dev/null
		
	)

	mkdir -p ../../build
	mv FreeImage/libfreeimage-3.18.0.dylib-x86_64 ../../build/freeimage.dylib
	
)

echo 'FreeImage Build Finished'


