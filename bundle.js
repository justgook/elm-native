(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.a4._ === region.bf._)
	{
		return 'on line ' + region.a4._;
	}
	return 'on lines ' + region.a4._ + ' through ' + region.bf._;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bn,
		impl.cg,
		impl.bX,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		K: func(record.K),
		a6: record.a6,
		a0: record.a0
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.K;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.a6;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.a0) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bn,
		impl.cg,
		impl.bX,
		function(sendToApp, initialModel) {
			var view = impl.ch;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bn,
		impl.cg,
		impl.bX,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a3 && impl.a3(sendToApp)
			var view = impl.ch;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.ba);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.b_) && (_VirtualDom_doc.title = title = doc.b_);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.cL;
	var onUrlRequest = impl.cM;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a3: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.bP === next.bP
							&& curr.bl === next.bl
							&& curr.bM.a === next.bM.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bn: function(flags)
		{
			return A3(impl.bn, flags, _Browser_getUrl(), key);
		},
		ch: impl.ch,
		cg: impl.cg,
		bX: impl.bX
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { cA: 'hidden', cl: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { cA: 'mozHidden', cl: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { cA: 'msHidden', cl: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { cA: 'webkitHidden', cl: 'webkitvisibilitychange' }
		: { cA: 'hidden', cl: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cP: _Browser_getScene(),
		c2: {
			f: _Browser_window.pageXOffset,
			g: _Browser_window.pageYOffset,
			a7: _Browser_doc.documentElement.clientWidth,
			aW: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		a7: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aW: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cP: {
				a7: node.scrollWidth,
				aW: node.scrollHeight
			},
			c2: {
				f: node.scrollLeft,
				g: node.scrollTop,
				a7: node.clientWidth,
				aW: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cP: _Browser_getScene(),
			c2: {
				f: x,
				g: y,
				a7: _Browser_doc.documentElement.clientWidth,
				aW: _Browser_doc.documentElement.clientHeight
			},
			cq: {
				f: x + rect.left,
				g: y + rect.top,
				a7: rect.width,
				aW: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// eslint-disable-next-line no-unused-vars
var _Texture_load = F6(function (magnify, mininify, horizontalWrap, verticalWrap, flipY, url) {
  var isMipmap = mininify !== 9728 && mininify !== 9729;
  return _Scheduler_binding(function (callback) {
    var img = new Image();
    function createTexture(gl) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mininify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, horizontalWrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, verticalWrap);
      if (isMipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    }
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      var widthPowerOfTwo = (width & (width - 1)) === 0;
      var heightPowerOfTwo = (height & (height - 1)) === 0;
      var isSizeValid = (widthPowerOfTwo && heightPowerOfTwo) || (
        !isMipmap
        && horizontalWrap === 33071 // clamp to edge
        && verticalWrap === 33071
      );
      if (isSizeValid) {
        callback(_Scheduler_succeed({
          $: 0,
          cp: createTexture,
          a: width,
          b: height
        }));
      } else {
        callback(_Scheduler_fail(A2(
          $elm_explorations$webgl$WebGL$Texture$SizeError,
          width,
          height
        )));
      }
    };
    img.onerror = function () {
      callback(_Scheduler_fail($elm_explorations$webgl$WebGL$Texture$LoadError));
    };
    if (url.slice(0, 5) !== 'data:') {
      img.crossOrigin = 'Anonymous';
    }
    img.src = url;
  });
});

// eslint-disable-next-line no-unused-vars
var _Texture_size = function (texture) {
  return _Utils_Tuple2(texture.a, texture.b);
};


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { f: a[0], g: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.f, r.g]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { f: a[0], g: a[1], c4: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.f, r.g, r.c4]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { f: a[0], g: a[1], c4: a[2], aA: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.f, r.g, r.c4, r.aA]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.br;
    m[1] = r.bv;
    m[2] = r.bz;
    m[3] = r.bD;
    m[4] = r.bs;
    m[5] = r.bw;
    m[6] = r.bA;
    m[7] = r.bE;
    m[8] = r.bt;
    m[9] = r.bx;
    m[10] = r.bB;
    m[11] = r.bF;
    m[12] = r.bu;
    m[13] = r.by;
    m[14] = r.bC;
    m[15] = r.bG;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        br: m[0], bv: m[1], bz: m[2], bD: m[3],
        bs: m[4], bw: m[5], bA: m[6], bE: m[7],
        bt: m[8], bx: m[9], bB: m[10], bF: m[11],
        bu: m[12], by: m[13], bC: m[14], bG: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});


function _WebGL_log(/* msg */) {
  // console.log(msg);
}

var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (gl, setting) {
  gl.enable(gl.BLEND);
  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  gl.blendEquationSeparate(setting.a, setting.d);
  gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
  gl.blendColor(setting.g, setting.h, setting.i, setting.j);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (gl, setting) {
  gl.enable(gl.DEPTH_TEST);
  // a    b    c    d
  // func mask near far
  gl.depthFunc(setting.a);
  gl.depthMask(setting.b);
  gl.depthRange(setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (gl, setting) {
  gl.enable(gl.STENCIL_TEST);
  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  gl.stencilFuncSeparate(gl.FRONT, setting.d, setting.a, setting.b);
  gl.stencilOpSeparate(gl.FRONT, setting.e, setting.f, setting.g);
  gl.stencilMaskSeparate(gl.FRONT, setting.c);
  gl.stencilFuncSeparate(gl.BACK, setting.h, setting.a, setting.b);
  gl.stencilOpSeparate(gl.BACK, setting.i, setting.j, setting.k);
  gl.stencilMaskSeparate(gl.BACK, setting.c);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (gl, setting) {
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (gl, setting) {
  gl.colorMask(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (gl, setting) {
  gl.enable(gl.CULL_FACE);
  gl.cullFace(setting.a);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (gl, setting) {
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_COVERAGE);
  gl.sampleCoverage(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_disableBlend = function (cache) {
  cache.gl.disable(cache.gl.BLEND);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableDepthTest = function (cache) {
  cache.gl.disable(cache.gl.DEPTH_TEST);
  cache.gl.depthMask(true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableStencilTest = function (cache) {
  cache.gl.disable(cache.gl.STENCIL_TEST);
  cache.gl.stencilMask(cache.STENCIL_WRITEMASK);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableScissor = function (cache) {
  cache.gl.disable(cache.gl.SCISSOR_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableColorMask = function (cache) {
  cache.gl.colorMask(true, true, true, true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

function _WebGL_doCompile(gl, src, type) {

  var shader = gl.createShader(type);
  _WebGL_log('Created shader');

  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;

}

function _WebGL_doLink(gl, vshader, fshader) {

  var program = gl.createProgram();
  _WebGL_log('Created program');

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  return program;

}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.be;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  _WebGL_log('Created attribute buffer ' + attribute.name);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.bm > 0) {
    _WebGL_log('Created index buffer');
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.bm);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.be * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint16Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint16Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {

  var gl = model.f.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  _WebGL_log('Drawing');

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = model.f.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = model.f.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        model.f.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = model.f.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        model.f.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        uniformSetters: _WebGL_createUniformSetters(
          gl,
          model,
          glProgram,
          Object.assign({}, entity.b.uniforms, entity.c.uniforms)
        )
      };

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      model.f.programs[progid] = program;

    }

    gl.useProgram(program.glProgram);

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = model.f.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      model.f.buffers.set(entity.d, buffer);
    }

    var numAttributes = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; i++) {
      var attribute = gl.getActiveAttrib(program.glProgram, i);

      var attribLocation = gl.getAttribLocation(program.glProgram, attribute.name);
      gl.enableVertexAttribArray(attribLocation);

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      var attributeBuffer = buffer.buffers[attribute.name];
      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

      gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);

      if (attributeInfo.arraySize === 1) {
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(gl), entity.a);

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.bH, buffer.numIndices, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(entity.d.a.bH, 0, buffer.numIndices);
    }

    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$disableSetting(model.f), entity.a);

  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var textureCounter = 0;
  function createUniformSetter(program, uniform) {
    var uniformLocation = gl.getUniformLocation(program, uniform.name);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      case gl.FLOAT:
        return function (value) {
          gl.uniform1f(uniformLocation, value);
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          gl.uniform2fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          gl.uniform3fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          gl.uniform4fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = model.f.textures.get(texture);
          if (!tex) {
            _WebGL_log('Created texture');
            tex = texture.cp(gl);
            model.f.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(uniformLocation, currentTexture);
        };
      case gl.BOOL:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      default:
        _WebGL_log('Unsupported uniform type: ' + uniform.type);
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(program, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(program, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  _WebGL_log('Render canvas');
  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    model.f.gl = gl;
    model.f.shaders = [];
    model.f.programs = {};
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}
var $author$project$Extra$Jump$Init = {$: 0};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.h) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.k),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.k);
		} else {
			var treeLen = builder.h * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.l) : builder.l;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.h);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.k) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.k);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{l: nodeList, h: (len / $elm$core$Array$branchFactor) | 0, k: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bh: fragment, bl: host, bK: path, bM: port_, bP: protocol, bQ: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Playground$Internal$Game = $elm$core$Basics$identity;
var $author$project$Playground$Internal$GotViewport = function (a) {
	return {$: 2, a: a};
};
var $author$project$Playground$Internal$VisibilityChanged = function (a) {
	return {$: 4, a: a};
};
var $elm$browser$Browser$Events$Visible = 0;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Playground$Internal$Mouse = F4(
	function (x, y, down, click) {
		return {cm: click, aD: down, f: x, g: y};
	});
var $author$project$Playground$Internal$Time = $elm$core$Basics$identity;
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $author$project$Playground$Internal$emptyKeyboard = {ck: false, aD: false, cr: false, cE: $elm$core$Set$empty, aY: false, a2: false, cQ: false, cS: false, cf: false};
var $author$project$Playground$Internal$Success = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm_explorations$webgl$WebGL$Texture$LoadError = {$: 0};
var $elm_explorations$webgl$WebGL$Texture$SizeError = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Texture$size = _Texture_size;
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $author$project$Playground$Internal$gotTextures = F2(
	function (r, textures) {
		if (!r.$) {
			var texturesList = r.a;
			return A3(
				$elm$core$List$foldl,
				function (_v1) {
					var name = _v1.a;
					var t = _v1.b;
					return A2(
						$elm$core$Dict$insert,
						name,
						$author$project$Playground$Internal$Success(
							{
								cR: function (_v2) {
									var w = _v2.a;
									var h = _v2.b;
									return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w, h);
								}(
									$elm_explorations$webgl$WebGL$Texture$size(t)),
								bZ: t
							}));
				},
				textures,
				texturesList);
		} else {
			return textures;
		}
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Playground$Internal$mouseClick = F2(
	function (bool, mouse) {
		return _Utils_update(
			mouse,
			{cm: bool});
	});
var $author$project$Playground$Internal$mouseDown = F2(
	function (bool, mouse) {
		return _Utils_update(
			mouse,
			{aD: bool});
	});
var $author$project$Playground$Internal$mouseMove = F3(
	function (x, y, mouse) {
		return _Utils_update(
			mouse,
			{f: x, g: y});
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Playground$Transformation$identity = {s: 1, t: 0, A: 0, u: 0, v: 1, B: 0};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Playground$Transformation$apply = F2(
	function (a, b) {
		return {s: (a.s * b.s) + (a.t * b.u), t: (a.s * b.t) + (a.t * b.v), A: ((a.s * b.A) + (a.t * b.B)) + a.A, u: (a.u * b.s) + (a.v * b.u), v: (a.u * b.t) + (a.v * b.v), B: ((a.u * b.A) + (a.v * b.B)) + a.B};
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Playground$Transformation$scale = F3(
	function (sx, sy, b) {
		return {s: sx * b.s, t: sx * b.t, A: sx * b.A, u: sy * b.u, v: sy * b.v, B: sy * b.B};
	});
var $elm_explorations$linear_algebra$Math$Vector2$fromRecord = _MJS_v2fromRecord;
var $elm_explorations$linear_algebra$Math$Vector4$fromRecord = _MJS_v4fromRecord;
var $author$project$Playground$Transformation$toGL = function (_v0) {
	var a11 = _v0.s;
	var a12 = _v0.t;
	var a13 = _v0.A;
	var a21 = _v0.u;
	var a22 = _v0.v;
	var a23 = _v0.B;
	return _Utils_Tuple2(
		$elm_explorations$linear_algebra$Math$Vector4$fromRecord(
			{aA: a22, f: a11, g: a12, c4: a21}),
		$elm_explorations$linear_algebra$Math$Vector2$fromRecord(
			{f: a13, g: a23}));
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$Playground$Transformation$transform = F5(
	function (tx, ty, sx, sy, angle) {
		return {
			s: $elm$core$Basics$cos(angle) * sx,
			t: $elm$core$Basics$sin(angle) * (-sy),
			A: tx,
			u: $elm$core$Basics$sin(angle) * sx,
			v: $elm$core$Basics$cos(angle) * sy,
			B: ty
		};
	});
var $author$project$Playground$Internal$renderShape = F6(
	function (screen, textures, parent, parentOpacity, _v0, acc) {
		renderShape:
		while (true) {
			var x = _v0.f;
			var y = _v0.g;
			var a = _v0.b;
			var sx = _v0.c;
			var sy = _v0.d;
			var o = _v0.a;
			var form = _v0.e;
			var entities = acc.a;
			var missing = acc.b;
			var opacity = o * parentOpacity;
			var createTrans = F5(
				function (tx, ty, sx_, sy_, a_) {
					return A2(
						$author$project$Playground$Transformation$apply,
						parent,
						A5($author$project$Playground$Transformation$transform, tx, ty, sx_, sy_, a_));
				});
			switch (form.$) {
				case 0:
					var width = form.a;
					var height = form.b;
					var fn = form.c;
					var _v2 = $author$project$Playground$Transformation$toGL(
						A3(
							$author$project$Playground$Transformation$scale,
							1 / screen.a7,
							1 / screen.aW,
							A5(createTrans, x * 2, y * 2, width * sx, height * sy, a)));
					var t1 = _v2.a;
					var t2 = _v2.b;
					return _Utils_Tuple2(
						A2(
							$elm$core$List$cons,
							A3(fn, t2, t1, opacity),
							entities),
						missing);
				case 1:
					var src = form.a;
					var fn = form.b;
					var _v3 = _Utils_Tuple2(
						A2($elm$core$Set$member, src, missing),
						A2($elm$core$Dict$get, src, textures));
					_v3$2:
					while (true) {
						if (!_v3.b.$) {
							if (_v3.b.a.$ === 1) {
								var texture = _v3.b.a.a.bZ;
								var size = _v3.b.a.a.cR;
								var $temp$screen = screen,
									$temp$textures = textures,
									$temp$parent = A5(createTrans, x * 2, y * 2, sx, sy, a),
									$temp$parentOpacity = opacity,
									$temp$_v0 = fn(texture),
									$temp$acc = acc;
								screen = $temp$screen;
								textures = $temp$textures;
								parent = $temp$parent;
								parentOpacity = $temp$parentOpacity;
								_v0 = $temp$_v0;
								acc = $temp$acc;
								continue renderShape;
							} else {
								break _v3$2;
							}
						} else {
							if (!_v3.a) {
								var _v4 = _v3.b;
								return _Utils_Tuple2(
									entities,
									A2($elm$core$Set$insert, src, missing));
							} else {
								break _v3$2;
							}
						}
					}
					return acc;
				default:
					var shapes = form.a;
					return A3(
						$elm$core$List$foldr,
						A4(
							$author$project$Playground$Internal$renderShape,
							screen,
							textures,
							A5(createTrans, x * 2, y * 2, sx, sy, a),
							opacity),
						acc,
						shapes);
			}
		}
	});
var $author$project$Playground$Internal$render = F3(
	function (screen, textures, shapes) {
		return A2(
			$elm$core$Tuple$mapSecond,
			$elm$core$Set$toList,
			A3(
				$elm$core$List$foldr,
				A4($author$project$Playground$Internal$renderShape, screen, textures, $author$project$Playground$Transformation$identity, 1),
				_Utils_Tuple2(_List_Nil, $elm$core$Set$empty),
				shapes));
	});
var $author$project$Playground$Internal$GotTexture = function (a) {
	return {$: 8, a: a};
};
var $author$project$Playground$Internal$Loading = {$: 0};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm_explorations$webgl$WebGL$Texture$loadWith = F2(
	function (_v0, url) {
		var magnify = _v0.cG;
		var minify = _v0.cH;
		var horizontalWrap = _v0.as;
		var verticalWrap = _v0.ay;
		var flipY = _v0.ao;
		var expand = F4(
			function (_v1, _v2, _v3, _v4) {
				var mag = _v1;
				var min = _v2;
				var hor = _v3;
				var vert = _v4;
				return A6(_Texture_load, mag, min, hor, vert, flipY, url);
			});
		return A4(expand, magnify, minify, horizontalWrap, verticalWrap);
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm_explorations$webgl$WebGL$Texture$Resize = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$linear = 9729;
var $elm_explorations$webgl$WebGL$Texture$Wrap = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$clampToEdge = 33071;
var $elm_explorations$webgl$WebGL$Texture$nearest = 9728;
var $elm_explorations$webgl$WebGL$Texture$nonPowerOfTwoOptions = {ao: true, as: $elm_explorations$webgl$WebGL$Texture$clampToEdge, cG: $elm_explorations$webgl$WebGL$Texture$linear, cH: $elm_explorations$webgl$WebGL$Texture$nearest, ay: $elm_explorations$webgl$WebGL$Texture$clampToEdge};
var $author$project$Playground$Internal$textureOption = _Utils_update(
	$elm_explorations$webgl$WebGL$Texture$nonPowerOfTwoOptions,
	{cG: $elm_explorations$webgl$WebGL$Texture$linear, cH: $elm_explorations$webgl$WebGL$Texture$linear});
var $author$project$Playground$Internal$requestTexture = F2(
	function (missing, textures) {
		return A2(
			$elm$core$Tuple$mapSecond,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Task$sequence,
				$elm$core$Task$attempt($author$project$Playground$Internal$GotTexture)),
			A3(
				$elm$core$List$foldl,
				F2(
					function (url, _v0) {
						var acc1 = _v0.a;
						var acc2 = _v0.b;
						return _Utils_Tuple2(
							A3($elm$core$Dict$insert, url, $author$project$Playground$Internal$Loading, acc1),
							A2(
								$elm$core$List$cons,
								A2(
									$elm$core$Task$map,
									$elm$core$Tuple$pair(url),
									A2($elm_explorations$webgl$WebGL$Texture$loadWith, $author$project$Playground$Internal$textureOption, url)),
								acc2));
					}),
				_Utils_Tuple2(textures, _List_Nil),
				missing));
	});
var $author$project$Playground$Internal$toScreen = F2(
	function (width, height) {
		return {bb: (-height) / 2, aW: height, aY: (-width) / 2, a2: width / 2, b$: height / 2, a7: width};
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $author$project$Playground$Internal$updateKeyboard = F3(
	function (isDown, key, keyboard) {
		var keys = isDown ? A2($elm$core$Set$insert, key, keyboard.cE) : A2($elm$core$Set$remove, key, keyboard.cE);
		switch (key) {
			case ' ':
				return _Utils_update(
					keyboard,
					{cE: keys, cS: isDown});
			case 'Enter':
				return _Utils_update(
					keyboard,
					{cr: isDown, cE: keys});
			case 'Shift':
				return _Utils_update(
					keyboard,
					{cE: keys, cQ: isDown});
			case 'Backspace':
				return _Utils_update(
					keyboard,
					{ck: isDown, cE: keys});
			case 'ArrowUp':
				return _Utils_update(
					keyboard,
					{cE: keys, cf: isDown});
			case 'ArrowDown':
				return _Utils_update(
					keyboard,
					{aD: isDown, cE: keys});
			case 'ArrowLeft':
				return _Utils_update(
					keyboard,
					{cE: keys, aY: isDown});
			case 'ArrowRight':
				return _Utils_update(
					keyboard,
					{cE: keys, a2: isDown});
			default:
				return _Utils_update(
					keyboard,
					{cE: keys});
		}
	});
var $author$project$Playground$Internal$gameUpdate = F4(
	function (viewMemory, updateMemory, msg, _v0) {
		var model = _v0;
		var visibility = model.az;
		var memory = model.at;
		var textures = model.ac;
		var computer = model.co;
		switch (msg.$) {
			case 1:
				var time = msg.a;
				var newModel = _Utils_update(
					model,
					{
						co: computer.cI.cm ? _Utils_update(
							computer,
							{
								cI: A2($author$project$Playground$Internal$mouseClick, false, computer.cI),
								cU: time
							}) : _Utils_update(
							computer,
							{cU: time}),
						at: A2(updateMemory, computer, memory)
					});
				var _v2 = A3(
					$author$project$Playground$Internal$render,
					computer.bU,
					textures,
					A2(viewMemory, newModel.co, newModel.at));
				var entities = _v2.a;
				var missing = _v2.b;
				if (!missing.b) {
					return _Utils_Tuple2(
						_Utils_update(
							newModel,
							{cs: entities}),
						$elm$core$Platform$Cmd$none);
				} else {
					return A2(
						$elm$core$Tuple$mapFirst,
						function (loadingTextures) {
							return _Utils_update(
								newModel,
								{cs: entities, ac: loadingTextures});
						},
						A2($author$project$Playground$Internal$requestTexture, missing, textures));
				}
			case 2:
				var viewport = msg.a.c2;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									bU: A2($author$project$Playground$Internal$toScreen, viewport.a7, viewport.aW)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var newScreen = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{bU: newScreen})
						}),
					$elm$core$Platform$Cmd$none);
			case 0:
				var isDown = msg.a;
				var key = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									bq: A3($author$project$Playground$Internal$updateKeyboard, isDown, key, computer.bq)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 5:
				var pageX = msg.a;
				var pageY = msg.b;
				var y = computer.bU.b$ - pageY;
				var x = computer.bU.aY + pageX;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									cI: A3($author$project$Playground$Internal$mouseMove, x, y, computer.cI)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									cI: A2($author$project$Playground$Internal$mouseClick, true, computer.cI)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 7:
				var isDown = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									cI: A2($author$project$Playground$Internal$mouseDown, isDown, computer.cI)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var vis = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							co: _Utils_update(
								computer,
								{
									bq: $author$project$Playground$Internal$emptyKeyboard,
									cI: A4($author$project$Playground$Internal$Mouse, computer.cI.f, computer.cI.g, false, false)
								}),
							az: vis
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var r = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ac: A2($author$project$Playground$Internal$gotTextures, r, model.ac)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $author$project$Playground$Internal$initialComputer = {
	bq: $author$project$Playground$Internal$emptyKeyboard,
	cI: A4($author$project$Playground$Internal$Mouse, 0, 0, false, false),
	bU: A2($author$project$Playground$Internal$toScreen, 600, 600),
	cU: $elm$time$Time$millisToPosix(0)
};
var $elm$browser$Browser$Events$Document = 0;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {bL: pids, bW: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {bg: event, bp: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.bL,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.bp;
		var event = _v0.bg;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.bW);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$Hidden = 1;
var $elm$browser$Browser$Events$withHidden = F2(
	function (func, isHidden) {
		return func(
			isHidden ? 1 : 0);
	});
var $elm$browser$Browser$Events$onVisibilityChange = function (func) {
	var info = _Browser_visibilityInfo(0);
	return A3(
		$elm$browser$Browser$Events$on,
		0,
		info.cl,
		A2(
			$elm$json$Json$Decode$map,
			$elm$browser$Browser$Events$withHidden(func),
			A2(
				$elm$json$Json$Decode$field,
				'target',
				A2($elm$json$Json$Decode$field, info.cA, $elm$json$Json$Decode$bool))));
};
var $author$project$Playground$Internal$embed = F4(
	function (subs, viewMemory, updateMemory, initialMemory) {
		var view = function (_v2) {
			var entities = _v2.cs;
			return entities;
		};
		var subscriptions = function (_v1) {
			var visibility = _v1.az;
			var computer = _v1.co;
			if (visibility === 1) {
				return $elm$browser$Browser$Events$onVisibilityChange($author$project$Playground$Internal$VisibilityChanged);
			} else {
				return subs(computer);
			}
		};
		var init = _Utils_Tuple2(
			{co: $author$project$Playground$Internal$initialComputer, cs: _List_Nil, at: initialMemory, ac: $elm$core$Dict$empty, az: 0},
			A2($elm$core$Task$perform, $author$project$Playground$Internal$GotViewport, $elm$browser$Browser$Dom$getViewport));
		return {
			bn: init,
			bX: subscriptions,
			cg: A2($author$project$Playground$Internal$gameUpdate, viewMemory, updateMemory),
			ch: view
		};
	});
var $author$project$Playground$Internal$KeyChanged = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Playground$Internal$MouseButton = function (a) {
	return {$: 7, a: a};
};
var $author$project$Playground$Internal$MouseClick = {$: 6};
var $author$project$Playground$Internal$MouseMove = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $author$project$Playground$Internal$Tick = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {a$: oldTime, bT: request, bW: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$browser$Browser$AnimationManager$now = _Browser_now(0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(0);
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.bT;
		var oldTime = _v0.a$;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 1) {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.bW;
		var oldTime = _v0.a$;
		var send = function (sub) {
			if (!sub.$) {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (!sub.$) {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $elm$browser$Browser$Events$onClick = A2($elm$browser$Browser$Events$on, 0, 'click');
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, 0, 'keyup');
var $elm$browser$Browser$Events$onMouseDown = A2($elm$browser$Browser$Events$on, 0, 'mousedown');
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, 0, 'mousemove');
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, 0, 'mouseup');
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Playground$Internal$allSubscriptions = function (computer) {
	return _List_fromArray(
		[
			$elm$browser$Browser$Events$onKeyUp(
			A2(
				$elm$json$Json$Decode$map,
				$author$project$Playground$Internal$KeyChanged(false),
				A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))),
			$elm$browser$Browser$Events$onKeyDown(
			A2(
				$elm$json$Json$Decode$andThen,
				function (k) {
					return A2($elm$core$Set$member, k, computer.bq.cE) ? $elm$json$Json$Decode$fail('') : $elm$json$Json$Decode$succeed(
						A2($author$project$Playground$Internal$KeyChanged, true, k));
				},
				A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))),
			$elm$browser$Browser$Events$onAnimationFrame($author$project$Playground$Internal$Tick),
			$elm$browser$Browser$Events$onVisibilityChange($author$project$Playground$Internal$VisibilityChanged),
			$elm$browser$Browser$Events$onClick(
			$elm$json$Json$Decode$succeed($author$project$Playground$Internal$MouseClick)),
			$elm$browser$Browser$Events$onMouseDown(
			$elm$json$Json$Decode$succeed(
				$author$project$Playground$Internal$MouseButton(true))),
			$elm$browser$Browser$Events$onMouseUp(
			$elm$json$Json$Decode$succeed(
				$author$project$Playground$Internal$MouseButton(false))),
			$elm$browser$Browser$Events$onMouseMove(
			A3(
				$elm$json$Json$Decode$map2,
				$author$project$Playground$Internal$MouseMove,
				A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
				A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float)))
		]);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$browser$Browser$Events$Window = 1;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Playground$Internal$Resized = function (a) {
	return {$: 3, a: a};
};
var $author$project$Playground$Internal$resize = F2(
	function (w, h) {
		return $author$project$Playground$Internal$Resized(
			A2($author$project$Playground$Internal$toScreen, w, h));
	});
var $author$project$Playground$Internal$gameSubscriptions = function (computer) {
	return $elm$core$Platform$Sub$batch(
		A2(
			$elm$core$List$cons,
			$elm$browser$Browser$Events$onResize($author$project$Playground$Internal$resize),
			$author$project$Playground$Internal$allSubscriptions(computer)));
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Playground$Internal$canvasStyle = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('canvas {position: absolute; top: 0; right:0; bottom: 0; left: 0; } ')
		]));
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$core$Basics$round = _Basics_round;
var $elm_explorations$webgl$WebGL$Internal$disableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 0:
				return _WebGL_disableBlend(cache);
			case 1:
				return _WebGL_disableDepthTest(cache);
			case 2:
				return _WebGL_disableStencilTest(cache);
			case 3:
				return _WebGL_disableScissor(cache);
			case 4:
				return _WebGL_disableColorMask(cache);
			case 5:
				return _WebGL_disableCullFace(cache);
			case 6:
				return _WebGL_disablePolygonOffset(cache);
			case 7:
				return _WebGL_disableSampleCoverage(cache);
			default:
				return _WebGL_disableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 0:
				return A2(_WebGL_enableAlpha, ctx, option);
			case 1:
				return A2(_WebGL_enableDepth, ctx, option);
			case 2:
				return A2(_WebGL_enableStencil, ctx, option);
			case 3:
				return A2(_WebGL_enableAntialias, ctx, option);
			case 4:
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 0:
				return A2(_WebGL_enableBlend, gl, setting);
			case 1:
				return A2(_WebGL_enableDepthTest, gl, setting);
			case 2:
				return A2(_WebGL_enableStencilTest, gl, setting);
			case 3:
				return A2(_WebGL_enableScissor, gl, setting);
			case 4:
				return A2(_WebGL_enableColorMask, gl, setting);
			case 5:
				return A2(_WebGL_enableCullFace, gl, setting);
			case 6:
				return A2(_WebGL_enablePolygonOffset, gl, setting);
			case 7:
				return A2(_WebGL_enableSampleCoverage, gl, setting);
			default:
				return A2(_WebGL_enableSampleAlphaToCoverage, gl, setting);
		}
	});
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $author$project$Playground$Internal$webGLOption = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$alpha(false),
		$elm_explorations$webgl$WebGL$depth(1),
		A4($elm_explorations$webgl$WebGL$clearColor, 1, 1, 1, 1)
	]);
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Playground$Internal$viewWrap = F2(
	function (screen, entities) {
		return _List_fromArray(
			[
				$author$project$Playground$Internal$canvasStyle,
				A3(
				$elm_explorations$webgl$WebGL$toHtmlWith,
				$author$project$Playground$Internal$webGLOption,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$width(
						$elm$core$Basics$round(screen.a7)),
						$elm$html$Html$Attributes$height(
						$elm$core$Basics$round(screen.aW))
					]),
				entities)
			]);
	});
var $author$project$Playground$Internal$game = F3(
	function (viewMemory, updateMemory, initialMemory) {
		var view = function (_v2) {
			var computer = _v2.co;
			var entities = _v2.cs;
			return {
				ba: A2($author$project$Playground$Internal$viewWrap, computer.bU, entities),
				b_: 'Playground'
			};
		};
		var _v0 = A4($author$project$Playground$Internal$embed, $author$project$Playground$Internal$gameSubscriptions, viewMemory, updateMemory, initialMemory);
		var init = _v0.bn;
		var update = _v0.cg;
		var subscriptions = _v0.bX;
		return $elm$browser$Browser$document(
			{
				bn: function (_v1) {
					return init;
				},
				bX: subscriptions,
				cg: update,
				ch: view
			});
	});
var $author$project$Playground$game = $author$project$Playground$Internal$game;
var $author$project$Extra$Jump$Play = function (a) {
	return {$: 1, a: a};
};
var $author$project$Extra$Jump$Direction$Neither = 8;
var $author$project$Extra$Jump$Direction$East = 2;
var $author$project$Extra$Jump$Direction$North = 0;
var $author$project$Extra$Jump$Direction$NorthEast = 1;
var $author$project$Extra$Jump$Direction$NorthWest = 7;
var $author$project$Extra$Jump$Direction$South = 4;
var $author$project$Extra$Jump$Direction$SouthEast = 3;
var $author$project$Extra$Jump$Direction$SouthWest = 5;
var $author$project$Extra$Jump$Direction$West = 6;
var $author$project$Extra$Jump$Direction$fromRecord = function (_v0) {
	var x = _v0.f;
	var y = _v0.g;
	return (x > 0) ? ((y > 0) ? 1 : ((y < 0) ? 3 : 2)) : ((x < 0) ? ((y > 0) ? 7 : ((y < 0) ? 5 : 6)) : ((y > 0) ? 0 : ((y < 0) ? 4 : 8)));
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$Playground$squareRootOfTwo = $elm$core$Basics$sqrt(2);
var $author$project$Playground$toX = function (keyboard) {
	return (keyboard.a2 ? 1 : 0) - (keyboard.aY ? 1 : 0);
};
var $author$project$Playground$toY = function (keyboard) {
	return (keyboard.cf ? 1 : 0) - (keyboard.aD ? 1 : 0);
};
var $author$project$Playground$toXY = function (keyboard) {
	var y = $author$project$Playground$toY(keyboard);
	var x = $author$project$Playground$toX(keyboard);
	return ((!(!x)) && (!(!y))) ? _Utils_Tuple2(x / $author$project$Playground$squareRootOfTwo, y / $author$project$Playground$squareRootOfTwo) : _Utils_Tuple2(x, y);
};
var $author$project$Extra$Jump$animatePlayer = F2(
	function (computer, memory) {
		var player = memory.n;
		var _v0 = $author$project$Playground$toXY(computer.bq);
		var x = _v0.a;
		var y = _v0.b;
		var dir = $author$project$Extra$Jump$Direction$fromRecord(
			{f: x, g: y});
		return ((dir !== 8) && (!_Utils_eq(dir, player.T))) ? _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{T: dir, P: 0})
			}) : _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{P: player.P + 1})
			});
	});
var $author$project$AltMath$Vector2$Vec2 = F2(
	function (x, y) {
		return {f: x, g: y};
	});
var $author$project$AltMath$Vector2$vec2 = $author$project$AltMath$Vector2$Vec2;
var $author$project$Extra$Jump$config = {
	N: 0.5,
	bi: -0.125,
	bj: A2($author$project$AltMath$Vector2$vec2, 0, -0.5),
	bo: 9,
	y: 3
};
var $author$project$AltMath$Vector2$setX = F2(
	function (x, _v0) {
		var y = _v0.g;
		return {f: x, g: y};
	});
var $author$project$AltMath$Vector2$setY = F2(
	function (y, _v0) {
		var x = _v0.f;
		return {f: x, g: y};
	});
var $author$project$Extra$Jump$crossScreen = F2(
	function (_v0, memory) {
		var screen = _v0.bU;
		var player = memory.n;
		return (_Utils_cmp(player.i.f * $author$project$Extra$Jump$config.y, screen.a2) > 0) ? _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{
						i: A2($author$project$AltMath$Vector2$setX, screen.aY / $author$project$Extra$Jump$config.y, player.i)
					})
			}) : ((_Utils_cmp(player.i.f * $author$project$Extra$Jump$config.y, screen.aY) < 0) ? _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{
						i: A2($author$project$AltMath$Vector2$setX, screen.a2 / $author$project$Extra$Jump$config.y, player.i)
					})
			}) : ((_Utils_cmp(player.i.g * $author$project$Extra$Jump$config.y, screen.bb) < 0) ? _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{
						i: A2($author$project$AltMath$Vector2$setY, screen.b$ / $author$project$Extra$Jump$config.y, player.i)
					})
			}) : ((_Utils_cmp(player.i.g * $author$project$Extra$Jump$config.y, screen.b$) > 0) ? _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{
						i: A2($author$project$AltMath$Vector2$setY, screen.bb / $author$project$Extra$Jump$config.y, player.i)
					})
			}) : memory)));
	});
