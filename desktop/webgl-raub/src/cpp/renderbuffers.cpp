#include "webgl.hpp"


using namespace std;


namespace webgl {


JS_METHOD(createRenderbuffer) { NAPI_ENV;
	
	GLuint renderbuffers;
	glGenRenderbuffers(1, &renderbuffers);
	
	RET_NUM(renderbuffers);
	
}


JS_METHOD(deleteRenderbuffer) { NAPI_ENV;
	
	REQ_UINT32_ARG(0, renderbuffer);
	
	glDeleteRenderbuffers(1, reinterpret_cast<GLuint*>(&renderbuffer));
	RET_UNDEFINED;
	
}


JS_METHOD(isRenderbuffer) { NAPI_ENV;
	
	REQ_UINT32_ARG(0, buffer);
	
	RET_BOOL(glIsRenderbuffer(buffer) != 0);
	
}


JS_METHOD(bindRenderbuffer) { NAPI_ENV;
	
	REQ_INT32_ARG(0, target);
	LET_INT32_ARG(1, buffer);
	
	glBindRenderbuffer(target, buffer);
	RET_UNDEFINED;
	
}


JS_METHOD(getRenderbufferParameter) { NAPI_ENV;
	
	REQ_INT32_ARG(0, target);
	REQ_INT32_ARG(1, name);
	
	int value = 0;
	glGetRenderbufferParameteriv(target, name, &value);
	
	RET_NUM(value);
	
}


JS_METHOD(renderbufferStorage) { NAPI_ENV;
	
	REQ_INT32_ARG(0, target);
	REQ_INT32_ARG(1, internalformat);
	REQ_UINT32_ARG(2, width);
	REQ_UINT32_ARG(3, height);
	
	glRenderbufferStorage(target, internalformat, width, height);
	RET_UNDEFINED;
	
}


} // namespace webgl
