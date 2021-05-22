APPNAME=MyApp
APPBUNDLE=$(APPNAME).app
APPBUNDLECONTENTS=$(APPBUNDLE)/Contents
APPBUNDLEEXE=$(APPBUNDLECONTENTS)/MacOS
APPBUNDLERESOURCES=$(APPBUNDLECONTENTS)/Resources
APPBUNDLEICON=$(APPBUNDLECONTENTS)/Resources

OUTFILE=dist/elm-native

appbundle: $(APPBUNDLERESOURCES)/$(APPNAME).icns
	cp macosx/Info.plist $(APPBUNDLECONTENTS)/
	cp macosx/PkgInfo $(APPBUNDLECONTENTS)/
	cp $(OUTFILE) $(APPBUNDLEEXE)/$(APPNAME)

$(APPBUNDLERESOURCES)/$(APPNAME).icns: $(APPBUNDLE) macosx/$(APPNAME)Icon.png
	rm -rf $(APPBUNDLERESOURCES)/$(APPNAME).iconset
	mkdir $(APPBUNDLERESOURCES)/$(APPNAME).iconset
	sips -z 16 16     macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_16x16.png
	sips -z 32 32     macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_16x16@2x.png
	sips -z 32 32     macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_32x32.png
	sips -z 64 64     macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_32x32@2x.png
	sips -z 128 128   macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_128x128.png
	sips -z 256 256   macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_128x128@2x.png
	sips -z 256 256   macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_256x256.png
	sips -z 512 512   macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_256x256@2x.png
	sips -z 512 512   macosx/$(APPNAME)Icon.png --out $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_512x512.png
	cp macosx/$(APPNAME)Icon.png $(APPBUNDLERESOURCES)/$(APPNAME).iconset/icon_512x512@2x.png
	iconutil -c icns -o $@ $(APPBUNDLERESOURCES)/$(APPNAME).iconset
	rm -r $(APPBUNDLERESOURCES)/$(APPNAME).iconset

$(APPBUNDLE):
	mkdir $(APPBUNDLE)
	mkdir $(APPBUNDLECONTENTS)
	mkdir $(APPBUNDLEEXE)
	mkdir $(APPBUNDLERESOURCES)

clean:
	rm -rf $(APPBUNDLE)

.PHONY: appbundle clean
