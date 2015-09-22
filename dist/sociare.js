/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _Symbol = __webpack_require__(6)['default'];

	var _Promise = __webpack_require__(32)['default'];

	var _Object$keys = __webpack_require__(65)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utilsJs = __webpack_require__(71);

	var _utilsJs2 = _interopRequireDefault(_utilsJs);

	var _servicesTwitterJs = __webpack_require__(76);

	var _servicesTwitterJs2 = _interopRequireDefault(_servicesTwitterJs);

	var _servicesFacebookJs = __webpack_require__(88);

	var _servicesFacebookJs2 = _interopRequireDefault(_servicesFacebookJs);

	var _servicesGoogleplusJs = __webpack_require__(89);

	var _servicesGoogleplusJs2 = _interopRequireDefault(_servicesGoogleplusJs);

	var _servicesPinterestJs = __webpack_require__(90);

	var _servicesPinterestJs2 = _interopRequireDefault(_servicesPinterestJs);

	var _servicesLinkedinJs = __webpack_require__(91);

	var _servicesLinkedinJs2 = _interopRequireDefault(_servicesLinkedinJs);

	var $container = _Symbol('container');
	var $config = _Symbol('config');
	var $url = _Symbol('url');
	var $facebook = _Symbol('facebook');
	var $twitter = _Symbol('twitter');
	var $pinterest = _Symbol('pinterest');
	var $linkedin = _Symbol('linkedin');
	var $googleplus = _Symbol('googleplus');

	var defaultConfig = {
	  getCounts: true,
	  countUrl: '',
	  noQueryCount: false,
	  buttonTag: 'a',
	  buttonId: '',
	  buttonClass: 'sociare sociare-{network}',
	  buttonAttrs: {},
	  buttonTemplate: 'Share on {network} - {count}',
	  twitterExtras: {},
	  pinterestExtras: {},
	  linkedinExtras: {},
	  buttons: []
	};

	var Sociare = (function () {
	  function Sociare(container) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Sociare);

	    this[$container] = container;
	    this[$config] = _utilsJs2['default'].extend({}, defaultConfig, window.SociareConfig, config);

	    this[$facebook] = new _servicesFacebookJs2['default'](_utilsJs2['default'].extend({ url: this.url }, this.config));
	    this[$twitter] = new _servicesTwitterJs2['default'](_utilsJs2['default'].extend({ url: this.url }, this.config));
	    this[$pinterest] = new _servicesPinterestJs2['default'](_utilsJs2['default'].extend({ url: this.url }, this.config));
	    this[$linkedin] = new _servicesLinkedinJs2['default'](_utilsJs2['default'].extend({ url: this.url }, this.config));
	    this[$googleplus] = new _servicesGoogleplusJs2['default'](_utilsJs2['default'].extend({ url: this.url }, this.config));

	    return this;
	  }

	  _createClass(Sociare, [{
	    key: '_getCounts',
	    value: function _getCounts() {
	      var blank = this._networks.reduce(function (obj, network) {
	        obj[network] = 0;
	        return obj;
	      }, {});

	      // Auto-set counts to 0 if we're not using them
	      if (!this.config.getCounts) {
	        return _Promise.resolve(blank);
	      }

	      var url = this._countUrl + '?url=' + this._url + '&networks=' + this._networks.join(',');

	      // Indicate if the query string should be included
	      if (this.config.noQueryCount) {
	        url += '&omitQuery=true';
	      }

	      return _utilsJs2['default'].request(url)['catch'](function (err) {
	        console.error('[Sociare Error]', err);
	        return blank;
	      });
	    }
	  }, {
	    key: '_renderButtons',
	    value: function _renderButtons() {
	      var _this = this;

	      this._networks.forEach(function (network) {
	        _this.container.appendChild(_this[network].generateButton());
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      this._renderButtons();

	      return this._getCounts().then(function (counts) {
	        _Object$keys(counts).forEach(function (key) {
	          return _this2[key].count = counts[key];
	        });
	      })['catch'](function (err) {
	        console.error('[Sociare Error]', err);
	      });
	    }
	  }, {
	    key: 'facebook',
	    get: function get() {
	      return this[$facebook];
	    }
	  }, {
	    key: 'twitter',
	    get: function get() {
	      return this[$twitter];
	    }
	  }, {
	    key: 'pinterest',
	    get: function get() {
	      return this[$pinterest];
	    }
	  }, {
	    key: 'linkedin',
	    get: function get() {
	      return this[$linkedin];
	    }
	  }, {
	    key: 'googleplus',
	    get: function get() {
	      return this[$googleplus];
	    }
	  }, {
	    key: 'container',
	    get: function get() {
	      return this[$container];
	    }
	  }, {
	    key: 'config',
	    get: function get() {
	      return this[$config];
	    }
	  }, {
	    key: '_countUrl',
	    get: function get() {
	      if (!this.config.countUrl) {
	        throw new Error('config.count_url is required unless config.getCounts is false.');
	      }

	      return this.config.countUrl;
	    }
	  }, {
	    key: '_url',
	    get: function get() {
	      return this.config.url || window.location.href;
	    }
	  }, {
	    key: '_networks',
	    get: function get() {
	      return this.config.buttons.map(function (obj) {
	        return obj.type || obj;
	      });
	    }
	  }]);

	  return Sociare;
	})();

	exports['default'] = Sociare;
	;

	window.Sociare = Sociare;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(4)
	  , global         = __webpack_require__(9)
	  , has            = __webpack_require__(10)
	  , SUPPORT_DESC   = __webpack_require__(11)
	  , $def           = __webpack_require__(13)
	  , $redef         = __webpack_require__(15)
	  , shared         = __webpack_require__(18)
	  , setTag         = __webpack_require__(19)
	  , uid            = __webpack_require__(21)
	  , wks            = __webpack_require__(20)
	  , keyOf          = __webpack_require__(22)
	  , $names         = __webpack_require__(27)
	  , enumKeys       = __webpack_require__(28)
	  , isObject       = __webpack_require__(29)
	  , anObject       = __webpack_require__(30)
	  , toIObject      = __webpack_require__(23)
	  , createDesc     = __webpack_require__(17)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
	  try {
	    return _create(setDesc({}, HIDDEN, {
	      get: function(){
	        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch(e){
	    return function(it, key, D){
	      var protoDesc = getDesc(ObjectProto, key);
	      if(protoDesc)delete ObjectProto[key];
	      setDesc(it, key, D);
	      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	}() : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(SUPPORT_DESC && !__webpack_require__(31)){
	    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	// MS Edge converts symbol values to JSON as {}
	// WebKit converts symbol values in objects to JSON as null
	if(!useNative || __webpack_require__(12)(function(){
	  return JSON.stringify([{a: $Symbol()}, [$Symbol()]]) != '[{},[null]]';
	}))$redef($Symbol.prototype, 'toJSON', function toJSON(){
	  if(useNative && isObject(this))return this;
	});

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = wks(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag(global.JSON, 'JSON', true);

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(14)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(11) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(10)
	  , hide = __webpack_require__(16)
	  , TAG  = __webpack_require__(20)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(18)('wks')
	  , Symbol = __webpack_require__(9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(21))('Symbol.' + name));
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(4)
	  , toIObject = __webpack_require__(23);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(25);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toString  = {}.toString
	  , toIObject = __webpack_require__(23)
	  , getNames  = __webpack_require__(4).getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(4);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(41);
	__webpack_require__(45);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 34 */
/***/ function(module, exports) {

	

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(36)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(38)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(26);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(31)
	  , $def            = __webpack_require__(13)
	  , $redef          = __webpack_require__(15)
	  , hide            = __webpack_require__(16)
	  , has             = __webpack_require__(10)
	  , SYMBOL_ITERATOR = __webpack_require__(20)('iterator')
	  , Iterators       = __webpack_require__(39)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(40)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(4).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(19)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(4)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(16)(IteratorPrototype, __webpack_require__(20)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(17)(1,next)});
	  __webpack_require__(19)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	var Iterators = __webpack_require__(39);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(43)
	  , step       = __webpack_require__(44)
	  , Iterators  = __webpack_require__(39)
	  , toIObject  = __webpack_require__(23);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(38)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(4)
	  , LIBRARY    = __webpack_require__(31)
	  , global     = __webpack_require__(9)
	  , ctx        = __webpack_require__(46)
	  , classof    = __webpack_require__(48)
	  , $def       = __webpack_require__(13)
	  , isObject   = __webpack_require__(29)
	  , anObject   = __webpack_require__(30)
	  , aFunction  = __webpack_require__(47)
	  , strictNew  = __webpack_require__(49)
	  , forOf      = __webpack_require__(50)
	  , setProto   = __webpack_require__(55).set
	  , same       = __webpack_require__(56)
	  , species    = __webpack_require__(57)
	  , SPECIES    = __webpack_require__(20)('species')
	  , RECORD     = __webpack_require__(21)('record')
	  , asap       = __webpack_require__(58)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(11)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      if(isUnhandled(record.p)){
	        if(isNode){
	          process.emit('unhandledRejection', value, record.p);
	        } else if(global.console && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(63)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = anObject(anObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = aFunction(res);
	        react.rej = aFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(19)(P, PROMISE);
	species(P);
	species(Wrapper = __webpack_require__(14)[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(64)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(47);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(25)
	  , TAG = __webpack_require__(20)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(46)
	  , call        = __webpack_require__(51)
	  , isArrayIter = __webpack_require__(52)
	  , anObject    = __webpack_require__(30)
	  , toLength    = __webpack_require__(53)
	  , getIterFn   = __webpack_require__(54);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(30);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(39)
	  , ITERATOR  = __webpack_require__(20)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(48)
	  , ITERATOR  = __webpack_require__(20)('iterator')
	  , Iterators = __webpack_require__(39);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(4).getDesc
	  , isObject = __webpack_require__(29)
	  , anObject = __webpack_require__(30);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(46)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(4)
	  , SPECIES = __webpack_require__(20)('species');
	module.exports = function(C){
	  if(__webpack_require__(11) && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , macrotask = __webpack_require__(59).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , isNode    = __webpack_require__(25)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    if(domain)domain.enter();
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	}

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(46)
	  , invoke             = __webpack_require__(60)
	  , html               = __webpack_require__(61)
	  , cel                = __webpack_require__(62)
	  , global             = __webpack_require__(9)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(25)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScript){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(15);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(20)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	module.exports = __webpack_require__(14).Object.keys;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(68);

	__webpack_require__(69)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(13)
	    , fn   = (__webpack_require__(14).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(12)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Promise = __webpack_require__(32)['default'];

	var _Object$assign = __webpack_require__(72)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  /**
	   * Sends XHR "get" request & returns a promise
	   *
	   * @param  {String} url   Url to request
	   * @return {Promise}
	   */
	  request: function request(url) {
	    return new _Promise(function (resolve, reject) {
	      var req = new XMLHttpRequest();

	      req.open('GET', url, true);

	      req.onload = function () {
	        if (req.status >= 200 && req.status < 400) {
	          return resolve(JSON.parse(req.responseText));
	        } else {
	          return reject(JSON.parse(req.responseText));
	        }
	      };

	      req.onerror = function () {
	        return reject('Unable to connect to ' + url + ': ' + req.responseText);
	      };

	      req.send();
	    });
	  },

	  /**
	   * Extends n objects from right to left
	   *
	   * @param  {Object} out Destination object
	   * @return {Object}     Extended destination object
	   */
	  extend: function extend() {
	    var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }

	    rest.unshift(out);
	    return _Object$assign.apply(this, rest);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	module.exports = __webpack_require__(14).Object.assign;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(13);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(75)});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(68)
	  , IObject  = __webpack_require__(24)
	  , enumKeys = __webpack_require__(28);

	module.exports = __webpack_require__(12)(function(){
	  return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
	}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(77)['default'];

	var _inherits = __webpack_require__(81)['default'];

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _abstract = __webpack_require__(87);

	var _abstract2 = _interopRequireDefault(_abstract);

	// https://dev.twitter.com/web/tweet-button/web-intent

	var Twitter = (function (_AbstractService) {
	  _inherits(Twitter, _AbstractService);

	  function Twitter() {
	    _classCallCheck(this, Twitter);

	    _get(Object.getPrototypeOf(Twitter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Twitter, [{
	    key: 'name',
	    get: function get() {
	      return 'twitter';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      var url = 'https://twitter.com/intent/tweet?url=' + this.encodedUrl;

	      if (this.options.extras.text) {
	        url += '&text=' + encodeURIComponent(this.options.extras.text);
	      }
	      if (this.options.extras.via) {
	        url += '&via=' + this.options.extras.via;
	      }
	      if (this.options.extras.hashtags) {
	        url += '&hashtags=' + this.options.extras.hashtags;
	      }

	      return url;
	    }
	  }]);

	  return Twitter;
	})(_abstract2['default']);

	exports['default'] = Twitter;
	;
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(78)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	__webpack_require__(80);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(23);

	__webpack_require__(69)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(82)["default"];

	var _Object$setPrototypeOf = __webpack_require__(84)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(13);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(55).set});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _Symbol = __webpack_require__(6)['default'];

	var _Object$keys = __webpack_require__(65)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utilsJs = __webpack_require__(71);

	var _utilsJs2 = _interopRequireDefault(_utilsJs);

	var $options = _Symbol('options');
	var $count = _Symbol('count');
	var $rendered = _Symbol('rendered');

	var AbstractService = (function () {
	  _createClass(AbstractService, [{
	    key: 'options',
	    get: function get() {
	      return this[$options];
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return '';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      return '';
	    }
	  }, {
	    key: 'encodedUrl',
	    get: function get() {
	      return encodeURIComponent(this.options.url);
	    }
	  }, {
	    key: 'rendered',
	    get: function get() {
	      return this[$rendered];
	    }
	  }]);

	  function AbstractService(config) {
	    var _this = this;

	    _classCallCheck(this, AbstractService);

	    var defaultConfig = {
	      url: config.url || '',
	      tag: config.buttonTag,
	      id: config.buttonId,
	      'class': config.buttonClass,
	      attrs: config.buttonAttrs,
	      template: config.buttonTemplate,
	      extras: config[this.name + 'Extras'] || {}
	    };

	    // Grab any config object given for the button type
	    var givenConfig = config.buttons.reduce(function (config, obj) {
	      return obj.type === _this.name ? obj : config;
	    }, {});

	    // Store mixed config, preferring supplied config over default
	    this[$options] = _utilsJs2['default'].extend(defaultConfig, givenConfig);

	    // Store count
	    this.count = 0;

	    this[$rendered] = false;
	  }

	  _createClass(AbstractService, [{
	    key: 'generateButton',
	    value: function generateButton() {
	      var _this2 = this;

	      var options = this.parsed_options;

	      this.elem = document.createElement(options.tag);

	      // Apply id
	      this.elem.id = options.id;

	      // Apply classes
	      this.elem.className = options['class'];

	      // Apply attributes
	      _Object$keys(options.attrs).forEach(function (key) {
	        return _this2.elem.setAttribute(key, options.attrs[key]);
	      });

	      // Apply template
	      this.elem.innerHTML = options.template;

	      // Bind click event
	      this.elem.onclick = function () {
	        // Open the share popup
	        var popup_options = 'status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no,width=600,height=600';
	        window.open(_this2.popupUrl, _this2.name, popup_options);

	        // Add 1 to the count
	        _this2.count = _this2[$count] + 1;

	        // Prevent bubbling
	        return false;
	      };

	      // Mark it as rendered
	      this[$rendered] = true;

	      return this.elem;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      // Re-apply template
	      this.elem.innerHTML = this.parsed_options.template;
	    }
	  }, {
	    key: 'count',
	    get: function get() {
	      var count = this[$count];

	      if (count >= 1000000) {
	        return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
	      } else if (count >= 1000) {
	        return (count / 1000).toFixed(1).replace('.0', '') + 'k';
	      } else {
	        return count;
	      }
	    },
	    set: function set(count) {
	      this[$count] = count;
	      if (this.rendered) {
	        this.update();
	      }
	    }
	  }, {
	    key: 'parsed_options',
	    get: function get() {
	      var count = this.count,
	          name = this.name;

	      function replace_tokens(input) {
	        return input.replace(/\{count\}/g, count).replace(/\{network\}/g, name);
	      }

	      function replace_all_tokens(node) {
	        switch (Object.prototype.toString.call(node)) {
	          case '[object Array]':
	            return node.map(function (item) {
	              return replace_all_tokens(item);
	            });
	          case '[object Object]':
	            return _Object$keys(node).reduce(function (res, key) {
	              res[replace_tokens(key)] = replace_all_tokens(node[key]);
	              return res;
	            }, {});
	          case '[object String]':
	            return replace_tokens(node);
	          default:
	            return node;
	        }
	      }

	      return replace_all_tokens(_utilsJs2['default'].extend({}, this.options));
	    }
	  }]);

	  return AbstractService;
	})();

	exports['default'] = AbstractService;
	;
	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(77)['default'];

	var _inherits = __webpack_require__(81)['default'];

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _abstract = __webpack_require__(87);

	var _abstract2 = _interopRequireDefault(_abstract);

	var Facebook = (function (_AbstractService) {
	  _inherits(Facebook, _AbstractService);

	  function Facebook() {
	    _classCallCheck(this, Facebook);

	    _get(Object.getPrototypeOf(Facebook.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Facebook, [{
	    key: 'name',
	    get: function get() {
	      return 'facebook';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      return 'http://www.facebook.com/sharer.php?u=' + this.encodedUrl;
	    }
	  }]);

	  return Facebook;
	})(_abstract2['default']);

	exports['default'] = Facebook;
	;
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(77)['default'];

	var _inherits = __webpack_require__(81)['default'];

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _abstract = __webpack_require__(87);

	var _abstract2 = _interopRequireDefault(_abstract);

	// https://developers.google.com/+/web/share/#sharelink

	var GooglePlus = (function (_AbstractService) {
	  _inherits(GooglePlus, _AbstractService);

	  function GooglePlus() {
	    _classCallCheck(this, GooglePlus);

	    _get(Object.getPrototypeOf(GooglePlus.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(GooglePlus, [{
	    key: 'name',
	    get: function get() {
	      return 'googleplus';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      return 'https://plus.google.com/share?url=' + this.encodedUrl;
	    }
	  }]);

	  return GooglePlus;
	})(_abstract2['default']);

	exports['default'] = GooglePlus;
	;
	module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(77)['default'];

	var _inherits = __webpack_require__(81)['default'];

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _abstract = __webpack_require__(87);

	var _abstract2 = _interopRequireDefault(_abstract);

	var Pinterest = (function (_AbstractService) {
	  _inherits(Pinterest, _AbstractService);

	  function Pinterest() {
	    _classCallCheck(this, Pinterest);

	    _get(Object.getPrototypeOf(Pinterest.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Pinterest, [{
	    key: 'name',
	    get: function get() {
	      return 'pinterest';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      var url = 'http://pinterest.com/pin/create/button/?url=' + this.encodedUrl;

	      if (this.options.extras.media) {
	        url += '&media=' + encodeURIComponent(this.options.extras.media);
	      }
	      if (this.options.extras.description) {
	        url += '&description=' + encodeURIComponent(this.options.extras.description);
	      }

	      return url;
	    }
	  }]);

	  return Pinterest;
	})(_abstract2['default']);

	exports['default'] = Pinterest;
	;
	module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(77)['default'];

	var _inherits = __webpack_require__(81)['default'];

	var _createClass = __webpack_require__(1)['default'];

	var _classCallCheck = __webpack_require__(5)['default'];

	var _interopRequireDefault = __webpack_require__(70)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _abstract = __webpack_require__(87);

	var _abstract2 = _interopRequireDefault(_abstract);

	// https://developer.linkedin.com/docs/share-on-linkedin

	var LinkedIn = (function (_AbstractService) {
	  _inherits(LinkedIn, _AbstractService);

	  function LinkedIn() {
	    _classCallCheck(this, LinkedIn);

	    _get(Object.getPrototypeOf(LinkedIn.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(LinkedIn, [{
	    key: 'name',
	    get: function get() {
	      return 'linkedin';
	    }
	  }, {
	    key: 'popupUrl',
	    get: function get() {
	      var url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.encodedUrl;

	      if (this.options.extras.title) {
	        url += '&title=' + encodeURIComponent(this.options.extras.title);
	      }
	      if (this.options.extras.summary) {
	        url += '&summary=' + encodeURIComponent(this.options.extras.summary);
	      }
	      if (this.options.extras.source) {
	        url += '&source=' + this.options.extras.source;
	      }

	      return url;
	    }
	  }]);

	  return LinkedIn;
	})(_abstract2['default']);

	exports['default'] = LinkedIn;
	;
	module.exports = exports['default'];

/***/ }
/******/ ]);