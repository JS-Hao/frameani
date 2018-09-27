var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Tween from "./tween";
import frame from "./frame";

var Core = function () {
  function Core(opt) {
    var _this = this;

    _classCallCheck(this, Core);

    this._loop = function () {
      var t = Date.now() - _this.beginTime,
          d = _this.duration,
          func = Tween[_this.timingFunction] || Tween["linear"];

      _this.t = t;

      if (_this.state === "end" || t >= d) {
        _this._end();
      } else if (_this.state === "stop") {
        _this._stop(t);
      } else if (_this.state === "reset") {
        _this._reset();
      } else {
        _this._renderFunction(t, d, func);
        return true;
      }

      return false;
    };

    this._init(opt);
    this.state = "reset";
  }

  _createClass(Core, [{
    key: "_init",
    value: function _init(opt) {
      this.target = opt.target;
      this._initValue(opt.value);
      this.duration = opt.duration || 1000;
      this.timingFunction = opt.timingFunction || "linear";
      this.renderFunction = opt.render || this._defaultFunc;
      this.animationFrameId = undefined;
      this.t = 0;

      /* Events */
      this.onPlay = opt.onPlay;
      this.onEnd = opt.onEnd;
      this.onStop = opt.onStop;
      this.onReset = opt.onReset;
    }
  }, {
    key: "_initValue",
    value: function _initValue(value) {
      this.value = [];
      if (Array.isArray(value)) {
        Array.isArray(value[0]) ? this._initMutipleValue(value) : this._initSimgleValue(value);
      } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.type === "path") {
        this._initPathValue(value);
      }
    }
  }, {
    key: "_initPathValue",
    value: function _initPathValue(value) {
      this.value.push({
        start: 0,
        end: value.svg.getTotalLength(),
        type: "path",
        svg: value.svg
      });
    }
  }, {
    key: "_initSimgleValue",
    value: function _initSimgleValue(value) {
      this.value.push({
        start: parseFloat(value[0]),
        end: parseFloat(value[1]),
        type: "simgle"
      });
    }
  }, {
    key: "_initMutipleValue",
    value: function _initMutipleValue(values) {
      var _this2 = this;

      values.forEach(function (value) {
        _this2.value.push({
          start: parseFloat(value[0]),
          end: parseFloat(value[1]),
          type: "mutiple"
        });
      });
    }
  }, {
    key: "_defaultFunc",
    value: function _defaultFunc() {
      console.warn("no render function!");
    }
  }, {
    key: "_renderEndState",
    value: function _renderEndState() {
      var d = this.duration,
          func = Tween[this.timingFunction] || Tween["linear"];
      this._renderFunction(d, d, func);
    }
  }, {
    key: "_renderInitState",
    value: function _renderInitState() {
      var d = this.duration,
          func = Tween[this.timingFunction] || Tween["linear"];
      this._renderFunction(0, d, func);
    }
  }, {
    key: "_renderStopState",
    value: function _renderStopState(t) {
      var d = this.duration,
          func = Tween[this.timingFunction] || Tween["linear"];
      this._renderFunction(t, d, func);
    }
  }, {
    key: "_renderFunction",
    value: function _renderFunction(t, d, func) {
      var values = this.value.map(function (value) {
        var curValue = func(t, value.start, value.end - value.start, d);
        return value.type === "path" ? value.svg.getPointAtLength(curValue) : curValue;
      });
      this.renderFunction.apply(this, values);
    }
  }, {
    key: "_play",
    value: function _play() {
      this.state = "play";
      this.onPlay && this.onPlay.call(this);

      this.beginTime = Date.now();
      this._runLoop();
    }
  }, {
    key: "_runLoop",
    value: function _runLoop() {
      frame.add(this._loop);
    }
  }, {
    key: "_stopLoop",
    value: function _stopLoop() {
      frame.delete(this._loop);
    }
  }, {
    key: "_end",
    value: function _end() {
      this.state = "end";
      this._renderEndState();
      this.onEnd && this.onEnd.call(this);
    }
  }, {
    key: "_stop",
    value: function _stop(t) {
      this.state = "stop";
      this._renderStopState(t);
      this.onStop && this.onStop.call(this);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.state = "reset";
      this._renderInitState();
      this.onReset && this.onReset.call(this);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.state = state;
    }
  }, {
    key: "play",
    value: function play() {
      this._stopLoop();
      this._play();
    }
  }, {
    key: "end",
    value: function end() {
      this._stopLoop();
      this._end();
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.state === "play") {
        this._stopLoop();
        this._stop(this.t);
      } else {
        this.state = "stop";
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._stopLoop();
      this._reset();
    }
  }]);

  return Core;
}();

export default Core;