var $author$project$Extra$Jump$zero = A2($author$project$AltMath$Vector2$vec2, 0, 0);
var $author$project$Extra$Jump$initPlayer = F2(
	function (x, y) {
		return {
			N: {f: 0, g: 0},
			al: {f: 0, g: 0},
			aC: _List_fromArray(
				[
					{q: $author$project$Extra$Jump$zero, r: $author$project$Extra$Jump$zero}
				]),
			T: 2,
			P: 0,
			i: A2($author$project$AltMath$Vector2$vec2, x, y),
			bR: 9,
			o: $author$project$Extra$Jump$zero
		};
	});
var $author$project$Extra$Jump$initGame = function (_v0) {
	var screen = _v0.bU;
	return {
		n: A2($author$project$Extra$Jump$initPlayer, -10, 90),
		a5: _List_fromArray(
			[
				{
				q: {f: 98, g: -40},
				r: {f: 91, g: 140}
			},
				{
				q: {f: 50, g: -40},
				r: {f: 50, g: 140}
			},
				{
				q: {f: -50, g: -10},
				r: {f: -120, g: -10}
			},
				{
				q: {f: -120, g: 10},
				r: {f: -90, g: 10}
			},
				{
				q: {f: 120, g: -40},
				r: {f: -300, g: -40}
			},
				{
				q: {f: 15, g: 10},
				r: {f: -90, g: 10}
			},
				{
				q: {f: 25, g: 10},
				r: {f: -20, g: -40}
			},
				{
				q: {f: 120, g: 10},
				r: {f: 20, g: 10}
			},
				{
				q: {f: 204, g: 52},
				r: {f: 100, g: 10}
			},
				{
				q: {f: 160, g: -80},
				r: {f: 120, g: -80}
			}
			])
	};
};
var $author$project$AltMath$Vector2$add = F2(
	function (a, b) {
		return A2($author$project$AltMath$Vector2$Vec2, a.f + b.f, a.g + b.g);
	});
