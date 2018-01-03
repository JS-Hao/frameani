class Aqueue {
	constructor(opt) {
		this.target = opt.target;
		this.value = {
			start: opt.value[0],
			end: opt.value[1],
		},
		this.duration = opt.duration || 1000;
		this.timingFunction = opt.timingFunction || 'linear';
		this.renderFunction = opt.render || this._defaultFunc;
		this.requestAnimationFrame = window.requestAnimationFrame;
	}

	_defaultFunc() {
		console.warn('no render function!')
	}

	_play() {
		this.beginTime = Date.now();
		const loop = this._loop.bind(this);
		window.requestAnimationFrame(loop);
	}

	_loop() {
		const diff = Date.now() - this.beginTime;
		if (diff >= this.duration) {
			this.renderFunction(
				this._getTimingFuncValue(this.timingFunction, 1)
			)
		} else {
			this.renderFunction(
				this._getTimingFuncValue(this.timingFunction, diff / this.duration)
			)
			window.requestAnimationFrame(this._loop.bind(this));
		}
	}

	_getTimingFuncValue(type, t) {
		const diff = this.value.end - this.value.start;
		switch(type) {
			case 'yunsu':
			default:
				return diff * t;
		}
	}

	play() {
		this._play();
	}
}

window.Aqueue = Aqueue;