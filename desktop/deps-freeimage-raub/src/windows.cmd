echo 'FreeImage Build Started'

cd src
rd /s /q "FreeImage"
tar -xf FreeImage3180.zip

rd /s /q "build"

cd FreeImage
msbuild /p:Platform=x64 /p:Configuration=Release /p:PlatformToolset=v142 FreeImage.2013.vcxproj

cd ..
dir

mkdir ..\..\build
copy /y FreeImage\Dist\x64\FreeImage.dll ..\..\build\FreeImage.dll
copy /y FreeImage\Dist\x64\FreeImage.lib ..\..\build\FreeImage.lib

cd ..

echo 'FreeImage Build Finished'
