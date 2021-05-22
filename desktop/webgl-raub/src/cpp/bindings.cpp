#include "webgl.hpp"


#define JS_GL_SET_CONSTANT(name, constant)                                    \
	exports.Set(#name, static_cast<double>(constant));

#define JS_GL_CONSTANT(name)                                                  \
	exports.Set(#name, static_cast<double>(GL_ ## name));

#define JS_GL_SET_METHOD(name)                                                \
	exports.DefineProperty(                                                   \
		Napi::PropertyDescriptor::Function(                                   \
			env,                                                              \
			exports,                                                          \
			#name,                                                            \
			webgl::name,                                                      \
			napi_writable                                                     \
		)                                                                     \
	);


Napi::Object initModule(Napi::Env env, Napi::Object exports) {
	
	JS_GL_SET_METHOD(init);
	
	// Attrib
	
	JS_GL_SET_METHOD(bindAttribLocation);
	JS_GL_SET_METHOD(disableVertexAttribArray);
	JS_GL_SET_METHOD(enableVertexAttribArray);
	JS_GL_SET_METHOD(getActiveAttrib);
	JS_GL_SET_METHOD(getAttribLocation);
	JS_GL_SET_METHOD(getVertexAttrib);
	JS_GL_SET_METHOD(getVertexAttribOffset);
	JS_GL_SET_METHOD(vertexAttrib1f);
	JS_GL_SET_METHOD(vertexAttrib1fv);
	JS_GL_SET_METHOD(vertexAttrib2f);
	JS_GL_SET_METHOD(vertexAttrib2fv);
	JS_GL_SET_METHOD(vertexAttrib3f);
	JS_GL_SET_METHOD(vertexAttrib3fv);
	JS_GL_SET_METHOD(vertexAttrib4f);
	JS_GL_SET_METHOD(vertexAttrib4fv);
	JS_GL_SET_METHOD(vertexAttribPointer);
	JS_GL_SET_METHOD(vertexAttribIPointer);
	
	
	// Blend
	
	JS_GL_SET_METHOD(blendColor);
	JS_GL_SET_METHOD(blendEquation);
	JS_GL_SET_METHOD(blendEquationSeparate);
	JS_GL_SET_METHOD(blendFunc);
	JS_GL_SET_METHOD(blendFuncSeparate);
	
	
	// VBO
	
	JS_GL_SET_METHOD(createBuffer);
	JS_GL_SET_METHOD(deleteBuffer);
	JS_GL_SET_METHOD(isBuffer);
	JS_GL_SET_METHOD(bindBuffer);
	JS_GL_SET_METHOD(bindBufferBase);
	JS_GL_SET_METHOD(bindBufferRange);
	JS_GL_SET_METHOD(bufferData);
	JS_GL_SET_METHOD(bufferSubData);
	JS_GL_SET_METHOD(copyBufferSubData);
	JS_GL_SET_METHOD(getBufferSubData);
	JS_GL_SET_METHOD(getBufferParameter);
	
	
	// FBO
	
	JS_GL_SET_METHOD(createFramebuffer);
	JS_GL_SET_METHOD(deleteFramebuffer);
	JS_GL_SET_METHOD(isFramebuffer);
	JS_GL_SET_METHOD(bindFramebuffer);
	JS_GL_SET_METHOD(blitFramebuffer);
	JS_GL_SET_METHOD(checkFramebufferStatus);
	JS_GL_SET_METHOD(framebufferRenderbuffer);
	JS_GL_SET_METHOD(framebufferTexture2D);
	JS_GL_SET_METHOD(getFramebufferAttachmentParameter);
	
	
	// Program
	
	JS_GL_SET_METHOD(createProgram);
	JS_GL_SET_METHOD(deleteProgram);
	JS_GL_SET_METHOD(isProgram);
	JS_GL_SET_METHOD(getProgramInfoLog);
	JS_GL_SET_METHOD(getProgramParameter);
	JS_GL_SET_METHOD(linkProgram);
	JS_GL_SET_METHOD(useProgram);
	JS_GL_SET_METHOD(validateProgram);
	
	
	// RBO
	
	JS_GL_SET_METHOD(createRenderbuffer);
	JS_GL_SET_METHOD(deleteRenderbuffer);
	JS_GL_SET_METHOD(isRenderbuffer);
	JS_GL_SET_METHOD(bindRenderbuffer);
	JS_GL_SET_METHOD(getRenderbufferParameter);
	JS_GL_SET_METHOD(renderbufferStorage);
	
	
	// Shader
	
	
	JS_GL_SET_METHOD(deleteShader);
	JS_GL_SET_METHOD(createShader);
	JS_GL_SET_METHOD(isShader);
	JS_GL_SET_METHOD(attachShader);
	JS_GL_SET_METHOD(compileShader);
	JS_GL_SET_METHOD(detachShader);
	JS_GL_SET_METHOD(getAttachedShaders);
	JS_GL_SET_METHOD(getShaderInfoLog);
	JS_GL_SET_METHOD(getShaderParameter);
	JS_GL_SET_METHOD(getShaderSource);
	JS_GL_SET_METHOD(shaderSource);
	
	
	// Stencil
	
	JS_GL_SET_METHOD(clearStencil);
	JS_GL_SET_METHOD(stencilFunc);
	JS_GL_SET_METHOD(stencilFuncSeparate);
	JS_GL_SET_METHOD(stencilMask);
	JS_GL_SET_METHOD(stencilMaskSeparate);
	JS_GL_SET_METHOD(stencilOp);
	JS_GL_SET_METHOD(stencilOpSeparate);
	
	
	// Texture
	
	JS_GL_SET_METHOD(createTexture);
	JS_GL_SET_METHOD(deleteTexture);
	JS_GL_SET_METHOD(isTexture);
	JS_GL_SET_METHOD(bindTexture);
	JS_GL_SET_METHOD(activeTexture);
	JS_GL_SET_METHOD(copyTexImage2D);
	JS_GL_SET_METHOD(copyTexSubImage2D);
	JS_GL_SET_METHOD(generateMipmap);
	JS_GL_SET_METHOD(getTexParameter);
	JS_GL_SET_METHOD(texImage2D);
	JS_GL_SET_METHOD(texParameterf);
	JS_GL_SET_METHOD(texParameteri);
	JS_GL_SET_METHOD(texSubImage2D);
	
	
	// Uniform
	
	JS_GL_SET_METHOD(getActiveUniform);
	JS_GL_SET_METHOD(getUniform);
	JS_GL_SET_METHOD(getUniformLocation);
	JS_GL_SET_METHOD(uniform1f);
	JS_GL_SET_METHOD(uniform1fv);
	JS_GL_SET_METHOD(uniform1i);
	JS_GL_SET_METHOD(uniform1iv);
	JS_GL_SET_METHOD(uniform2f);
	JS_GL_SET_METHOD(uniform2fv);
	JS_GL_SET_METHOD(uniform2i);
	JS_GL_SET_METHOD(uniform2iv);
	JS_GL_SET_METHOD(uniform3f);
	JS_GL_SET_METHOD(uniform3fv);
	JS_GL_SET_METHOD(uniform3i);
	JS_GL_SET_METHOD(uniform3iv);
	JS_GL_SET_METHOD(uniform4f);
	JS_GL_SET_METHOD(uniform4fv);
	JS_GL_SET_METHOD(uniform4i);
	JS_GL_SET_METHOD(uniform4iv);
	JS_GL_SET_METHOD(uniformMatrix2fv);
	JS_GL_SET_METHOD(uniformMatrix3fv);
	JS_GL_SET_METHOD(uniformMatrix4fv);
	
	
	// VAO
	
	JS_GL_SET_METHOD(createVertexArray);
	JS_GL_SET_METHOD(deleteVertexArray);
	JS_GL_SET_METHOD(isVertexArray);
	JS_GL_SET_METHOD(bindVertexArray);
	
	
	// Instances
	
	JS_GL_SET_METHOD(drawArraysInstanced);
	JS_GL_SET_METHOD(drawElementsInstanced);
	JS_GL_SET_METHOD(vertexAttribDivisor);
	

	// Transform feedback
	JS_GL_SET_METHOD(createTransformFeedback);
	JS_GL_SET_METHOD(deleteTransformFeedback);
	JS_GL_SET_METHOD(isTransformFeedback);
	JS_GL_SET_METHOD(bindTransformFeedback);
	JS_GL_SET_METHOD(beginTransformFeedback);
	JS_GL_SET_METHOD(endTransformFeedback);
	JS_GL_SET_METHOD(pauseTransformFeedback);
	JS_GL_SET_METHOD(resumeTransformFeedback);
	JS_GL_SET_METHOD(transformFeedbackVaryings);
	JS_GL_SET_METHOD(getTransformFeedbackVarying);
	
	
	// Misc OpenGL Functions
	
	JS_GL_SET_METHOD(clear);
	JS_GL_SET_METHOD(clearColor);
	JS_GL_SET_METHOD(clearDepth);
	JS_GL_SET_METHOD(colorMask);
	JS_GL_SET_METHOD(cullFace);
	JS_GL_SET_METHOD(depthFunc);
	JS_GL_SET_METHOD(depthMask);
	JS_GL_SET_METHOD(depthRange);
	JS_GL_SET_METHOD(disable);
	JS_GL_SET_METHOD(drawArrays);
	JS_GL_SET_METHOD(drawElements);
	JS_GL_SET_METHOD(enable);
	JS_GL_SET_METHOD(finish);
	JS_GL_SET_METHOD(flush);
	JS_GL_SET_METHOD(frontFace);
	JS_GL_SET_METHOD(getError);
	JS_GL_SET_METHOD(getParameter);
	JS_GL_SET_METHOD(getRenderTarget);
	JS_GL_SET_METHOD(getSupportedExtensions);
	JS_GL_SET_METHOD(hint);
	JS_GL_SET_METHOD(isEnabled);
	JS_GL_SET_METHOD(lineWidth);
	JS_GL_SET_METHOD(pixelStorei);
	JS_GL_SET_METHOD(polygonOffset);
	JS_GL_SET_METHOD(readPixels);
	JS_GL_SET_METHOD(sampleCoverage);
	JS_GL_SET_METHOD(scissor);
	JS_GL_SET_METHOD(viewport);
	
	
	// OpenGL ES 2.1 constants
	
	/* ClearBufferMask */
	JS_GL_CONSTANT(DEPTH_BUFFER_BIT);
	JS_GL_CONSTANT(STENCIL_BUFFER_BIT);
	JS_GL_CONSTANT(COLOR_BUFFER_BIT);
	
	/* Boolean */
	JS_GL_CONSTANT(FALSE);
	JS_GL_CONSTANT(TRUE);
	
	/* BeginMode */
	JS_GL_CONSTANT(POINTS);
	JS_GL_CONSTANT(LINES);
	JS_GL_CONSTANT(LINE_LOOP);
	JS_GL_CONSTANT(LINE_STRIP);
	JS_GL_CONSTANT(TRIANGLES);
	JS_GL_CONSTANT(TRIANGLE_STRIP);
	JS_GL_CONSTANT(TRIANGLE_FAN);
	
	/* AlphaFunction (not supported in ES20) */
	/*			GL_NEVER */
	/*			GL_LESS */
	/*			GL_EQUAL */
	/*			GL_LEQUAL */
	/*			GL_GREATER */
	/*			GL_NOTEQUAL */
	/*			GL_GEQUAL */
	/*			GL_ALWAYS */
	
	/* BlendingFactorDest */
	JS_GL_CONSTANT(ZERO);
	JS_GL_CONSTANT(ONE);
	JS_GL_CONSTANT(SRC_COLOR);
	JS_GL_CONSTANT(ONE_MINUS_SRC_COLOR);
	JS_GL_CONSTANT(SRC_ALPHA);
	JS_GL_CONSTANT(ONE_MINUS_SRC_ALPHA);
	JS_GL_CONSTANT(DST_ALPHA);
	JS_GL_CONSTANT(ONE_MINUS_DST_ALPHA);
	
	/* BlendingFactorSrc */
	/*			GL_ZERO */
	/*			GL_ONE */
	JS_GL_CONSTANT(DST_COLOR);
	JS_GL_CONSTANT(ONE_MINUS_DST_COLOR);
	JS_GL_CONSTANT(SRC_ALPHA_SATURATE);
	/*			GL_SRC_ALPHA */
	/*			GL_ONE_MINUS_SRC_ALPHA */
	/*			GL_DST_ALPHA */
	/*			GL_ONE_MINUS_DST_ALPHA */
	
	/* BlendEquationSeparate */
	JS_GL_CONSTANT(FUNC_ADD);
	JS_GL_CONSTANT(BLEND_EQUATION);
	JS_GL_CONSTANT(BLEND_EQUATION_RGB);		/* same as BLEND_EQUATION */
	JS_GL_CONSTANT(BLEND_EQUATION_ALPHA);
	
	/* BlendSubtract */
	JS_GL_CONSTANT(FUNC_SUBTRACT);
	JS_GL_CONSTANT(FUNC_REVERSE_SUBTRACT);
	
	/* Separate Blend Functions */
	JS_GL_CONSTANT(BLEND_DST_RGB);
	JS_GL_CONSTANT(BLEND_SRC_RGB);
	JS_GL_CONSTANT(BLEND_DST_ALPHA);
	JS_GL_CONSTANT(BLEND_SRC_ALPHA);
	JS_GL_CONSTANT(CONSTANT_COLOR);
	JS_GL_CONSTANT(ONE_MINUS_CONSTANT_COLOR);
	JS_GL_CONSTANT(CONSTANT_ALPHA);
	JS_GL_CONSTANT(ONE_MINUS_CONSTANT_ALPHA);
	JS_GL_CONSTANT(BLEND_COLOR);
	
	/* Buffer Objects */
	JS_GL_CONSTANT(ARRAY_BUFFER);
	JS_GL_CONSTANT(ELEMENT_ARRAY_BUFFER);
	JS_GL_CONSTANT(ARRAY_BUFFER_BINDING);
	JS_GL_CONSTANT(ELEMENT_ARRAY_BUFFER_BINDING);
	
	JS_GL_CONSTANT(STREAM_DRAW);
	JS_GL_CONSTANT(STATIC_DRAW);
	JS_GL_CONSTANT(DYNAMIC_DRAW);
	
	JS_GL_CONSTANT(BUFFER_SIZE);
	JS_GL_CONSTANT(BUFFER_USAGE);
	
	JS_GL_CONSTANT(CURRENT_VERTEX_ATTRIB);
	
	/* CullFaceMode */
	JS_GL_CONSTANT(FRONT);
	JS_GL_CONSTANT(BACK);
	JS_GL_CONSTANT(FRONT_AND_BACK);
	
	/* DepthFunction */
	/*			GL_NEVER */
	/*			GL_LESS */
	/*			GL_EQUAL */
	/*			GL_LEQUAL */
	/*			GL_GREATER */
	/*			GL_NOTEQUAL */
	/*			GL_GEQUAL */
	/*			GL_ALWAYS */
	
	/* EnableCap */
	JS_GL_CONSTANT(TEXTURE_2D);
	JS_GL_CONSTANT(CULL_FACE);
	JS_GL_CONSTANT(BLEND);
	JS_GL_CONSTANT(DITHER);
	JS_GL_CONSTANT(STENCIL_TEST);
	JS_GL_CONSTANT(DEPTH_TEST);
	JS_GL_CONSTANT(SCISSOR_TEST);
	JS_GL_CONSTANT(POLYGON_OFFSET_FILL);
	JS_GL_CONSTANT(SAMPLE_ALPHA_TO_COVERAGE);
	JS_GL_CONSTANT(SAMPLE_COVERAGE);
	
	/* ErrorCode */
	JS_GL_CONSTANT(NO_ERROR);
	JS_GL_CONSTANT(INVALID_ENUM);
	JS_GL_CONSTANT(INVALID_VALUE);
	JS_GL_CONSTANT(INVALID_OPERATION);
	JS_GL_CONSTANT(OUT_OF_MEMORY);
	
	/* FrontFaceDirection */
	JS_GL_CONSTANT(CW);
	JS_GL_CONSTANT(CCW);
	
	/* GetPName */
	JS_GL_CONSTANT(LINE_WIDTH);
	JS_GL_CONSTANT(ALIASED_POINT_SIZE_RANGE);
	JS_GL_CONSTANT(ALIASED_LINE_WIDTH_RANGE);
	JS_GL_CONSTANT(CULL_FACE_MODE);
	JS_GL_CONSTANT(FRONT_FACE);
	JS_GL_CONSTANT(DEPTH_RANGE);
	JS_GL_CONSTANT(DEPTH_WRITEMASK);
	JS_GL_CONSTANT(DEPTH_CLEAR_VALUE);
	JS_GL_CONSTANT(DEPTH_FUNC);
	JS_GL_CONSTANT(STENCIL_CLEAR_VALUE);
	JS_GL_CONSTANT(STENCIL_FUNC);
	JS_GL_CONSTANT(STENCIL_FAIL);
	JS_GL_CONSTANT(STENCIL_PASS_DEPTH_FAIL);
	JS_GL_CONSTANT(STENCIL_PASS_DEPTH_PASS);
	JS_GL_CONSTANT(STENCIL_REF);
	JS_GL_CONSTANT(STENCIL_VALUE_MASK);
	JS_GL_CONSTANT(STENCIL_WRITEMASK);
	JS_GL_CONSTANT(STENCIL_BACK_FUNC);
	JS_GL_CONSTANT(STENCIL_BACK_FAIL);
	JS_GL_CONSTANT(STENCIL_BACK_PASS_DEPTH_FAIL);
	JS_GL_CONSTANT(STENCIL_BACK_PASS_DEPTH_PASS);
	JS_GL_CONSTANT(STENCIL_BACK_REF);
	JS_GL_CONSTANT(STENCIL_BACK_VALUE_MASK);
	JS_GL_CONSTANT(STENCIL_BACK_WRITEMASK);
	JS_GL_CONSTANT(VIEWPORT);
	JS_GL_CONSTANT(SCISSOR_BOX);
	/*			GL_SCISSOR_TEST */
	JS_GL_CONSTANT(COLOR_CLEAR_VALUE);
	JS_GL_CONSTANT(COLOR_WRITEMASK);
	JS_GL_CONSTANT(UNPACK_ALIGNMENT);
	JS_GL_CONSTANT(PACK_ALIGNMENT);
	JS_GL_CONSTANT(MAX_TEXTURE_SIZE);
	JS_GL_CONSTANT(MAX_VIEWPORT_DIMS);
	JS_GL_CONSTANT(SUBPIXEL_BITS);
	JS_GL_CONSTANT(RED_BITS);
	JS_GL_CONSTANT(GREEN_BITS);
	JS_GL_CONSTANT(BLUE_BITS);
	JS_GL_CONSTANT(ALPHA_BITS);
	JS_GL_CONSTANT(DEPTH_BITS);
	JS_GL_CONSTANT(STENCIL_BITS);
	JS_GL_CONSTANT(POLYGON_OFFSET_UNITS);
	/*			GL_POLYGON_OFFSET_FILL */
	JS_GL_CONSTANT(POLYGON_OFFSET_FACTOR);
	JS_GL_CONSTANT(TEXTURE_BINDING_2D);
	JS_GL_CONSTANT(SAMPLE_BUFFERS);
	JS_GL_CONSTANT(SAMPLES);
	JS_GL_CONSTANT(SAMPLE_COVERAGE_VALUE);
	JS_GL_CONSTANT(SAMPLE_COVERAGE_INVERT);
	
	/* GetTextureParameter */
	/*			GL_TEXTURE_MAG_FILTER */
	/*			GL_TEXTURE_MIN_FILTER */
	/*			GL_TEXTURE_WRAP_S */
	/*			GL_TEXTURE_WRAP_T */
	
	JS_GL_CONSTANT(NUM_COMPRESSED_TEXTURE_FORMATS);
	JS_GL_CONSTANT(COMPRESSED_TEXTURE_FORMATS);
	
	/* HintMode */
	JS_GL_CONSTANT(DONT_CARE);
	JS_GL_CONSTANT(FASTEST);
	JS_GL_CONSTANT(NICEST);
	
	/* HintTarget */
	JS_GL_CONSTANT(GENERATE_MIPMAP_HINT);
	
	/* DataType */
	JS_GL_CONSTANT(BYTE);
	JS_GL_CONSTANT(UNSIGNED_BYTE);
	JS_GL_CONSTANT(SHORT);
	JS_GL_CONSTANT(UNSIGNED_SHORT);
	JS_GL_CONSTANT(INT);
	JS_GL_CONSTANT(UNSIGNED_INT);
	JS_GL_CONSTANT(FLOAT);
	JS_GL_CONSTANT(FIXED);
	
	/* PixelFormat */
	JS_GL_CONSTANT(DEPTH_COMPONENT);
	JS_GL_CONSTANT(ALPHA);
	JS_GL_CONSTANT(RGB);
	JS_GL_CONSTANT(RGBA);
	JS_GL_CONSTANT(LUMINANCE);
	JS_GL_CONSTANT(LUMINANCE_ALPHA);
	
	/* PixelType */
	/*			GL_UNSIGNED_BYTE */
	JS_GL_CONSTANT(UNSIGNED_SHORT_4_4_4_4);
	JS_GL_CONSTANT(UNSIGNED_SHORT_5_5_5_1);
	JS_GL_CONSTANT(UNSIGNED_SHORT_5_6_5);
	
	/* Shaders */
	JS_GL_CONSTANT(FRAGMENT_SHADER);
	JS_GL_CONSTANT(VERTEX_SHADER);
	JS_GL_CONSTANT(MAX_VERTEX_ATTRIBS);
	
	JS_GL_CONSTANT(MAX_VERTEX_UNIFORM_VECTORS);
	JS_GL_CONSTANT(MAX_VARYING_VECTORS);
	
	JS_GL_CONSTANT(MAX_COMBINED_TEXTURE_IMAGE_UNITS);
	JS_GL_CONSTANT(MAX_VERTEX_TEXTURE_IMAGE_UNITS);
	JS_GL_CONSTANT(MAX_TEXTURE_IMAGE_UNITS);
	
	JS_GL_CONSTANT(MAX_FRAGMENT_UNIFORM_VECTORS);
	
	JS_GL_CONSTANT(SHADER_TYPE);
	JS_GL_CONSTANT(DELETE_STATUS);
	JS_GL_CONSTANT(LINK_STATUS);
	JS_GL_CONSTANT(VALIDATE_STATUS);
	JS_GL_CONSTANT(ATTACHED_SHADERS);
	JS_GL_CONSTANT(ACTIVE_UNIFORMS);
	JS_GL_CONSTANT(ACTIVE_UNIFORM_MAX_LENGTH);
	JS_GL_CONSTANT(ACTIVE_ATTRIBUTES);
	JS_GL_CONSTANT(ACTIVE_ATTRIBUTE_MAX_LENGTH);
	JS_GL_CONSTANT(SHADING_LANGUAGE_VERSION);
	JS_GL_CONSTANT(CURRENT_PROGRAM);
	
	/* StencilFunction */
	JS_GL_CONSTANT(NEVER);
	JS_GL_CONSTANT(LESS);
	JS_GL_CONSTANT(EQUAL);
	JS_GL_CONSTANT(LEQUAL);
	JS_GL_CONSTANT(GREATER);
	JS_GL_CONSTANT(NOTEQUAL);
	JS_GL_CONSTANT(GEQUAL);
	JS_GL_CONSTANT(ALWAYS);
	
	/* StencilOp */
	/*			GL_ZERO */
	JS_GL_CONSTANT(KEEP);
	JS_GL_CONSTANT(REPLACE);
	JS_GL_CONSTANT(INCR);
	JS_GL_CONSTANT(DECR);
	JS_GL_CONSTANT(INVERT);
	JS_GL_CONSTANT(INCR_WRAP);
	JS_GL_CONSTANT(DECR_WRAP);
	
//add missing const for point clouds, sprites:
	JS_GL_CONSTANT(PROGRAM_POINT_SIZE);
	JS_GL_CONSTANT(POINT_SPRITE);
	
	/* StringName */
	JS_GL_CONSTANT(VENDOR);
	JS_GL_CONSTANT(RENDERER);
	JS_GL_CONSTANT(VERSION);
	JS_GL_CONSTANT(EXTENSIONS);
	
	/* TextureMagFilter */
	JS_GL_CONSTANT(NEAREST);
	JS_GL_CONSTANT(LINEAR);
	
	/* TextureMinFilter */
	/*			GL_NEAREST */
	/*			GL_LINEAR */
	JS_GL_CONSTANT(NEAREST_MIPMAP_NEAREST);
	JS_GL_CONSTANT(LINEAR_MIPMAP_NEAREST);
	JS_GL_CONSTANT(NEAREST_MIPMAP_LINEAR);
	JS_GL_CONSTANT(LINEAR_MIPMAP_LINEAR);
	
	/* TextureParameterName */
	JS_GL_CONSTANT(TEXTURE_MAG_FILTER);
	JS_GL_CONSTANT(TEXTURE_MIN_FILTER);
	JS_GL_CONSTANT(TEXTURE_WRAP_S);
	JS_GL_CONSTANT(TEXTURE_WRAP_T);
	
	/* TextureTarget */
	/*			GL_TEXTURE_2D */
	JS_GL_CONSTANT(TEXTURE);
	
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP);
	JS_GL_CONSTANT(TEXTURE_BINDING_CUBE_MAP);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_POSITIVE_X);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_NEGATIVE_X);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_POSITIVE_Y);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_NEGATIVE_Y);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_POSITIVE_Z);
	JS_GL_CONSTANT(TEXTURE_CUBE_MAP_NEGATIVE_Z);
	JS_GL_CONSTANT(MAX_CUBE_MAP_TEXTURE_SIZE);
	
	/* TextureUnit */
	JS_GL_CONSTANT(TEXTURE0);
	JS_GL_CONSTANT(TEXTURE1);
	JS_GL_CONSTANT(TEXTURE2);
	JS_GL_CONSTANT(TEXTURE3);
	JS_GL_CONSTANT(TEXTURE4);
	JS_GL_CONSTANT(TEXTURE5);
	JS_GL_CONSTANT(TEXTURE6);
	JS_GL_CONSTANT(TEXTURE7);
	JS_GL_CONSTANT(TEXTURE8);
	JS_GL_CONSTANT(TEXTURE9);
	JS_GL_CONSTANT(TEXTURE10);
	JS_GL_CONSTANT(TEXTURE11);
	JS_GL_CONSTANT(TEXTURE12);
	JS_GL_CONSTANT(TEXTURE13);
	JS_GL_CONSTANT(TEXTURE14);
	JS_GL_CONSTANT(TEXTURE15);
	JS_GL_CONSTANT(TEXTURE16);
	JS_GL_CONSTANT(TEXTURE17);
	JS_GL_CONSTANT(TEXTURE18);
	JS_GL_CONSTANT(TEXTURE19);
	JS_GL_CONSTANT(TEXTURE20);
	JS_GL_CONSTANT(TEXTURE21);
	JS_GL_CONSTANT(TEXTURE22);
	JS_GL_CONSTANT(TEXTURE23);
	JS_GL_CONSTANT(TEXTURE24);
	JS_GL_CONSTANT(TEXTURE25);
	JS_GL_CONSTANT(TEXTURE26);
	JS_GL_CONSTANT(TEXTURE27);
	JS_GL_CONSTANT(TEXTURE28);
	JS_GL_CONSTANT(TEXTURE29);
	JS_GL_CONSTANT(TEXTURE30);
	JS_GL_CONSTANT(TEXTURE31);
	JS_GL_CONSTANT(ACTIVE_TEXTURE);
	
	/* TextureWrapMode */
	JS_GL_CONSTANT(CLAMP);
	JS_GL_CONSTANT(CLAMP_TO_BORDER);
	JS_GL_CONSTANT(CLAMP_TO_EDGE);
	JS_GL_CONSTANT(MIRRORED_REPEAT);
	JS_GL_CONSTANT(REPEAT);
	
	/* Uniform Types */
	JS_GL_CONSTANT(FLOAT_VEC2);
	JS_GL_CONSTANT(FLOAT_VEC3);
	JS_GL_CONSTANT(FLOAT_VEC4);
	JS_GL_CONSTANT(INT_VEC2);
	JS_GL_CONSTANT(INT_VEC3);
	JS_GL_CONSTANT(INT_VEC4);
	JS_GL_CONSTANT(BOOL);
	JS_GL_CONSTANT(BOOL_VEC2);
	JS_GL_CONSTANT(BOOL_VEC3);
	JS_GL_CONSTANT(BOOL_VEC4);
	JS_GL_CONSTANT(FLOAT_MAT2);
	JS_GL_CONSTANT(FLOAT_MAT3);
	JS_GL_CONSTANT(FLOAT_MAT4);
	JS_GL_CONSTANT(SAMPLER_2D);
	JS_GL_CONSTANT(SAMPLER_CUBE);
	
	/* Vertex Arrays */
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_ENABLED);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_SIZE);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_STRIDE);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_TYPE);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_NORMALIZED);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_POINTER);
	JS_GL_CONSTANT(VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
	
	/* Read Format */
	
	JS_GL_CONSTANT(IMPLEMENTATION_COLOR_READ_TYPE);
	JS_GL_CONSTANT(IMPLEMENTATION_COLOR_READ_FORMAT);
	
	
	/* Shader Source */
	JS_GL_CONSTANT(COMPILE_STATUS);
	JS_GL_CONSTANT(INFO_LOG_LENGTH);
	JS_GL_CONSTANT(SHADER_SOURCE_LENGTH);
	
	JS_GL_CONSTANT(SHADER_COMPILER);
	
	
	/* Shader Binary */
	
	JS_GL_CONSTANT(SHADER_BINARY_FORMATS);
	JS_GL_CONSTANT(NUM_SHADER_BINARY_FORMATS);
	
	
	/* Shader Precision-Specified Types */
	
	JS_GL_CONSTANT(LOW_FLOAT);
	JS_GL_CONSTANT(MEDIUM_FLOAT);
	JS_GL_CONSTANT(HIGH_FLOAT);
	JS_GL_CONSTANT(LOW_INT);
	JS_GL_CONSTANT(MEDIUM_INT);
	JS_GL_CONSTANT(HIGH_INT);
	
	
	/* Framebuffer Object. */
	JS_GL_CONSTANT(FRAMEBUFFER);
	JS_GL_CONSTANT(RENDERBUFFER);
	
	JS_GL_CONSTANT(RGBA4);
	JS_GL_CONSTANT(RGB5_A1);
	
	//JS_GL_CONSTANT(RGB565);
	
	JS_GL_CONSTANT(DEPTH_COMPONENT16);
	JS_GL_CONSTANT(STENCIL_INDEX);
	JS_GL_CONSTANT(STENCIL_INDEX8);
	
	JS_GL_CONSTANT(DEPTH_STENCIL);
	JS_GL_CONSTANT(DEPTH24_STENCIL8);
	
	
	JS_GL_CONSTANT(RENDERBUFFER_WIDTH);
	JS_GL_CONSTANT(RENDERBUFFER_HEIGHT);
	JS_GL_CONSTANT(RENDERBUFFER_INTERNAL_FORMAT);
	JS_GL_CONSTANT(RENDERBUFFER_RED_SIZE);
	JS_GL_CONSTANT(RENDERBUFFER_GREEN_SIZE);
	JS_GL_CONSTANT(RENDERBUFFER_BLUE_SIZE);
	JS_GL_CONSTANT(RENDERBUFFER_ALPHA_SIZE);
	JS_GL_CONSTANT(RENDERBUFFER_DEPTH_SIZE);
	JS_GL_CONSTANT(RENDERBUFFER_STENCIL_SIZE);
	
	JS_GL_CONSTANT(FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE);
	JS_GL_CONSTANT(FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);
	JS_GL_CONSTANT(FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL);
	JS_GL_CONSTANT(FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE);
	
	JS_GL_CONSTANT(COLOR_ATTACHMENT0);
	JS_GL_CONSTANT(DEPTH_ATTACHMENT);
	JS_GL_CONSTANT(STENCIL_ATTACHMENT);
	
	JS_GL_CONSTANT(DEPTH_STENCIL_ATTACHMENT);
	
	JS_GL_CONSTANT(VERTEX_ARRAY_BINDING);
	
	
	JS_GL_CONSTANT(NONE);
	
	JS_GL_CONSTANT(FRAMEBUFFER_COMPLETE);
	JS_GL_CONSTANT(FRAMEBUFFER_INCOMPLETE_ATTACHMENT);
	JS_GL_CONSTANT(FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT);
	
	//JS_GL_CONSTANT(FRAMEBUFFER_INCOMPLETE_DIMENSIONS);
	
	JS_GL_CONSTANT(FRAMEBUFFER_UNSUPPORTED);
	
	JS_GL_CONSTANT(FRAMEBUFFER_BINDING);
	JS_GL_CONSTANT(RENDERBUFFER_BINDING);
	JS_GL_CONSTANT(MAX_RENDERBUFFER_SIZE);
	
	JS_GL_CONSTANT(INVALID_FRAMEBUFFER_OPERATION);

	// Transform feedback

	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BUFFER_MODE);
	JS_GL_CONSTANT(MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_VARYINGS);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BUFFER_START);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BUFFER_SIZE);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN);
	JS_GL_CONSTANT(MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS);
	JS_GL_CONSTANT(MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS);
	JS_GL_CONSTANT(INTERLEAVED_ATTRIBS);
	JS_GL_CONSTANT(SEPARATE_ATTRIBS);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BUFFER);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BUFFER_BINDING);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_PAUSED);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_ACTIVE);
	JS_GL_CONSTANT(TRANSFORM_FEEDBACK_BINDING);
	
	/* WebGL-specific enums */
	JS_GL_SET_CONSTANT(UNPACK_FLIP_Y_WEBGL, 0x9240);
	JS_GL_SET_CONSTANT(UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0x9241);
	JS_GL_SET_CONSTANT(CONTEXT_LOST_WEBGL, 0x9242);
	JS_GL_SET_CONSTANT(UNPACK_COLORSPACE_CONVERSION_WEBGL, 0x9243);
	JS_GL_SET_CONSTANT(BROWSER_DEFAULT_WEBGL, 0x9244);
	
	//////////////////////////////
	// NOT in WebGL spec
	//////////////////////////////
	
	// PBO
	JS_GL_SET_CONSTANT(PIXEL_PACK_BUFFER, 0x88EB);
	JS_GL_SET_CONSTANT(PIXEL_UNPACK_BUFFER, 0x88EC);
	JS_GL_SET_CONSTANT(PIXEL_PACK_BUFFER_BINDING, 0x88ED);
	JS_GL_SET_CONSTANT(PIXEL_UNPACK_BUFFER_BINDING, 0x88EF);
	
	return exports;
	
}


NODE_API_MODULE(webgl, initModule)
