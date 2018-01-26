import Tween from './tween';

class Core {
	constructor(opt) {
		this._init(opt);
		this.state = 'init';
	}

	_init(opt) {
    this._initValue(opt.value);
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
  	this.value = [];
  	value.forEach(item => {
  		this.value.push({
  			start: parseFloat(item[0]),
  			end: parseFloat(item[1]),
  		});
  	})
  }

  _loop() {
  	const t = Date.now() - this.beginTime,
          d = this.duration,
          c = this.value.end - this.value.start,
          func = Tween[this.timingFunction] || Tween['linear'];

    if (t >= d) {
    	this.state = 'end';
    	this._renderFunction(d, d, func);
    } else {
    	this._renderFunction(t, d, func);
    	window.requestAnimationFrame(this._loop.bind(this));
    }
  }

  _renderFunction(t, d, func) {
  	const values = this.value.map(value => func(t, value.start, value.end - value.start, d));
  	this.renderFunction.apply(this, values);
  }

  _play() {
  	this.state = 'play';
    this.onPlay && this.onPlay.call(this);
    
  	this.beginTime = Date.now();
  	const loop = this._loop.bind(this);
    window.requestAnimationFrame(loop);
  }

  play() {
  	this._play();
  }
}

window.Timeline = Core;