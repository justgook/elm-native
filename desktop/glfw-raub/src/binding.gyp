{
  "variables": {
    "bin": "../../../build",
    "gl_include": "../../deps-opengl-raub/include",
    "gl_bin": "../../../build",
    "include": "../../include",
    "napi_include": "../../../node_modules/node-addon-api"
  },
  "targets": [
    {
      "target_name": "glfw",
      "sources": [
        "cpp/bindings.cpp",
        "cpp/events.cpp",
        "cpp/glfw.cpp"
      ],
      "include_dirs": [
        "<(include)",
        "<(napi_include)",
        "<(gl_include)"
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "library_dirs": [
        "<(gl_bin)"
      ],
      "conditions": [
        [
          "OS==\"linux\"",
          {
            "libraries": [
              "-Wl,-rpath,'$$ORIGIN'",
              "<(gl_bin)/libglfw.so.3",
              "<(gl_bin)/libGL.so",
              "<(gl_bin)/libXrandr.so"
            ],
            "defines": [
              "__linux__"
            ]
          }
        ],
        [
          "OS==\"mac\"",
          {
            "libraries": [
              "-Wl,-rpath,@loader_path",
              "<(gl_bin)/glfw.dylib"
            ],
            "defines": [
              "__APPLE__"
            ]
          }
        ],
        [
          "OS==\"win\"",
          {
            "libraries": [
              "glfw3dll.lib",
              "opengl32.lib"
            ],
            "defines": [
              "WIN32_LEAN_AND_MEAN",
              "VC_EXTRALEAN",
              "_WIN32"
            ],
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
      "type": "none",
      "dependencies": [
        "glfw"
      ],
      "copies": [
        {
          "destination": "<(module_root_dir)/../../build",
          "files": [
            "<(module_root_dir)/build/Release/glfw.node"
          ]
        }
      ]
    }
  ]
}
