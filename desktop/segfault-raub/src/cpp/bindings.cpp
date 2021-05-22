#include "segfault-handler.hpp"


Napi::Object initModule(Napi::Env env, Napi::Object exports) {
	
	RegisterHandler();
	
	exports.DefineProperty(
		Napi::PropertyDescriptor::Function(env, exports, "causeSegfault", CauseSegfault)
	);
	
	return exports;
	
}


NODE_API_MODULE(segfault, initModule)
