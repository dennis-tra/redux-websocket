module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ReduxWebSocket.ts":
/*!*******************************!*\
  !*** ./src/ReduxWebSocket.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ReduxWebSocket; });\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/actions.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n/**\n * ReduxWebSocket\n * @class\n *\n * Manages a WebSocket connection.\n */\nvar ReduxWebSocket = // Class options.\n// WebSocket connection.\n// Keep track of how many times we've attempted to reconnect.\n// We'll create an interval to try and reconnect if the socket connection breaks.\n// Keep track of the last URL we connected to, so that when we automatically\n// try to reconnect, we can connect to the correct URL.\n// Keep track of if the WebSocket connection has ever successfully opened.\n\n/**\n * Constructor\n * @constructor\n *\n * @param {ReduxWebSocketOptions} options\n */\nfunction ReduxWebSocket(options) {\n  var _this = this;\n\n  _classCallCheck(this, ReduxWebSocket);\n\n  _defineProperty(this, \"options\", void 0);\n\n  _defineProperty(this, \"websocket\", null);\n\n  _defineProperty(this, \"reconnectCount\", 0);\n\n  _defineProperty(this, \"reconnectionInterval\", null);\n\n  _defineProperty(this, \"lastSocketUrl\", null);\n\n  _defineProperty(this, \"hasOpened\", false);\n\n  _defineProperty(this, \"connect\", function (_ref, _ref2) {\n    var dispatch = _ref.dispatch;\n    var payload = _ref2.payload;\n\n    _this.close();\n\n    var prefix = _this.options.prefix;\n    _this.lastSocketUrl = payload.url;\n    _this.websocket = new WebSocket(payload.url);\n\n    _this.websocket.addEventListener('close', function (event) {\n      return _this.handleClose(dispatch, prefix, event);\n    });\n\n    _this.websocket.addEventListener('error', function () {\n      return _this.handleError(dispatch, prefix);\n    });\n\n    _this.websocket.addEventListener('open', function (event) {\n      _this.handleOpen(dispatch, prefix, _this.options.onOpen, event);\n    });\n\n    _this.websocket.addEventListener('message', function (event) {\n      return _this.handleMessage(dispatch, prefix, event);\n    });\n  });\n\n  _defineProperty(this, \"disconnect\", function () {\n    if (_this.websocket) {\n      _this.close();\n    } else {\n      throw new Error('Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first');\n    }\n  });\n\n  _defineProperty(this, \"send\", function (_store, _ref3) {\n    var payload = _ref3.payload;\n\n    if (_this.websocket) {\n      if (payload instanceof Blob) {\n        _this.websocket.send(payload);\n      } else {\n        _this.websocket.send(JSON.stringify(payload));\n      }\n    } else {\n      throw new Error('Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first');\n    }\n  });\n\n  _defineProperty(this, \"handleClose\", function (dispatch, prefix, event) {\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"closed\"])(event, prefix));\n  });\n\n  _defineProperty(this, \"handleError\", function (dispatch, prefix) {\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"error\"])(null, new Error('`redux-websocket` error'), prefix)); // Only attempt to reconnect if the connection has ever successfully opened.\n    // This prevents ongoing reconnect loops to connections that have not\n    // successfully opened before, such as net::ERR_CONNECTION_REFUSED errors.\n\n    if (_this.hasOpened) {\n      _this.handleBrokenConnection(dispatch);\n    }\n  });\n\n  _defineProperty(this, \"handleOpen\", function (dispatch, prefix, onOpen, event) {\n    // Clean up any outstanding reconnection attempts.\n    if (_this.reconnectionInterval) {\n      clearInterval(_this.reconnectionInterval);\n      _this.reconnectionInterval = null;\n      _this.reconnectCount = 0;\n      dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"reconnected\"])(prefix));\n    } // Hook to allow consumers to get access to the raw socket.\n\n\n    if (onOpen && _this.websocket != null) {\n      onOpen(_this.websocket);\n    } // Now we're fully open and ready to send messages.\n\n\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"open\"])(event, prefix)); // Track that we've been able to open the connection. We can use this flag\n    // for error handling later, ensuring we don't try to reconnect when a\n    // connection was never able to open in the first place.\n\n    _this.hasOpened = true;\n  });\n\n  _defineProperty(this, \"handleMessage\", function (dispatch, prefix, event) {\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"message\"])(event, prefix));\n  });\n\n  _defineProperty(this, \"close\", function (code, reason) {\n    if (_this.websocket) {\n      _this.websocket.close(code || 1000, reason || 'WebSocket connection closed by redux-websocket.');\n\n      _this.websocket = null;\n      _this.hasOpened = false;\n    }\n  });\n\n  _defineProperty(this, \"handleBrokenConnection\", function (dispatch) {\n    var _this$options = _this.options,\n        prefix = _this$options.prefix,\n        reconnectInterval = _this$options.reconnectInterval;\n    _this.websocket = null; // First, dispatch actions to notify Redux that our connection broke.\n\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"broken\"])(prefix));\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"beginReconnect\"])(prefix));\n    _this.reconnectCount = 1;\n    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"reconnectAttempt\"])(_this.reconnectCount, prefix)); // Attempt to reconnect immediately by calling connect with assertions\n    // that the arguments conform to the types we expect.\n\n    _this.connect({\n      dispatch: dispatch\n    }, {\n      payload: {\n        url: _this.lastSocketUrl\n      }\n    }); // Attempt reconnecting on an interval.\n\n\n    _this.reconnectionInterval = setInterval(function () {\n      _this.reconnectCount += 1;\n      dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"reconnectAttempt\"])(_this.reconnectCount, prefix)); // Call connect again, same way.\n\n      _this.connect({\n        dispatch: dispatch\n      }, {\n        payload: {\n          url: _this.lastSocketUrl\n        }\n      });\n    }, reconnectInterval);\n  });\n\n  this.options = options;\n}\n/**\n * WebSocket connect event handler.\n *\n * @param {MiddlewareAPI} store\n * @param {Action} action\n */\n;\n\n\n\n//# sourceURL=webpack:///./src/ReduxWebSocket.ts?");