var $author$project$Extra$Jump$applyIf = F3(
	function (bool, f, world) {
		return bool ? f(world) : world;
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Extra$Jump$Collision$intersection = F8(
	function (x1, y1, x2, y2, x3, y3, x4, y4) {
		var den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
		if (!den) {
			return $elm$core$Maybe$Nothing;
		} else {
			var u = (-(((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3)))) / den;
			var t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / den;
			return ((t >= 0) && ((t <= 1) && ((u >= 0) && (u <= 1)))) ? $elm$core$Maybe$Just(
				_Utils_Tuple2(t, u)) : $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Extra$Jump$Collision$intersectionVec2 = F4(
	function (p1, p2, p3, p4) {
		return A8($author$project$Extra$Jump$Collision$intersection, p1.f, p1.g, p2.f, p2.g, p3.f, p3.g, p4.f, p4.g);
	});
var $author$project$Extra$Jump$Collision$isLeft = F3(
	function (a, b, c) {
		return _Utils_cmp((b.f - a.f) * (c.g - a.g), (b.g - a.g) * (c.f - a.f)) < 0;
	});
var $author$project$AltMath$Vector2$length = function (_v0) {
	var x = _v0.f;
	var y = _v0.g;
	return $elm$core$Basics$sqrt((x * x) + (y * y));
};
var $author$project$AltMath$Vector2$normalize = function (v2) {
	var len = $author$project$AltMath$Vector2$length(v2);
	return A2($author$project$AltMath$Vector2$Vec2, v2.f / len, v2.g / len);
};
var $author$project$Extra$Jump$Collision$leftNormal = function (vec) {
	var _v0 = $author$project$AltMath$Vector2$normalize(vec);
	var x = _v0.f;
	var y = _v0.g;
	return A2($author$project$AltMath$Vector2$vec2, -y, x);
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$AltMath$Vector2$lengthSquared = function (_v0) {
	var x = _v0.f;
	var y = _v0.g;
	return (x * x) + (y * y);
};
var $author$project$AltMath$Vector2$max = F2(
	function (a, b) {
		return (_Utils_cmp(
			$author$project$AltMath$Vector2$lengthSquared(a),
			$author$project$AltMath$Vector2$lengthSquared(b)) > 0) ? a : b;
	});
var $author$project$AltMath$Vector2$dot = F2(
	function (a, b) {
		return (a.f * b.f) + (a.g * b.g);
	});
var $author$project$AltMath$Vector2$scale = F2(
	function (s, v2) {
		return A2($author$project$AltMath$Vector2$Vec2, s * v2.f, s * v2.g);
	});
var $author$project$AltMath$Vector2$scalarProjection = F2(
	function (a, b) {
		return A2(
			$author$project$AltMath$Vector2$scale,
			A2($author$project$AltMath$Vector2$dot, a, b) / $author$project$AltMath$Vector2$lengthSquared(b),
			b);
	});
var $author$project$Extra$Jump$Collision$slopeFix = 1 / 32;
var $author$project$AltMath$Vector2$sub = F2(
	function (a, b) {
		return A2($author$project$AltMath$Vector2$Vec2, a.f - b.f, a.g - b.g);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Extra$Jump$Collision$lineCircle = F2(
	function (wall, player) {
		var zeroedWall = A2($author$project$AltMath$Vector2$sub, wall.r, wall.q);
		var normal = $author$project$Extra$Jump$Collision$leftNormal(zeroedWall);
		var point = A2(
			$author$project$AltMath$Vector2$add,
			player.i,
			A2($author$project$AltMath$Vector2$scale, player.bR + $author$project$Extra$Jump$Collision$slopeFix, normal));
		return A3($author$project$Extra$Jump$Collision$isLeft, wall.q, wall.r, point) ? A2(
			$elm$core$Maybe$withDefault,
			player,
			A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var t = _v0.a;
					var u = _v0.b;
					var restV = A2($author$project$AltMath$Vector2$scale, 1 - t, player.o);
					var calcRest = A2($author$project$AltMath$Vector2$scalarProjection, restV, zeroedWall);
					return _Utils_update(
						player,
						{
							al: A2($author$project$AltMath$Vector2$max, normal, player.al),
							o: A2(
								$author$project$AltMath$Vector2$add,
								A2($author$project$AltMath$Vector2$scale, -$author$project$Extra$Jump$Collision$slopeFix, normal),
								A2(
									$author$project$AltMath$Vector2$add,
									calcRest,
									A2($author$project$AltMath$Vector2$scale, t, player.o)))
						});
				},
				A4(
					$author$project$Extra$Jump$Collision$intersectionVec2,
					point,
					A2($author$project$AltMath$Vector2$add, point, player.o),
					wall.q,
					wall.r))) : (A3($author$project$Extra$Jump$Collision$isLeft, wall.q, wall.r, player.i) ? A2(
			$elm$core$Maybe$withDefault,
			player,
			A2(
				$elm$core$Maybe$map,
				function (_v1) {
					var t = _v1.a;
					var u = _v1.b;
					return _Utils_update(
						player,
						{
							al: A2($author$project$AltMath$Vector2$max, normal, player.al),
							o: A2(
								$author$project$AltMath$Vector2$add,
								A2(
									$author$project$AltMath$Vector2$add,
									A2($author$project$AltMath$Vector2$scale, -player.bR, normal),
									A2(
										$author$project$AltMath$Vector2$scale,
										t,
										A2($author$project$AltMath$Vector2$scale, player.bR, normal))),
								A2($author$project$AltMath$Vector2$scale, 0.4, player.o))
						});
				},
				A4($author$project$Extra$Jump$Collision$intersectionVec2, player.i, point, wall.q, wall.r))) : player);
	});
var $author$project$Extra$Jump$precision = 1.0e10;
var $author$project$Extra$Jump$roundVec = function (_v0) {
	var x = _v0.f;
	var y = _v0.g;
	return {
		f: $elm$core$Basics$round(x * $author$project$Extra$Jump$precision) / $author$project$Extra$Jump$precision,
		g: $elm$core$Basics$round(y * $author$project$Extra$Jump$precision) / $author$project$Extra$Jump$precision
	};
};
var $author$project$Extra$Jump$simulate = F2(
	function (computer, memory) {
		var player = memory.n;
		var acc = $author$project$Extra$Jump$roundVec(
			A2(
				$author$project$AltMath$Vector2$add,
				$author$project$Extra$Jump$config.bj,
				A2(
					$author$project$AltMath$Vector2$add,
					A2($author$project$AltMath$Vector2$scale, $author$project$Extra$Jump$config.bi, player.o),
					player.N)));
		var forceApplied = _Utils_update(
			player,
			{
				al: $author$project$Extra$Jump$zero,
				o: A2(
					$author$project$AltMath$Vector2$add,
					A2($author$project$AltMath$Vector2$scale, 1.5, acc),
					player.o)
			});
		var newPlayer = A3($elm$core$List$foldl, $author$project$Extra$Jump$Collision$lineCircle, forceApplied, memory.a5);
		return _Utils_update(
			memory,
			{
				n: _Utils_update(
					newPlayer,
					{
						i: A2($author$project$AltMath$Vector2$add, newPlayer.i, newPlayer.o),
						o: $author$project$Extra$Jump$roundVec(
							A3(
								$author$project$Extra$Jump$applyIf,
								_Utils_eq(newPlayer.o, forceApplied.o),
								$author$project$AltMath$Vector2$add(
									A2($author$project$AltMath$Vector2$scale, -0.5, acc)),
								newPlayer.o))
					})
			});
	});
var $author$project$Extra$Jump$updateMovement = F2(
	function (_v0, memory) {
		var keyboard = _v0.bq;
		var player = memory.n;
		var x = keyboard.aY ? (-$author$project$Extra$Jump$config.N) : (keyboard.a2 ? $author$project$Extra$Jump$config.N : 0);
		var _v1 = (keyboard.cS && (_Utils_cmp(player.al.g, -0.5) < 0)) ? _Utils_Tuple2(
			A2($author$project$AltMath$Vector2$vec2, x, $author$project$Extra$Jump$config.bo),
			A2($author$project$AltMath$Vector2$setY, 0, player.o)) : _Utils_Tuple2(
			A2($author$project$AltMath$Vector2$vec2, x, 0),
			player.o);
		var acc = _v1.a;
		var v = _v1.b;
		return _Utils_update(
			memory,
			{
				n: _Utils_update(
					player,
					{N: acc, o: v})
			});
	});
var $author$project$Extra$Jump$update = F2(
	function (computer, memory) {
		if (memory.$ === 1) {
			var m = memory.a;
			return $author$project$Extra$Jump$Play(
				A2(
					$author$project$Extra$Jump$animatePlayer,
					computer,
					A2(
						$author$project$Extra$Jump$crossScreen,
						computer,
						A2(
							$author$project$Extra$Jump$simulate,
							computer,
							A2($author$project$Extra$Jump$updateMovement, computer, m)))));
		} else {
			return $author$project$Extra$Jump$Play(
				$author$project$Extra$Jump$initGame(computer));
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $author$project$Playground$Internal$Form = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Playground$Internal$Shape = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$custom = function (_v0) {
	var r = _v0.bR;
	var g = _v0.ar;
	var b = _v0.ak;
	var a = _v0.b;
	var color = _v0.cn;
	var alpha = _v0.aj;
	var expand = F2(
		function (_v1, _v2) {
			var eq1 = _v1.a;
			var f11 = _v1.b;
			var f12 = _v1.c;
			var eq2 = _v2.a;
			var f21 = _v2.b;
			var f22 = _v2.c;
			return $elm_explorations$webgl$WebGL$Internal$Blend(eq1)(f11)(f12)(eq2)(f21)(f22)(r)(g)(b)(a);
		});
	return A2(expand, color, alpha);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Blender = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$customAdd = F2(
	function (_v0, _v1) {
		var factor1 = _v0;
		var factor2 = _v1;
		return A3($elm_explorations$webgl$WebGL$Settings$Blend$Blender, 32774, factor1, factor2);
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$add = F2(
	function (factor1, factor2) {
		return $elm_explorations$webgl$WebGL$Settings$Blend$custom(
			{
				b: 0,
				aj: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				ak: 0,
				cn: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				ar: 0,
				bR: 0
			});
	});
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Settings$Blend$Factor = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha = 771;
var $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha = 770;
var $author$project$Playground$Render$defaultEntitySettings = _List_fromArray(
	[
		A2($elm_explorations$webgl$WebGL$Settings$Blend$add, $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, true, true, true, false)
	]);
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $author$project$Playground$Shader$fragCircle = {
	src: '\n        precision mediump float;\n        uniform vec4 color;\n        varying vec2 uv;\n        void main () {\n            gl_FragColor = color;\n            gl_FragColor.a *= smoothstep(0.01,0.04,1.-length(uv));\n        }\n    ',
	attributes: {},
	uniforms: {color: 'cn'}
};
var $elm_explorations$webgl$WebGL$Mesh1 = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangleStrip = $elm_explorations$webgl$WebGL$Mesh1(
	{be: 1, bm: 0, bH: 5});
var $author$project$Playground$Shader$mesh = $elm_explorations$webgl$WebGL$triangleStrip(
	_List_fromArray(
		[
			{
			ai: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, -1)
		},
			{
			ai: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, 1)
		},
			{
			ai: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			ai: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		}
		]));
var $elm_explorations$linear_algebra$Math$Vector3$toRecord = _MJS_v3toRecord;
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $author$project$Playground$Render$setAlpha = function (c) {
	return function (c1) {
		return A3($elm_explorations$linear_algebra$Math$Vector4$vec4, c1.f, c1.g, c1.c4);
	}(
		$elm_explorations$linear_algebra$Math$Vector3$toRecord(c));
};
var $author$project$Playground$Shader$vertRect = {
	src: '\n            precision mediump float;\n            attribute vec2 aP;\n            uniform vec4 uT;\n            uniform vec2 uP;\n            varying vec2 uv;\n            void main () {\n                uv = aP;\n                gl_Position = vec4(aP * mat2(uT) + uP, 0., 1.0);\n            }\n        ',
	attributes: {aP: 'ai'},
	uniforms: {uP: 'cc', uT: 'cd'}
};
var $author$project$Playground$Render$circle = F4(
	function (color, uP, uT, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$author$project$Playground$Render$defaultEntitySettings,
			$author$project$Playground$Shader$vertRect,
			$author$project$Playground$Shader$fragCircle,
			$author$project$Playground$Shader$mesh,
			{
				cn: A2($author$project$Playground$Render$setAlpha, color, opacity),
				cc: uP,
				cd: uT
			});
	});
var $author$project$Playground$circle = F2(
	function (color, radius) {
		return {
			b: 0,
			e: A3(
				$author$project$Playground$Internal$Form,
				radius * 2,
				radius * 2,
				$author$project$Playground$Render$circle(color)),
			a: 1,
			c: 1,
			d: 1,
			f: 0,
			g: 0
		};
	});
var $author$project$Playground$Internal$Group = function (a) {
	return {$: 2, a: a};
};
var $author$project$Playground$group = function (shapes) {
	return {
		b: 0,
		e: $author$project$Playground$Internal$Group(shapes),
		a: 1,
		c: 1,
		d: 1,
		f: 0,
		g: 0
	};
};
var $author$project$Playground$move = F3(
	function (dx, dy, _v0) {
		var shape = _v0;
		var x = shape.f;
		var y = shape.g;
		var a = shape.b;
		var sx = shape.c;
		var sy = shape.d;
		var o = shape.a;
		var form = shape.e;
		return _Utils_update(
			shape,
			{f: x + dx, g: y + dy});
	});
var $elm$core$Basics$pi = _Basics_pi;
var $author$project$Playground$Shader$fragFill = {
	src: '\n        precision mediump float;\n        uniform vec4 color;\n\n        void main () {\n            gl_FragColor = color;\n\n        }\n    ',
	attributes: {},
	uniforms: {color: 'cn'}
};
var $author$project$Playground$Shader$vertNone = {
	src: '\n        precision mediump float;\n        attribute vec2 aP;\n        uniform vec4 uT;\n        uniform vec2 uP;\n        void main () {\n            gl_Position = vec4(aP * mat2(uT) + uP, 0., 1.0);\n        }\n    ',
	attributes: {aP: 'ai'},
	uniforms: {uP: 'cc', uT: 'cd'}
};
var $author$project$Playground$Render$rect = F4(
	function (color, uP, uT, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$author$project$Playground$Render$defaultEntitySettings,
			$author$project$Playground$Shader$vertNone,
			$author$project$Playground$Shader$fragFill,
			$author$project$Playground$Shader$mesh,
			{
				cn: A2($author$project$Playground$Render$setAlpha, color, opacity),
				cc: uP,
				cd: uT
			});
	});
var $author$project$Playground$rectangle = F3(
	function (color, width, height) {
		return {
			b: 0,
			e: A3(
				$author$project$Playground$Internal$Form,
				width,
				height,
				$author$project$Playground$Render$rect(color)),
			a: 1,
			c: 1,
			d: 1,
			f: 0,
			g: 0
		};
	});
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $author$project$Playground$rotate = F2(
	function (da, _v0) {
		var shape = _v0;
		var x = shape.f;
		var y = shape.g;
		var a = shape.b;
		var sx = shape.c;
		var sy = shape.d;
		var o = shape.a;
		var form = shape.e;
		return _Utils_update(
			shape,
			{
				b: a + $elm$core$Basics$degrees(da)
			});
	});
var $author$project$Playground$Shader$fragNgon = {
	src: '\n        precision mediump float;\n        uniform vec4 color;\n        uniform float n;\n        varying vec2 uv;\n        void main () {\n            float angle = 3.1415926535897932384626433832795;\n            float a = atan(uv.x,uv.y) + angle;\n            float b = 6.28319 / n;\n            float f = smoothstep(0.5,.5,cos(floor(.5 + a/b)*b-a)*length(uv));\n            gl_FragColor = color;\n            gl_FragColor.a -= f;\n        }\n    ',
	attributes: {},
	uniforms: {color: 'cn', n: 'cJ'}
};
var $author$project$Playground$Render$ngon = F5(
	function (n, color, uP, uT, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$author$project$Playground$Render$defaultEntitySettings,
			$author$project$Playground$Shader$vertRect,
			$author$project$Playground$Shader$fragNgon,
			$author$project$Playground$Shader$mesh,
			{
				cn: A2($author$project$Playground$Render$setAlpha, color, opacity),
				cJ: n,
				cc: uP,
				cd: uT
			});
	});
var $author$project$Playground$triangle = F2(
	function (color, radius) {
		return {
			b: 0,
			e: A3(
				$author$project$Playground$Internal$Form,
				radius * 2,
				radius * 2,
				A2($author$project$Playground$Render$ngon, 3, color)),
			a: 1,
			c: 1,
			d: 1,
			f: 0,
			g: 0
		};
	});
var $author$project$Extra$Jump$drawSegment_ = F6(
	function (start_, end_, _v0, c1, c2, c3) {
		var p1 = _v0.q;
		var p2 = _v0.r;
		var w = $author$project$AltMath$Vector2$length(
			A2($author$project$AltMath$Vector2$sub, p1, p2));
		var start = start_ ? _List_fromArray(
			[
				A3(
				$author$project$Playground$move,
				p1.f,
				p1.g,
				A2($author$project$Playground$circle, c1, 2))
			]) : _List_Nil;
		var a = (A2($elm$core$Basics$atan2, p2.g - p1.g, p2.f - p1.f) / $elm$core$Basics$pi) * 180;
		var addon = end_ ? _List_fromArray(
			[
				A2(
				$author$project$Playground$rotate,
				-90,
				A2(
					$author$project$Playground$rotate,
					a,
					A3(
						$author$project$Playground$move,
						p2.f,
						p2.g,
						A2($author$project$Playground$triangle, c2, 3))))
			]) : _List_Nil;
		return $author$project$Playground$group(
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$author$project$Playground$rotate,
						a,
						A3(
							$author$project$Playground$move,
							(p1.f + p2.f) / 2,
							(p1.g + p2.g) / 2,
							A3($author$project$Playground$rectangle, c3, w, 1)))
					]),
				_Utils_ap(start, addon)));
	});
var $author$project$Extra$Jump$drawSegment = A2($author$project$Extra$Jump$drawSegment_, true, true);
var $author$project$Playground$fade = F2(
	function (o, _v0) {
		var shape = _v0;
		return _Utils_update(
			shape,
			{a: o});
	});
var $author$project$Playground$moveX = F2(
	function (dx, _v0) {
		var shape = _v0;
		var x = shape.f;
		var y = shape.g;
		var a = shape.b;
		var sx = shape.c;
		var sy = shape.d;
		var o = shape.a;
		var form = shape.e;
		return _Utils_update(
			shape,
			{f: x + dx});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Playground$colorClamp = function (number) {
	return A3(
		$elm$core$Basics$clamp,
		0,
		255,
		$elm$core$Basics$round(number));
};
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $author$project$Playground$rgb = F3(
	function (r, g, b) {
		return A3(
			$elm_explorations$linear_algebra$Math$Vector3$vec3,
			$author$project$Playground$colorClamp(r) / 255,
			$author$project$Playground$colorClamp(g) / 255,
			$author$project$Playground$colorClamp(b) / 255);
	});
var $author$project$Extra$Jump$randomColor = function (i) {
	var getAt = F2(
		function (idx, xs) {
			return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
				A2($elm$core$List$drop, idx, xs));
		});
	return A2(
		$elm$core$Maybe$withDefault,
		A3($author$project$Playground$rgb, 196, 223, 15),
		A2(
			getAt,
			A2($elm$core$Basics$modBy, 11, i),
			_List_fromArray(
				[
					A3($author$project$Playground$rgb, 130, 178, 182),
					A3($author$project$Playground$rgb, 226, 23, 49),
					A3($author$project$Playground$rgb, 57, 54, 134),
					A3($author$project$Playground$rgb, 204, 2, 181),
					A3($author$project$Playground$rgb, 18, 187, 231),
					A3($author$project$Playground$rgb, 8, 144, 133),
					A3($author$project$Playground$rgb, 129, 8, 16),
					A3($author$project$Playground$rgb, 156, 230, 146),
					A3($author$project$Playground$rgb, 5, 77, 37),
					A3($author$project$Playground$rgb, 72, 116, 216),
					A3($author$project$Playground$rgb, 196, 223, 15)
				])));
};
var $author$project$Playground$intFromHexChar = function (s) {
	switch (s) {
		case '0':
			return $elm$core$Maybe$Just(0);
		case '1':
			return $elm$core$Maybe$Just(1);
		case '2':
			return $elm$core$Maybe$Just(2);
		case '3':
			return $elm$core$Maybe$Just(3);
		case '4':
			return $elm$core$Maybe$Just(4);
		case '5':
			return $elm$core$Maybe$Just(5);
		case '6':
			return $elm$core$Maybe$Just(6);
		case '7':
			return $elm$core$Maybe$Just(7);
		case '8':
			return $elm$core$Maybe$Just(8);
		case '9':
			return $elm$core$Maybe$Just(9);
		case 'a':
			return $elm$core$Maybe$Just(10);
		case 'b':
			return $elm$core$Maybe$Just(11);
		case 'c':
			return $elm$core$Maybe$Just(12);
		case 'd':
			return $elm$core$Maybe$Just(13);
		case 'e':
			return $elm$core$Maybe$Just(14);
		case 'f':
			return $elm$core$Maybe$Just(15);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Playground$maybeMap6 = F7(
	function (func, ma, mb, mc, md, me, mf) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					if (md.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var d = md.a;
						if (me.$ === 1) {
							return $elm$core$Maybe$Nothing;
						} else {
							var e = me.a;
							if (mf.$ === 1) {
								return $elm$core$Maybe$Nothing;
							} else {
								var f = mf.a;
								return $elm$core$Maybe$Just(
									A6(func, a, b, c, d, e, f));
							}
						}
					}
				}
			}
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Playground$hexColor2Vec3 = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	if ((((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) && (!_v0.b.b.b.b.b.b.b)) {
		var r1 = _v0.a;
		var _v1 = _v0.b;
		var r2 = _v1.a;
		var _v2 = _v1.b;
		var g1 = _v2.a;
		var _v3 = _v2.b;
		var g2 = _v3.a;
		var _v4 = _v3.b;
		var b1 = _v4.a;
		var _v5 = _v4.b;
		var b2 = _v5.a;
		return A7(
			$author$project$Playground$maybeMap6,
			F6(
				function (a, b, c, d, e, f) {
					return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((a * 16) + b) / 255, ((c * 16) + d) / 255, ((e * 16) + f) / 255);
				}),
			$author$project$Playground$intFromHexChar(r1),
			$author$project$Playground$intFromHexChar(r2),
			$author$project$Playground$intFromHexChar(g1),
			$author$project$Playground$intFromHexChar(g2),
			$author$project$Playground$intFromHexChar(b1),
			$author$project$Playground$intFromHexChar(b2));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Playground$yellow = A2(
	$elm$core$Maybe$withDefault,
	A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0),
	$author$project$Playground$hexColor2Vec3('#edd400'));
var $author$project$Extra$Jump$debug = F2(
	function (computer, memory) {
		var player = memory.n;
		var _static = memory.a5;
		return $author$project$Playground$group(
			A3(
				$elm$core$List$foldl,
				F2(
					function (_v0, acc) {
						var p1 = _v0.q;
						var p2 = _v0.r;
						var w = $author$project$AltMath$Vector2$length(
							A2($author$project$AltMath$Vector2$sub, p1, p2));
						var a = (A2($elm$core$Basics$atan2, p2.g - p1.g, p2.f - p1.f) / $elm$core$Basics$pi) * 180;
						return A2(
							$elm$core$List$cons,
							A2(
								$author$project$Playground$fade,
								0.5,
								A2(
									$author$project$Playground$rotate,
									a,
									A3(
										$author$project$Playground$move,
										(p1.f + p2.f) / 2,
										(p1.g + p2.g) / 2,
										$author$project$Playground$group(
											_List_fromArray(
												[
													A3($author$project$Playground$rectangle, $author$project$Playground$yellow, w, 2),
													A2(
													$author$project$Playground$rotate,
													180,
													A2($author$project$Playground$triangle, $author$project$Playground$yellow, 5)),
													A2(
													$author$project$Playground$moveX,
													w / (-2),
													A2($author$project$Playground$circle, $author$project$Playground$yellow, 3))
												]))))),
							acc);
					}),
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, a) {
							return A4(
								$author$project$Extra$Jump$drawSegment,
								a,
								$author$project$Extra$Jump$randomColor(i),
								$author$project$Extra$Jump$randomColor(i),
								$author$project$Extra$Jump$randomColor(i));
						}),
					player.aC),
				_static));
	});
var $author$project$Playground$Advanced$custom = F3(
	function (width, height, render) {
		return {
			b: 0,
			e: A3($author$project$Playground$Internal$Form, width, height, render),
			a: 1,
			c: 1,
			d: 1,
			f: 0,
			g: 0
		};
	});
var $author$project$Extra$Jump$TileMap$vertFullscreen = {
	src: '\n            precision mediump float;\n            attribute vec2 aP;\n\n            void main () {\n\n                gl_Position = vec4(aP, 0., 1.0);\n            }\n        ',
	attributes: {aP: 'ai'},
	uniforms: {}
};
var $author$project$Extra$Jump$TileMap$fullscreen = A3(
	$author$project$Playground$Advanced$custom,
	1,
	1,
	F3(
		function (translate, scaleRotateSkew, opacity) {
			return A5(
				$elm_explorations$webgl$WebGL$entityWith,
				$author$project$Playground$Render$defaultEntitySettings,
				$author$project$Extra$Jump$TileMap$vertFullscreen,
				$author$project$Playground$Shader$fragFill,
				$author$project$Playground$Shader$mesh,
				{
					cn: A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 14 / 255, 21 / 255, 28 / 255, 1),
					cb: opacity,
					cc: translate,
					cd: scaleRotateSkew
				});
		}));
var $author$project$Extra$Jump$Sprite$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$Playground$Extra$scaleX = F2(
	function (sx, _v0) {
		var shape = _v0;
		return _Utils_update(
			shape,
			{c: shape.c * sx});
	});
var $author$project$Extra$Jump$Sprite$image = 'data:image/png;base64,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';
var $author$project$Playground$moveY = F2(
	function (dy, _v0) {
		var shape = _v0;
		var x = shape.f;
		var y = shape.g;
		var a = shape.b;
		var sx = shape.c;
		var sy = shape.d;
		var o = shape.a;
		var form = shape.e;
		return _Utils_update(
			shape,
			{g: y + dy});
	});
var $author$project$Playground$Extra$size = function (t) {
	return function (_v0) {
		var w = _v0.a;
		var h = _v0.b;
		return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w, h);
	}(
		$elm_explorations$webgl$WebGL$Texture$size(t));
};
var $author$project$Playground$Shader$fragImage = {
	src: '\n        precision mediump float;\n        varying vec2 uv;\n        uniform vec2 uImgSize;\n        uniform sampler2D uImg;\n        uniform float uA;\n        void main () {\n            vec2 pixel = (floor(uv * uImgSize) + 0.5) / uImgSize;\n            gl_FragColor = texture2D(uImg, pixel);\n            gl_FragColor.a *= uA;\n        }\n    ',
	attributes: {},
	uniforms: {uA: 'cb', uImg: 'aw', uImgSize: 'ax'}
};
var $author$project$Playground$Shader$vertSprite = {
	src: 'precision mediump float;attribute vec2 aP;uniform vec2 uP;varying vec2 uv;uniform vec4 uT,uUV;void main(){vec2 aP_=aP*.5+.5;uv=uUV.xy+aP_*uUV.zw,gl_Position=vec4(aP*mat2(uT)+uP,0.,1.);}',
	attributes: {aP: 'ai'},
	uniforms: {uP: 'cc', uT: 'cd', uUV: 'ce'}
};
var $author$project$Playground$Render$sprite = F6(
	function (image_, imageSize, uv, translate, scaleRotateSkew, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$author$project$Playground$Render$defaultEntitySettings,
			$author$project$Playground$Shader$vertSprite,
			$author$project$Playground$Shader$fragImage,
			$author$project$Playground$Shader$mesh,
			{cb: opacity, aw: image_, ax: imageSize, cc: translate, cd: scaleRotateSkew, ce: uv});
	});
