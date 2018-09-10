import Tween from "./tween";

export default class Core {
    constructor(opt) {
        this._init(opt);
        this.state = "init";
    }

    _init(opt) {
        this.target = opt.target;
        this._initValue(opt.value);
        this.duration = opt.duration || 1000;
        this.timingFunction = opt.timingFunction || "linear";
        this.renderFunction = opt.render || this._defaultFunc;

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

    _loop() {
        const t = Date.now() - this.beginTime,
            d = this.duration,
            func = Tween[this.timingFunction] || Tween["linear"];

        if (this.state === "end" || t >= d) {
            this._end();
        } else if (this.state === "stop") {
            this._stop(t);
        } else if (this.state === "init") {
            this._reset();
        } else {
            this._renderFunction(t, d, func);
            window.requestAnimationFrame(this._loop.bind(this));
        }
    }

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
        const loop = this._loop.bind(this);
        window.requestAnimationFrame(loop);
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
        this.state = "init";
        this._renderInitState();
        this.onReset && this.onReset.call(this);
    }

    play() {
        this._play();
    }

    end() {
        this.state === "play" ? (this.state = "end") : this._end();
    }

    stop() {
        if (this.state === "play") {
            this.state = "stop";
        } else {
            this.state = "stop";
            this.onStop && this.onStop();
        }
    }

    reset() {
        this.state === "play" ? (this.state = "init") : this._reset();
    }
}
