{
	"variables": {
		"bin": "build"
	},
	"targets": [
		{
			"target_name": "segfault",
			"sources": [
				"cpp/bindings.cpp",
				"cpp/segfault-handler.cpp"
			],
			"include_dirs": [
				"../../include/",
				"../../../node_modules/node-addon-api"
			],
			"cflags!": [
				"-fno-exceptions"
			],
			"cflags_cc!": [
				"-fno-exceptions"
			],
			"cflags": [
				"-O0",
				"-funwind-tables"
			],
			"xcode_settings": {
				"MACOSX_DEPLOYMENT_TARGET": "10.9",
				"OTHER_CFLAGS": [
					"-O0",
					"-funwind-tables"
				],
				"CLANG_CXX_LIBRARY": "libc++"
			},
			"conditions": [
				[
					"OS=='win'",
					{
						"defines": [
							"WIN32_LEAN_AND_MEAN",
							"VC_EXTRALEAN"
						],
						"sources": [
							"cpp/stack-walker.cpp"
						],
						"msvs_settings": {
							"VCCLCompilerTool": {
								"DisableSpecificWarnings": [
									"4996"
								],
								"AdditionalOptions": [
									"/GL",
									"/GF",
									"/EHsc",
									"/GS",
									"/Gy",
									"/GR-"
								]
							},
							"VCLinkerTool": {
								"AdditionalOptions": [
									"/DEBUG:NONE",
									"/LTCG"
								]
							}
						}
					}
				]
			]
		},
		{
			"target_name": "copy_binary",
			"type":"none",
			"dependencies" : [ "segfault" ],
			"copies":
			[
				{
					"destination": "<(module_root_dir)/../../build",
					"files": ["<(module_root_dir)/build/Release/segfault.node"]
				}
			]
		}
	]
}
