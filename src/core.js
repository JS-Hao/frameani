import Tween from "./tween";
import frame from "./frame";

export default class Core {
  constructor(opt) {
    this._init(opt);
    this.state = "reset";
  }

  _init(opt) {
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

  _initValue(value) {
    this.value = [];
    if (Array.isArray(value)) {
      Array.isArray(value[0])
        ? this._initMutipleValue(value)
        : this._initSimgleValue(value);
    } else if (typeof value === "object" && value.type === "path") {
      this._initPathValue(value);
    }
  }

  _initPathValue(value) {
    this.value.push({
      start: 0,
      end: value.svg.getTotalLength(),
      type: "path",
      svg: value.svg
    });
  }

  _initSimgleValue(value) {
    this.value.push({
      start: parseFloat(value[0]),
      end: parseFloat(value[1]),
      type: "simgle"
    });
  }

  _initMutipleValue(values) {
    values.forEach(value => {
      this.value.push({
        start: parseFloat(value[0]),
        end: parseFloat(value[1]),
        type: "mutiple"
      });
    });
  }

  _defaultFunc() {
    console.warn("no render function!");
  }

  _renderEndState() {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween["linear"];
    this._renderFunction(d, d, func);
  }

  _renderInitState() {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween["linear"];
    this._renderFunction(0, d, func);
  }

  _renderStopState(t) {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween["linear"];
    this._renderFunction(t, d, func);
  }

  _loop = () => {
    const t = Date.now() - this.beginTime,
      d = this.duration,
      func = Tween[this.timingFunction] || Tween["linear"];

    this.t = t;

    if (this.state === "end" || t >= d) {
      this._end();
    } else if (this.state === "stop") {
      this._stop(t);
    } else if (this.state === "reset") {
      this._reset();
    } else {
      this._renderFunction(t, d, func);
      return true;
    }

    return false;
  };

  _renderFunction(t, d, func) {
    const values = this.value.map(value => {
      const curValue = func(t, value.start, value.end - value.start, d);
      return value.type === "path"
        ? value.svg.getPointAtLength(curValue)
        : curValue;
    });
    this.renderFunction.apply(this, values);
  }

  _play() {
    this.state = "play";
    this.onPlay && this.onPlay.call(this);

    this.beginTime = Date.now();
    this._runLoop();
  }

  _runLoop() {
    frame.add(this._loop);
  }

  _stopLoop() {
    frame.delete(this._loop);
  }

  _end() {
    this.state = "end";
    this._renderEndState();
    this.onEnd && this.onEnd.call(this);
  }

  _stop(t) {
    this.state = "stop";
    this._renderStopState(t);
    this.onStop && this.onStop.call(this);
  }

  _reset() {
    this.state = "reset";
    this._renderInitState();
    this.onReset && this.onReset.call(this);
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this._stopLoop();
    this._play();
  }

  end() {
    this._stopLoop();
    this._end();
  }

  stop() {
    if (this.state === "play") {
      this._stopLoop();
      this._stop(this.t);
    } else {
      this.state = "stop";
    }
  }

  reset() {
    this._stopLoop();
    this._reset();
  }
}