/***/ }),

/***/ "./src/actionTypes.ts":
/*!****************************!*\
  !*** ./src/actionTypes.ts ***!
  \****************************/
/*! exports provided: DEFAULT_PREFIX, WEBSOCKET_BEGIN_RECONNECT, WEBSOCKET_RECONNECT_ATTEMPT, WEBSOCKET_RECONNECTED, WEBSOCKET_BROKEN, WEBSOCKET_CLOSED, WEBSOCKET_ERROR, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN, WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_PREFIX\", function() { return DEFAULT_PREFIX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_BEGIN_RECONNECT\", function() { return WEBSOCKET_BEGIN_RECONNECT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_RECONNECT_ATTEMPT\", function() { return WEBSOCKET_RECONNECT_ATTEMPT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_RECONNECTED\", function() { return WEBSOCKET_RECONNECTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_BROKEN\", function() { return WEBSOCKET_BROKEN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_CLOSED\", function() { return WEBSOCKET_CLOSED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_ERROR\", function() { return WEBSOCKET_ERROR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_MESSAGE\", function() { return WEBSOCKET_MESSAGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_OPEN\", function() { return WEBSOCKET_OPEN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_CONNECT\", function() { return WEBSOCKET_CONNECT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_DISCONNECT\", function() { return WEBSOCKET_DISCONNECT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_SEND\", function() { return WEBSOCKET_SEND; });\nvar DEFAULT_PREFIX = 'REDUX_WEBSOCKET'; // Library dispatched action types.\n\nvar WEBSOCKET_BEGIN_RECONNECT = 'BEGIN_RECONNECT';\nvar WEBSOCKET_RECONNECT_ATTEMPT = 'RECONNECT_ATTEMPT';\nvar WEBSOCKET_RECONNECTED = 'RECONNECTED';\nvar WEBSOCKET_BROKEN = 'BROKEN';\nvar WEBSOCKET_CLOSED = 'CLOSED';\nvar WEBSOCKET_ERROR = 'ERROR';\nvar WEBSOCKET_MESSAGE = 'MESSAGE';\nvar WEBSOCKET_OPEN = 'OPEN'; // User dispatched action types.\n\nvar WEBSOCKET_CONNECT = 'CONNECT';\nvar WEBSOCKET_DISCONNECT = 'DISCONNECT';\nvar WEBSOCKET_SEND = 'SEND';\n\n//# sourceURL=webpack:///./src/actionTypes.ts?");

/***/ }),

