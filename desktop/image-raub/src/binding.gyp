{
  "variables": {
    "bin": "../../../build",
    "include": "../../include",
    "napi_include": "../../../node_modules/node-addon-api"
  },
  "targets": [
    {
      "target_name": "image",
      "sources": [
        "cpp/bindings.cpp",
        "cpp/image.cpp"
      ],
      "include_dirs": [
        "<(include)",
        "<(napi_include)"
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "library_dirs": [
        "<(bin)"
      ],
      "conditions": [
        [
          "OS==\"linux\"",
          {
            "libraries": [
              "-Wl,-rpath,'$$ORIGIN'",
              "-Wl,-rpath,'<(bin)'",
              "<(bin)/libfreeimage.so.3"
            ]
          }
        ],
        [
          "OS==\"mac\"",
          {
            "libraries": [
              "-Wl,-rpath,@loader_path",
              "-Wl,-rpath,@loader_path/<(bin)",
              "<(bin)/freeimage.dylib"
            ],
            "xcode_settings": {
              "DYLIB_INSTALL_NAME_BASE": "@rpath"
            }
          }
        ],
        [
          "OS==\"win\"",
          {
            "libraries": [
              "FreeImage.lib"
            ],
            "defines": [
              "WIN32_LEAN_AND_MEAN",
              "VC_EXTRALEAN"
            ],
            "msvs_version": "2013",
            "msvs_settings": {
              "VCCLCompilerTool": {
                "AdditionalOptions": [
                  "/O2",
                  "/Oy",
                  "/GL",
                  "/GF",
                  "/Gm-",
                  "/EHsc",
                  "/MT",
                  "/GS",
                  "/Gy",
                  "/GR-",
                  "/Gd"
                ]
              },
              "VCLinkerTool": {
                "AdditionalOptions": [
                  "/OPT:REF",
                  "/OPT:ICF",
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
      "dependencies" : [ "image" ],
      "copies":
      [
        {
          "destination": "<(module_root_dir)/../../build",
          "files": ["<(module_root_dir)/build/Release/image.node"]
        }
      ]
    }
  ]
}
