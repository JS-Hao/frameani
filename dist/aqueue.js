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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aqueue = function () {
	function Aqueue(opt) {
		_classCallCheck(this, Aqueue);

		this.queue = [new _core2.default(opt)];
	}

	_createClass(Aqueue, [{
		key: 'to',
		value: function to(opt) {
			this.queue.push(new _core2.default(opt));
			return this;
		}
	}, {
		key: 'play',
		value: function play() {
			var queue = this.queue;
			this.queue.map(function (core, index) {
				if (queue[index + 1]) {
					var callback = core.onEnd;
					core.onEnd = function () {
						callback && callback();
						queue[index + 1].play();
					};
				}
			});
			this.queue.length && this.queue[0].play();
		}
	}, {
		key: 'reset',
		value: function reset() {
			for (var i = this.queue.length - 1; i >= 0; i--) {
				this.queue[i].reset();
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.queue.map(function (core) {
				core.stop();
			});
		}
	}, {
		key: 'end',
		value: function end() {
			this.queue.map(function (core) {
				core.end();
			});
		}
	}]);

	return Aqueue;
}();

window.Aqueue = Aqueue;

Aqueue.path = function (path) {
	var pathSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathSVG.setAttributeNS(null, 'd', path);

	return {
		svg: pathSVG,
		type: 'path'
	};
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _easing = __webpack_require__(2);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
	function Core(opt) {
		_classCallCheck(this, Core);

		this._init(opt);
		this.state = 'init';
		this.requestAnimationFrame = window.requestAnimationFrame;
	}

	_createClass(Core, [{
		key: '_init',
		value: function _init(opt) {
			this.target = opt.target;
			this._initValue(opt.value);
			// this.value = {
			// 	start: opt.value[0],
			// 	end: opt.value[1],
			// };
			this.duration = opt.duration || 1000;
			this.timingFunction = opt.timingFunction || 'linear';
			this.renderFunction = opt.render || this._defaultFunc;

			/* Events */
			this.onPlay = opt.onPlay;
			this.onEnd = opt.onEnd;
			this.onStop = opt.onStop;
			this.onReset = opt.onReset;
		}
	}, {
		key: '_initValue',
		value: function _initValue(value) {
			if (Array.isArray(value)) {
				this.value = {
					start: value[0],
					end: value[1]
				};
				this.svg = null;
			} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.type === 'path') {
				this.value = {
					start: 0,
					end: value.svg.getTotalLength()
				};
				this.svg = value.svg;
			}
		}
	}, {
		key: '_defaultFunc',
		value: function _defaultFunc() {
			console.warn('no render function!');
		}
	}, {
		key: '_renderEndState',
		value: function _renderEndState() {
			var b = this.value.start,
			    c = this.value.end - b,
			    d = this.duration,
			    func = _easing2.default[this.timingFunction] || _easing2.default['linear'];
			this._renderFunction(func(d, b, c, d));
		}
	}, {
		key: '_renderInitState',
		value: function _renderInitState() {
			var b = this.value.start,
			    c = this.value.end - b,
			    d = this.duration,
			    func = _easing2.default[this.timingFunction] || _easing2.default['linear'];
			this._renderFunction(func(0, b, c, d));
		}
	}, {
		key: '_loop',
		value: function _loop() {
			var t = Date.now() - this.beginTime,
			    b = this.value.start,
			    c = this.value.end - b,
			    d = this.duration,
			    func = _easing2.default[this.timingFunction] || _easing2.default['linear'];

			if (this.state === 'end' || t >= d) {
				this._end();
			} else if (this.state === 'stop') {
				this._renderFunction(func(t, b, c, d));
			} else if (this.state === 'init') {
				this._renderInitState();
			} else if (t >= d) {
				this._end();
			} else {
				this._renderFunction(func(t, b, c, d));
				window.requestAnimationFrame(this._loop.bind(this));
			}
		}
	}, {
		key: '_renderFunction',
		value: function _renderFunction(curValue) {
			if (this.svg) {
				var point = this.svg.getPointAtLength(curValue);
				this.renderFunction(point, curValue);
			} else {
				this.renderFunction(curValue);
			}
		}
	}, {
		key: '_play',
		value: function _play() {
			this.state = 'play';
			this.onPlay && this.onPlay.call(this);

			this.beginTime = Date.now();
			var loop = this._loop.bind(this);
			window.requestAnimationFrame(loop);
		}
	}, {
		key: '_end',
		value: function _end() {
			this.state = 'end';
			this._renderEndState();
			this.onEnd && this.onEnd.call(this);
		}
	}, {
		key: '_stop',
		value: function _stop() {
			this.state = 'stop';
			this.onStop && this.onStop.call(this);
		}
	}, {
		key: '_reset',
		value: function _reset() {
			this.state = 'init';
			this.onReset && this.onReset.call(this);
		}
	}, {
		key: 'play',
		value: function play() {
			this._play();
		}
	}, {
		key: 'end',
		value: function end() {
			this._end();
			this._renderEndState();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this._stop();
		}
	}, {
		key: 'reset',
		value: function reset() {
			this._reset();
			this._renderInitState();
		}
	}]);

	return Core;
}();

exports.default = Core;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* The following timing function is basing on the Cubic Bezier  */

var easing = {
	easeIn: function easeIn(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},

	easeOut: function easeOut(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},

	easeInOut: function easeInOut(t, b, c, d) {
		return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
	},

	linear: function linear(t, b, c, d) {
		return c * t / d + b;
	}
};

exports.default = easing;

/***/ })
/******/ ]);