/***/ "./src/actions.ts":
/*!************************!*\
  !*** ./src/actions.ts ***!
  \************************/
/*! exports provided: connect, disconnect, send, beginReconnect, reconnectAttempt, reconnected, open, broken, closed, message, error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"connect\", function() { return connect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"disconnect\", function() { return disconnect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"send\", function() { return send; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"beginReconnect\", function() { return beginReconnect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reconnectAttempt\", function() { return reconnectAttempt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reconnected\", function() { return reconnected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"open\", function() { return open; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"broken\", function() { return broken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closed\", function() { return closed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"message\", function() { return message; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"error\", function() { return error; });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.ts\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n/**\n * Create an FSA compliant action.\n *\n * @param {string} actionType\n * @param {T} payload\n *\n * @returns {BuiltAction<T>}\n */\nfunction buildAction(actionType, payload, meta) {\n  var base = _objectSpread({\n    type: actionType,\n    meta: _objectSpread({\n      timestamp: new Date()\n    }, meta)\n  }, payload instanceof Error ? {\n    error: true\n  } : null);\n\n  return payload ? _objectSpread({}, base, {\n    payload: payload\n  }) : base;\n} // Action creators for user dispatched actions. These actions are all optionally\n// prefixed.\n\n\nvar connect = function connect(url, prefix) {\n  return buildAction(\"\".concat(prefix || _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_PREFIX\"], \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_CONNECT\"]), {\n    url: url\n  });\n};\nvar disconnect = function disconnect(prefix) {\n  return buildAction(\"\".concat(prefix || _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_PREFIX\"], \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_DISCONNECT\"]));\n};\nvar send = function send(msg, prefix) {\n  return buildAction(\"\".concat(prefix || _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_PREFIX\"], \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_SEND\"]), msg);\n}; // Action creators for actions dispatched by redux-websocket. All of these must\n// take a prefix. The default prefix should be used unless a user has created\n// this middleware with the prefix option set.\n\nvar beginReconnect = function beginReconnect(prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_BEGIN_RECONNECT\"]));\n};\nvar reconnectAttempt = function reconnectAttempt(count, prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_RECONNECT_ATTEMPT\"]), {\n    count: count\n  });\n};\nvar reconnected = function reconnected(prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_RECONNECTED\"]));\n};\nvar open = function open(event, prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_OPEN\"]), event);\n};\nvar broken = function broken(prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_BROKEN\"]));\n};\nvar closed = function closed(event, prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_CLOSED\"]), event);\n};\nvar message = function message(event, prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_MESSAGE\"]), {\n    event: event,\n    message: event.data,\n    origin: event.origin\n  });\n};\nvar error = function error(originalAction, err, prefix) {\n  return buildAction(\"\".concat(prefix, \"::\").concat(_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"WEBSOCKET_ERROR\"]), err, {\n    message: err.message,\n    name: err.name,\n    originalAction: originalAction\n  });\n};\n\n//# sourceURL=webpack:///./src/actions.ts?");

/***/ }),