var $author$project$Playground$Internal$Textured = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Playground$Advanced$useTexture = F2(
	function (url, fn) {
		return {
			b: 0,
			e: A2($author$project$Playground$Internal$Textured, url, fn),
			a: 1,
			c: 1,
			d: 1,
			f: 0,
			g: 0
		};
	});
var $author$project$Playground$Extra$sprite = F4(
	function (tileW, tileH, atlas, uv) {
		return A2(
			$author$project$Playground$Advanced$useTexture,
			atlas,
			function (t) {
				return A3(
					$author$project$Playground$Advanced$custom,
					tileW,
					tileH,
					A3(
						$author$project$Playground$Render$sprite,
						t,
						$author$project$Playground$Extra$size(t),
						uv));
			});
	});
var $author$project$Extra$Jump$Sprite$sheet = {
	aB: A4(
		$author$project$Playground$Extra$sprite,
		12,
		18,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.07391304347826087, 0, 0.05217391304347826, 0.23684210526315788)),
	aE: A2(
		$author$project$Playground$moveY,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.004347826086956522, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367))),
	aF: A2(
		$author$project$Playground$moveY,
		1.5,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			15,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.06956521739130435, 0.2894736842105262, 0.05652173913043478, 0.19736842105263158))),
	am: A4(
		$author$project$Playground$Extra$sprite,
		13,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.6565217391304348, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367)),
	cu: A4(
		$author$project$Playground$Extra$sprite,
		13,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.7217391304347827, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367)),
	cv: A4(
		$author$project$Playground$Extra$sprite,
		13,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.7869565217391304, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367)),
	aG: A2(
		$author$project$Playground$moveY,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			17,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.8521739130434782, 0.26315789473684204, 0.05652173913043478, 0.2236842105263158))),
	aH: A4(
		$author$project$Playground$Extra$sprite,
		13,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.13478260869565217, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367)),
	aI: A2(
		$author$project$Playground$moveX,
		0.5,
		A2(
			$author$project$Playground$moveY,
			-0.5,
			A4(
				$author$project$Playground$Extra$sprite,
				12,
				15,
				$author$project$Extra$Jump$Sprite$image,
				A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.2, 0.2894736842105262, 0.05217391304347826, 0.19736842105263158)))),
	aJ: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.2608695652173913, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367))),
	aK: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.32608695652173914, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367))),
	aL: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.391304347826087, 0.2763157894736842, 0.05652173913043478, 0.21052631578947367))),
	an: A2(
		$author$project$Playground$moveX,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			14,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.45652173913043476, 0.2763157894736842, 0.06086956521739131, 0.21052631578947367))),
	cw: A4(
		$author$project$Playground$Extra$sprite,
		13,
		17,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.5260869565217391, 0.26315789473684204, 0.05652173913043478, 0.2236842105263158)),
	aM: A2(
		$author$project$Playground$moveY,
		-0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			13,
			17,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.5913, 0.2632, 0.05652, 0.2237))),
	Z: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.004347826086956522, 0.02631578947368418, 0.06086956521739131, 0.21052631578947367)),
	ap: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.004347826086956522, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367)),
	aN: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.07391304347826087, 0.5394736842105263, 0.06086956521739131, 0.19736842105263158)),
	aq: A2(
		$author$project$Playground$moveX,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			14,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.7043478260869566, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367))),
	cx: A2(
		$author$project$Playground$moveX,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			14,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.7739130434782608, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367))),
	cy: A2(
		$author$project$Playground$moveX,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			14,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.8434782608695652, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367))),
	aO: A2(
		$author$project$Playground$moveX,
		0.5,
		A2(
			$author$project$Playground$moveY,
			0.5,
			A4(
				$author$project$Playground$Extra$sprite,
				14,
				17,
				$author$project$Extra$Jump$Sprite$image,
				A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.9130434782608695, 0.513157894736842, 0.06086956521739131, 0.2236842105263158)))),
	aP: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.14347826086956522, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367)),
	aQ: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.21304347826086956, 0.5394736842105263, 0.06086956521739131, 0.19736842105263158)),
	aR: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.2826086956521739, 0.5394736842105263, 0.06086956521739131, 0.19736842105263158)),
	aS: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.3521739130434783, 0.5394736842105263, 0.06086956521739131, 0.19736842105263158)),
	aT: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.4217391304347826, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367)),
	aU: A4(
		$author$project$Playground$Extra$sprite,
		15,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.49130434782608695, 0.5263157894736843, 0.06521739130434782, 0.21052631578947367)),
	cz: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.5652173913043478, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367)),
	aV: A2(
		$author$project$Playground$moveX,
		0.5,
		A4(
			$author$project$Playground$Extra$sprite,
			14,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.6347826086956522, 0.5263157894736843, 0.06086956521739131, 0.21052631578947367))),
	b0: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.004347826086956522, 0.7763157894736842, 0.06086956521739131, 0.21052631578947367)),
	au: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.07391304347826087, 0.7894736842105262, 0.06086956521739131, 0.19736842105263158)),
	av: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			15,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.7086956521739131, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367))),
	b1: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			15,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.782608695652174, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367))),
	b2: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			15,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.8565217391304348, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367))),
	b3: A2(
		$author$project$Playground$moveX,
		1,
		A2(
			$author$project$Playground$moveY,
			0.5,
			A4(
				$author$project$Playground$Extra$sprite,
				15,
				17,
				$author$project$Extra$Jump$Sprite$image,
				A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.9304347826086956, 0.763157894736842, 0.06521739130434782, 0.2236842105263158)))),
	b4: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.14347826086956522, 0.7763157894736842, 0.06086956521739131, 0.21052631578947367)),
	b5: A4(
		$author$project$Playground$Extra$sprite,
		13,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.21304347826086956, 0.7894736842105262, 0.05652173913043478, 0.19736842105263158)),
	b6: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.2782608695652174, 0.7894736842105262, 0.06086956521739131, 0.19736842105263158)),
	b7: A4(
		$author$project$Playground$Extra$sprite,
		14,
		15,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.34782608695652173, 0.7894736842105262, 0.06086956521739131, 0.19736842105263158)),
	b8: A4(
		$author$project$Playground$Extra$sprite,
		14,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.41739130434782606, 0.7763157894736842, 0.06086956521739131, 0.21052631578947367)),
	b9: A4(
		$author$project$Playground$Extra$sprite,
		15,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.48695652173913045, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367)),
	cV: A4(
		$author$project$Playground$Extra$sprite,
		15,
		16,
		$author$project$Extra$Jump$Sprite$image,
		A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.5608695652173913, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367)),
	ca: A2(
		$author$project$Playground$moveX,
		1,
		A4(
			$author$project$Playground$Extra$sprite,
			15,
			16,
			$author$project$Extra$Jump$Sprite$image,
			A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0.6347826086956522, 0.7763157894736842, 0.06521739130434782, 0.21052631578947367)))
};
var $author$project$Extra$Jump$Sprite$idle = F2(
	function (dir, frame_) {
		var get = $author$project$Extra$Jump$Sprite$getAt(
			A2(
				$elm$core$Basics$modBy,
				20,
				$elm$core$Basics$round(frame_ / 5)));
		switch (dir) {
			case 0:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.av,
					get(
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.ca, $author$project$Extra$Jump$Sprite$sheet.av, $author$project$Extra$Jump$Sprite$sheet.b1, $author$project$Extra$Jump$Sprite$sheet.b2, $author$project$Extra$Jump$Sprite$sheet.b3])));
			case 1:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.aV,
					get(
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.aq, $author$project$Extra$Jump$Sprite$sheet.aO])));
			case 2:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.aM,
					get(
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.am, $author$project$Extra$Jump$Sprite$sheet.aG])));
			case 3:
				return $author$project$Extra$Jump$Sprite$sheet.Z;
			case 4:
				return $author$project$Extra$Jump$Sprite$sheet.aB;
			case 5:
				return A2($author$project$Playground$Extra$scaleX, -1, $author$project$Extra$Jump$Sprite$sheet.Z);
			case 6:
				return A2(
					$author$project$Playground$Extra$scaleX,
					-1,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Extra$Jump$Sprite$sheet.aM,
						get(
							_List_fromArray(
								[$author$project$Extra$Jump$Sprite$sheet.am, $author$project$Extra$Jump$Sprite$sheet.aG]))));
			case 7:
				return A2(
					$author$project$Playground$Extra$scaleX,
					-1,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Extra$Jump$Sprite$sheet.aV,
						get(
							_List_fromArray(
								[$author$project$Extra$Jump$Sprite$sheet.aq, $author$project$Extra$Jump$Sprite$sheet.aO]))));
			default:
				return $author$project$Extra$Jump$Sprite$sheet.au;
		}
	});
