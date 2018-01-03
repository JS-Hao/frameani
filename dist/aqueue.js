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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aqueue = function () {
	function Aqueue(opt) {
		_classCallCheck(this, Aqueue);

		this.target = opt.target;
		this.value = {
			start: opt.value[0],
			end: opt.value[1]
		}, this.duration = opt.duration || 1000;
		this.timingFunction = opt.timingFunction || 'linear';
		this.renderFunction = opt.render || this._defaultFunc;
		this.requestAnimationFrame = window.requestAnimationFrame;
	}

	_createClass(Aqueue, [{
		key: '_defaultFunc',
		value: function _defaultFunc() {
			console.warn('no render function!');
		}
	}, {
		key: '_play',
		value: function _play() {
			this.beginTime = Date.now();
			var loop = this._loop.bind(this);
			window.requestAnimationFrame(loop);
		}
	}, {
		key: '_loop',
		value: function _loop() {
			var diff = Date.now() - this.beginTime;
			if (diff >= this.duration) {
				this.renderFunction(this._getTimingFuncValue(this.timingFunction, 1));
			} else {
				this.renderFunction(this._getTimingFuncValue(this.timingFunction, diff / this.duration));
				window.requestAnimationFrame(this._loop.bind(this));
			}
		}
	}, {
		key: '_getTimingFuncValue',
		value: function _getTimingFuncValue(type, t) {
			var diff = this.value.end - this.value.start;
			switch (type) {
				case 'yunsu':
				default:
					return diff * t;
			}
		}
	}, {
		key: 'play',
		value: function play() {
			this._play();
		}
	}]);

	return Aqueue;
}();

window.Aqueue = Aqueue;

/***/ })
/******/ ]);