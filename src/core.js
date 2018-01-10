import easing from './easing';

export default class Core {
	constructor(opt) {
		this._init(opt);
		this.state = 'init';
		this.requestAnimationFrame = window.requestAnimationFrame;
	}

	_init(opt) {
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

	_initValue(value) {
		if (Array.isArray(value)) {
			this.value = {
				start: value[0],
				end: value[1],
			};
			this.svg = null;
		} else if (typeof value === 'object' && value.type === 'path') {
			this.value = {
				start: 0,
				end: value.svg.getTotalLength()
			};
			this.svg = value.svg;
		}
	}

	_defaultFunc() {
		console.warn('no render function!')
	}

	_renderEndState() {
		const b = this.value.start,
					c = this.value.end - b,
					d = this.duration,
					func = easing[this.timingFunction] || easing['linear'];
		this._renderFunction(func(d, b, c, d));
	}

	_renderInitState() {
		const b = this.value.start,
					c = this.value.end - b,
					d = this.duration,
					func = easing[this.timingFunction] || easing['linear'];
		this._renderFunction(func(0, b, c, d));
	}

	_loop() {
		const t = Date.now() - this.beginTime,
					b = this.value.start,
					c = this.value.end - b,
					d = this.duration,
					func = easing[this.timingFunction] || easing['linear'];

		if (this.state === 'end' || t >= d) {
			this._end();
		} else if (this.state === 'stop') {
			this._renderFunction(func(t, b, c, d))
		} else if (this.state === 'init') {
			this._renderInitState();
		} else if (t >= d) {
			this._end();
		} else {
			this._renderFunction(func(t, b, c, d));
			window.requestAnimationFrame(this._loop.bind(this));
		}
	}

	_renderFunction(curValue) {
		if (this.svg) {
			const point = this.svg.getPointAtLength(curValue);
			this.renderFunction(point, curValue);
		} else {
			this.renderFunction(curValue);
		}
	}

	_play() {
		this.state = 'play';
		this.onPlay && this.onPlay.call(this);

		this.beginTime = Date.now();
		const loop = this._loop.bind(this);
		window.requestAnimationFrame(loop);
	}

	_end() {
		this.state = 'end';
		this._renderEndState();
		this.onEnd && this.onEnd.call(this);
	}

	_stop() {
		this.state = 'stop';
		this.onStop && this.onStop.call(this);
	}

	_reset() {
		this.state = 'init';
		this.onReset && this.onReset.call(this);
	}

	play() {
		this._play();
	}

	end() {
		this._end();
		this._renderEndState();
	}

	stop() {
		this._stop();
	}

	reset() {
		this._reset();
		this._renderInitState();
	}
}