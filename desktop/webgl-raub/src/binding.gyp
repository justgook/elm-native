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
      "target_name": "webgl",
      "sources": [
        "cpp/attrib.cpp",
        "cpp/bindings.cpp",
        "cpp/blend.cpp",
        "cpp/buffers.cpp",
        "cpp/framebuffers.cpp",
        "cpp/instances.cpp",
        "cpp/programs.cpp",
        "cpp/renderbuffers.cpp",
        "cpp/shaders.cpp",
        "cpp/stencil.cpp",
        "cpp/textures.cpp",
        "cpp/transformfeedback.cpp",
        "cpp/uniform.cpp",
        "cpp/vertexarrays.cpp",
        "cpp/webgl.cpp"
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "include_dirs": [
        "<(include)",
        "<(napi_include)",
        "<(gl_include)"
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
              "<(gl_bin)/libGLEW.so.2.1",
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
              "<(gl_bin)/glew.dylib"
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
              "glew32.lib",
              "opengl32.lib"
            ],
            "defines": [
              "WIN32_LEAN_AND_MEAN",
              "VC_EXTRALEAN",
              "_WIN32"
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
      "dependencies" : [ "webgl" ],
      "copies":
      [
        {
          "destination": "<(module_root_dir)/../../build",
          "files": ["<(module_root_dir)/build/Release/webgl.node"]
        }
      ]
    }
  ]
}