var $author$project$Extra$Jump$TileMap$lut1 = 'data:image/png;base64,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';
var $author$project$Extra$Jump$TileMap$fragTileMap = {
	src: '\nprecision mediump float;\nvarying vec2 uv;\nuniform sampler2D uAtlas;\nuniform sampler2D uLut;\nuniform vec2 uAtlasSize;\nuniform vec2 uLutSize;\nuniform vec2 uTileSize;\nuniform float uA;\nfloat color2float(vec4 color) {\n    return\n    color.a * 255.0\n    + color.b * 256.0 * 255.0\n    + color.g * 256.0 * 256.0 * 255.0\n    + color.r * 256.0 * 256.0 * 256.0 * 255.0;\n    }\nfloat modI(float a, float b) {\n   float m = a - floor((a + 0.5) / b) * b;\n   return floor(m + 0.5);\n}\n\nvoid main () {\n   vec2 point = uv * uLutSize;\n   vec2 look = floor(point);\n   //(2i + 1)/(2N) Pixel center\n   vec2 coordinate = (look + 0.5) / uLutSize;\n   float uIndex = color2float(texture2D(uLut, coordinate));\n   vec2 grid = uAtlasSize / uTileSize;\n   // tile indexes in uAtlas starts from zero, but in lut zero is used for\n   // \"none\" placeholder\n   vec2 tile = vec2(modI((uIndex - 1.), grid.x), int(uIndex - 1.) / int(grid.x));\n   // inverting reading botom to top\n   tile.y = grid.y - tile.y - 1.;\n   vec2 fragmentOffsetPx = floor((point - look) * uTileSize);\n   //(2i + 1)/(2N) Pixel center\n   vec2 pixel = (floor(tile * uTileSize + fragmentOffsetPx) + 0.5) / uAtlasSize;\n   gl_FragColor = texture2D(uAtlas, pixel);\n   gl_FragColor.a *= float(uIndex > 0.);\n   gl_FragColor.rgb *= gl_FragColor.a;\n\n}\n    ',
	attributes: {},
	uniforms: {uA: 'cb', uAtlas: 'cW', uAtlasSize: 'cX', uLut: 'cY', uLutSize: 'cZ', uTileSize: 'c_'}
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $author$project$Playground$Shader$vertImage = {
	src: '\n            precision mediump float;\n            attribute vec2 aP;\n            uniform vec4 uT;\n            uniform vec2 uP;\n            varying vec2 uv;\n            void main () {\n                uv = aP * .5 + 0.5;\n                gl_Position = vec4(aP * mat2(uT) + uP, 0., 1.0);\n            }\n        ',
	attributes: {aP: 'ai'},
	uniforms: {uP: 'cc', uT: 'cd'}
};
var $author$project$Extra$Jump$TileMap$tileMap = F4(
	function (tileW, tileH, tileset, lut) {
		return A2(
			$author$project$Playground$Advanced$useTexture,
			tileset,
			function (tileset_) {
				return A2(
					$author$project$Playground$Advanced$useTexture,
					lut,
					function (lut_) {
						var _v0 = A3(
							$elm$core$Tuple$mapBoth,
							$elm$core$Basics$toFloat,
							$elm$core$Basics$toFloat,
							$elm_explorations$webgl$WebGL$Texture$size(lut_));
						var w2 = _v0.a;
						var h2 = _v0.b;
						var _v1 = A3(
							$elm$core$Tuple$mapBoth,
							$elm$core$Basics$toFloat,
							$elm$core$Basics$toFloat,
							$elm_explorations$webgl$WebGL$Texture$size(tileset_));
						var w1 = _v1.a;
						var h1 = _v1.b;
						return A3(
							$author$project$Playground$Advanced$custom,
							w2 * tileW,
							h2 * tileH,
							F3(
								function (translate, scaleRotateSkew, opacity) {
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										$author$project$Playground$Render$defaultEntitySettings,
										$author$project$Playground$Shader$vertImage,
										$author$project$Extra$Jump$TileMap$fragTileMap,
										$author$project$Playground$Shader$mesh,
										{
											cb: opacity,
											cW: tileset_,
											cX: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w1, h1),
											cY: lut_,
											cZ: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w2, h2),
											cc: translate,
											cd: scaleRotateSkew,
											c_: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, tileW, tileH)
										});
								}));
					});
			});
	});
