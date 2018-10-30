var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import "./polyfill";
import Core from "./core";
import Queue from "./queue";

var Frameani = function () {
  function Frameani(opt) {
    _classCallCheck(this, Frameani);

    this._queueArr = [new Queue()];
    this._queueArr[0].add(new Core(opt));
    this._state = "reset";
  }

  _createClass(Frameani, [{
    key: "to",
    value: function to(opt) {
      var queue = new Queue();
      queue.add(new Core(opt));
      this._queueArr.push(queue);
      return this;
    }
  }, {
    key: "with",
    value: function _with(opt) {
      this._queueArr[this._queueArr.length - 1].add(new Core(opt));
      return this;
    }
  }, {
    key: "play",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.reset();
                this._state = "play";

                i = 0;

              case 3:
                if (!(i < this._queueArr.length)) {
                  _context.next = 11;
                  break;
                }

                if (!(this._state !== "play")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("break", 11);

              case 6:
                _context.next = 8;
                return this._queueArr[i].play();

              case 8:
                i++;
                _context.next = 3;
                break;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function play() {
        return _ref.apply(this, arguments);
      }

      return play;
    }()
  }, {
    key: "reset",
    value: function reset() {
      this._state = "reset";
      this._queueArr.concat().reverse().forEach(function (q) {
        return q.reset();
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this._state = "stop";
      this._queueArr.forEach(function (q) {
        return q.stop();
      });
    }
  }, {
    key: "end",
    value: function end() {
      this._state = "end";
      this._queueArr.forEach(function (q) {
        return q.end();
      });
    }
  }]);

  return Frameani;
}();

Frameani.path = function (path) {
  var pathSVG = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathSVG.setAttributeNS(null, "d", path);

  return {
    svg: pathSVG,
    type: "path"
  };
};

export default Frameani;
export { Frameani };