class Frame {
  constructor() {
    this.frameId = undefined;
    this.funcQueue = [];
    this.isRun = false;
  }

  _run() {
    this._loop();
  }

  _filter() {
    const newQueue = [];
    for (let i = 0; i < this.funcQueue.length; i++) {
      const f = this.funcQueue[i];
      const flag = f();
      flag && newQueue.push(f);
    }
    this.funcQueue = newQueue;
  }

  _loop = () => {
    this._filter();

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
    if (this.funcQueue.length === 0) {
      window.cancelAnimationFrame(this.frameId);
      this.isRun = false;
    }
  }
}

export default new Frame();