var $author$project$Extra$Jump$TileMap$tileset1 = 'data:image/png;base64,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';
var $author$project$Extra$Jump$TileMap$level1 = A4($author$project$Extra$Jump$TileMap$tileMap, 8, 8, $author$project$Extra$Jump$TileMap$tileset1, $author$project$Extra$Jump$TileMap$lut1);
var $author$project$Extra$Jump$pxSnap = A2($elm$core$Basics$composeR, $elm$core$Basics$round, $elm$core$Basics$toFloat);
var $author$project$Extra$Jump$Sprite$run = F2(
	function (dir, frame_) {
		var frame = $elm$core$Basics$round(frame_ / 5);
		switch (dir) {
			case 0:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.av,
					A2(
						$author$project$Extra$Jump$Sprite$getAt,
						A2($elm$core$Basics$modBy, 8, frame),
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.b0, $author$project$Extra$Jump$Sprite$sheet.au, $author$project$Extra$Jump$Sprite$sheet.b4, $author$project$Extra$Jump$Sprite$sheet.b5, $author$project$Extra$Jump$Sprite$sheet.b6, $author$project$Extra$Jump$Sprite$sheet.b7, $author$project$Extra$Jump$Sprite$sheet.b8, $author$project$Extra$Jump$Sprite$sheet.b9])));
			case 1:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.ap,
					A2(
						$author$project$Extra$Jump$Sprite$getAt,
						A2($elm$core$Basics$modBy, 8, frame),
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.ap, $author$project$Extra$Jump$Sprite$sheet.aN, $author$project$Extra$Jump$Sprite$sheet.aP, $author$project$Extra$Jump$Sprite$sheet.aQ, $author$project$Extra$Jump$Sprite$sheet.aR, $author$project$Extra$Jump$Sprite$sheet.aS, $author$project$Extra$Jump$Sprite$sheet.aT, $author$project$Extra$Jump$Sprite$sheet.aU])));
			case 2:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Extra$Jump$Sprite$sheet.an,
					A2(
						$author$project$Extra$Jump$Sprite$getAt,
						A2($elm$core$Basics$modBy, 8, frame),
						_List_fromArray(
							[$author$project$Extra$Jump$Sprite$sheet.aE, $author$project$Extra$Jump$Sprite$sheet.aF, $author$project$Extra$Jump$Sprite$sheet.aH, $author$project$Extra$Jump$Sprite$sheet.aI, $author$project$Extra$Jump$Sprite$sheet.aJ, $author$project$Extra$Jump$Sprite$sheet.aK, $author$project$Extra$Jump$Sprite$sheet.aL, $author$project$Extra$Jump$Sprite$sheet.an])));
			case 3:
				return $author$project$Extra$Jump$Sprite$sheet.Z;
			case 4:
				return $author$project$Extra$Jump$Sprite$sheet.aB;
			case 5:
				return A2($author$project$Playground$Extra$scaleX, -1, $author$project$Extra$Jump$Sprite$sheet.Z);
			case 6:
				return A2(
					$author$project$Playground$Extra$scaleX,
					-1,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Extra$Jump$Sprite$sheet.am,
						A2(
							$author$project$Extra$Jump$Sprite$getAt,
							A2($elm$core$Basics$modBy, 8, frame),
							_List_fromArray(
								[$author$project$Extra$Jump$Sprite$sheet.aE, $author$project$Extra$Jump$Sprite$sheet.aF, $author$project$Extra$Jump$Sprite$sheet.aH, $author$project$Extra$Jump$Sprite$sheet.aI, $author$project$Extra$Jump$Sprite$sheet.aJ, $author$project$Extra$Jump$Sprite$sheet.aK, $author$project$Extra$Jump$Sprite$sheet.aL, $author$project$Extra$Jump$Sprite$sheet.an]))));
			case 7:
				return A2(
					$author$project$Playground$Extra$scaleX,
					-1,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Extra$Jump$Sprite$sheet.aq,
						A2(
							$author$project$Extra$Jump$Sprite$getAt,
							A2($elm$core$Basics$modBy, 8, frame),
							_List_fromArray(
								[$author$project$Extra$Jump$Sprite$sheet.ap, $author$project$Extra$Jump$Sprite$sheet.aN, $author$project$Extra$Jump$Sprite$sheet.aP, $author$project$Extra$Jump$Sprite$sheet.aQ, $author$project$Extra$Jump$Sprite$sheet.aR, $author$project$Extra$Jump$Sprite$sheet.aS, $author$project$Extra$Jump$Sprite$sheet.aT, $author$project$Extra$Jump$Sprite$sheet.aU]))));
			default:
				return $author$project$Extra$Jump$Sprite$sheet.au;
		}
	});