/***/ "./src/createMiddleware.ts":
/*!*********************************!*\
  !*** ./src/createMiddleware.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/actions.ts\");\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.ts\");\n/* harmony import */ var _ReduxWebSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReduxWebSocket */ \"./src/ReduxWebSocket.ts\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n/**\n * Default middleware creator options.\n * @private\n */\n\nvar defaultOptions = {\n  reconnectInterval: 2000,\n  prefix: _actionTypes__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_PREFIX\"]\n};\n/**\n * Create a middleware.\n *\n * @param {Options} rawOptions\n *\n * @returns {Middleware}\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (rawOptions) {\n  var _handlers;\n\n  var options = _objectSpread({}, defaultOptions, rawOptions);\n\n  var prefix = options.prefix;\n  var actionPrefixExp = RegExp(\"^\".concat(prefix, \"::\")); // Create a new redux websocket instance.\n\n  var reduxWebsocket = new _ReduxWebSocket__WEBPACK_IMPORTED_MODULE_2__[\"default\"](options); // Define the list of handlers, now that we have an instance of ReduxWebSocket.\n\n  var handlers = (_handlers = {}, _defineProperty(_handlers, _actionTypes__WEBPACK_IMPORTED_MODULE_1__[\"WEBSOCKET_CONNECT\"], reduxWebsocket.connect), _defineProperty(_handlers, _actionTypes__WEBPACK_IMPORTED_MODULE_1__[\"WEBSOCKET_DISCONNECT\"], reduxWebsocket.disconnect), _defineProperty(_handlers, _actionTypes__WEBPACK_IMPORTED_MODULE_1__[\"WEBSOCKET_SEND\"], reduxWebsocket.send), _handlers); // Middleware function.\n\n  return function (store) {\n    return function (next) {\n      return function (action) {\n        var dispatch = store.dispatch;\n        var actionType = action.type; // Check if action type matches prefix\n\n        if (actionType && actionType.match(actionPrefixExp)) {\n          var baseActionType = action.type.replace(actionPrefixExp, '');\n          var handler = Reflect.get(handlers, baseActionType);\n\n          if (handler) {\n            try {\n              handler(store, action);\n            } catch (err) {\n              dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_0__[\"error\"])(action, err, prefix));\n            }\n          }\n        }\n\n        return next(action);\n      };\n    };\n  };\n});\n\n//# sourceURL=webpack:///./src/createMiddleware.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: connect, default, disconnect, send, DEFAULT_PREFIX, WEBSOCKET_BEGIN_RECONNECT, WEBSOCKET_RECONNECT_ATTEMPT, WEBSOCKET_RECONNECTED, WEBSOCKET_BROKEN, WEBSOCKET_CLOSED, WEBSOCKET_ERROR, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN, WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/actions.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"connect\", function() { return _actions__WEBPACK_IMPORTED_MODULE_0__[\"connect\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"disconnect\", function() { return _actions__WEBPACK_IMPORTED_MODULE_0__[\"disconnect\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"send\", function() { return _actions__WEBPACK_IMPORTED_MODULE_0__[\"send\"]; });\n\n/* harmony import */ var _createMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createMiddleware */ \"./src/createMiddleware.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _createMiddleware__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_PREFIX\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"DEFAULT_PREFIX\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_BEGIN_RECONNECT\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_BEGIN_RECONNECT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_RECONNECT_ATTEMPT\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_RECONNECT_ATTEMPT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_RECONNECTED\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_RECONNECTED\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_BROKEN\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_BROKEN\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_CLOSED\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_CLOSED\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_ERROR\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_ERROR\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_MESSAGE\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_MESSAGE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_OPEN\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_OPEN\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_CONNECT\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_CONNECT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_DISCONNECT\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_DISCONNECT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WEBSOCKET_SEND\", function() { return _actionTypes__WEBPACK_IMPORTED_MODULE_2__[\"WEBSOCKET_SEND\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });