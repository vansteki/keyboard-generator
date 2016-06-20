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

	__webpack_require__(1);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getUsers = exports.removeUser = exports.addUser = exports.getPer = exports.addPer = undefined;

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _server = __webpack_require__(3);

	var _server2 = _interopRequireDefault(_server);

	var _server3 = __webpack_require__(7);

	var _server4 = _interopRequireDefault(_server3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_server2.default.listen(8000);

	var per = 0;
	var users = [];

	setInterval(function () {
	  per = per - 1 < 0 ? 0 : per - 1;
	}, 100); // minus 1 every 0.1s

	var addPer = exports.addPer = function addPer(amt) {
	  if (per + amt > 100) {
	    per = 100;
	    _server4.default.emit('congraz');
	  } else per += amt;
	};

	var getPer = exports.getPer = function getPer() {
	  return per;
	};

	var addUser = exports.addUser = function addUser(id) {
	  users.push(id);
	};

	var removeUser = exports.removeUser = function removeUser(id) {
	  users = _lodash2.default.pull(users, id);
	};

	var getUsers = exports.getUsers = function getUsers() {
	  return users;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _http = __webpack_require__(5);

	var _http2 = _interopRequireDefault(_http);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../www')));

	var http = _http2.default.createServer(app);

	exports.default = http;
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _server = __webpack_require__(1);

	var _server2 = _interopRequireDefault(_server);

	var _server3 = __webpack_require__(3);

	var _server4 = _interopRequireDefault(_server3);

	var _socket = __webpack_require__(8);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var io = _socket2.default.listen(_server4.default, { log: false });

	io.on('connection', function (socket) {

	  (0, _server.addUser)(socket.id);

	  var sync = setInterval(function () {
	    socket.emit('sync_visitor', { visitor: (0, _server.getUsers)().length });
	    socket.emit('sync_percent', { per: (0, _server.getPer)() });
	  }, 100);

	  socket.on('disconnect', function () {
	    (0, _server.removeUser)(socket.id);
	    clearInterval(sync);
	  });

	  //user generate power
	  socket.on('incr_percent', function (data) {
	    return (0, _server.addPer)(3);
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);