var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Frame = function () {
  function Frame() {
    var _this = this;

    _classCallCheck(this, Frame);

    this._loop = function () {
      _this._filter();

      if (_this.funcQueue.length > 0) {
        _this.frameId = window.requestAnimationFrame(_this._loop);
      } else {
        _this.isRun = false;
      }
    };

    this.frameId = undefined;
    this.funcQueue = [];
    this.isRun = false;
  }

  _createClass(Frame, [{
    key: "_run",
    value: function _run() {
      this._loop();
    }
  }, {
    key: "_filter",
    value: function _filter() {
      var newQueue = [];
      for (var i = 0; i < this.funcQueue.length; i++) {
        var f = this.funcQueue[i];
        var flag = f();
        flag && newQueue.push(f);
      }
      this.funcQueue = newQueue;
    }
  }, {
    key: "add",
    value: function add(f) {
      this.funcQueue.push(f);
      if (!this.isRun) {
        this._run();
        this.isRun = true;
      }
    }
  }, {
    key: "delete",
    value: function _delete(f) {
      this.funcQueue = this.funcQueue.filter(function (i) {
        return i !== f;
      });
      if (this.funcQueue.length === 0) {
        window.cancelAnimationFrame(this.frameId);
        this.isRun = false;
      }
    }
  }]);

  return Frame;
}();

export default new Frame();