var $author$project$Playground$scale = F2(
	function (ns, _v0) {
		var shape = _v0;
		var x = shape.f;
		var y = shape.g;
		var a = shape.b;
		var sx = shape.c;
		var sy = shape.d;
		var o = shape.a;
		var form = shape.e;
		return _Utils_update(
			shape,
			{c: sx * ns, d: sy * ns});
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Extra$Jump$view = F2(
	function (computer, m) {
		if (m.$ === 1) {
			var memory = m.a;
			var player = memory.n;
			return $elm$core$List$singleton(
				A2(
					$author$project$Playground$scale,
					$author$project$Extra$Jump$config.y,
					A3(
						$author$project$Playground$move,
						(-player.i.f) * $author$project$Extra$Jump$config.y,
						(-16) * $author$project$Extra$Jump$config.y,
						$author$project$Playground$group(
							_List_fromArray(
								[
									$author$project$Extra$Jump$TileMap$fullscreen,
									$author$project$Extra$Jump$TileMap$level1,
									A3(
									$author$project$Playground$move,
									$author$project$Extra$Jump$pxSnap(player.i.f),
									$author$project$Extra$Jump$pxSnap(player.i.g),
									((player.o.f > 0.5) || (_Utils_cmp(player.o.f, -0.5) < 0)) ? A2($author$project$Extra$Jump$Sprite$run, player.T, player.P) : A2($author$project$Extra$Jump$Sprite$idle, player.T, player.P)),
									A2($author$project$Extra$Jump$debug, computer, memory)
								])))));
		} else {
			return _List_Nil;
		}
	});
var $author$project$Extra$Jump$main = A3($author$project$Playground$game, $author$project$Extra$Jump$view, $author$project$Extra$Jump$update, $author$project$Extra$Jump$Init);
_Platform_export({'Extra':{'Jump':{'init':$author$project$Extra$Jump$main(
	$elm$json$Json$Decode$succeed(0))(0)}}});}(this));
