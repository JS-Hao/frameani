class Frame {
  constructor() {
    this.frameId = undefined;
    this.funcQueue = [];
    this.isRun = false;
  }

  _run() {
    this._loop();
  }

  _loop = () => {
    this.funcQueue = this.funcQueue.filter(f => f());
    if (this.funcQueue.length > 0) {
      this.frameId = window.requestAnimationFrame(this._loop);
    } else {
      this.isRun = false;
    }
  };

  add(f) {
    this.funcQueue.push(f);
    if (!this.isRun) {
      this._run();
      this.isRun = true;
    }
  }

  delete(f) {
    this.funcQueue = this.funcQueue.filter(i => i !== f);
  }
}

export default new Frame();
