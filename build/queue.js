var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Core from "./core";

var Queue = function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this._queue = [];
  }

  _createClass(Queue, [{
    key: "add",
    value: function add(frameani) {
      if (frameani instanceof Core) {
        this._queue.push(frameani);
      }
    }
  }, {
    key: "delete",
    value: function _delete(frameani) {
      this._queue = this._queue.filter(function (f) {
        return f !== frameani;
      });
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      this._queue = [];
    }
  }, {
    key: "play",
    value: function play() {
      var fnArr = this._queue.map(function (f) {
        return new Promise(function (resolve) {
          var cb = f.onEnd;
          f.onEnd = function () {
            cb && cb();
            f.onEnd = cb;
            resolve();
          };

          f.play();
        });
      });

      return Promise.all(fnArr);
    }
  }, {
    key: "end",
    value: function end() {
      this._queue.forEach(function (f) {
        f.getState() !== "end" && f.end();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._queue.forEach(function (f) {
        f.getState() !== "reset" && f.reset();
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this._queue.forEach(function (f) {
        f.getState() !== "stop" && f.stop();
      });
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      this._queue.forEach(fn);
    }
  }]);

  return Queue;
}();

export default Queue;