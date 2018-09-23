import Core from "./core";
class Queue {
  constructor() {
    this._queue = [];
  }

  add(frameani) {
    if (frameani instanceof Core) {
      this._queue.push(frameani);
    }
  }

  delete(frameani) {
    this._queue = this._queue.filter(f => f !== frameani);
  }

  deleteAll() {
    this._queue = [];
  }

  play() {
    const fnArr = this._queue.map(f => {
      return new Promise(resolve => {
        const cb = f.onEnd;
        f.onEnd = () => {
          cb && cb();
          f.onEnd = cb;
          resolve();
        };

        f.play();
      });
    });

    return Promise.all(fnArr);
  }

  end() {
    this._queue.forEach(f => {
      f.getState() !== 'end' && f.end();
    });
  }

  reset() {
    this._queue.forEach(f => {
      f.getState() !== 'reset' && f.reset();
    });
  }

  stop() {
    this._queue.forEach(f => {
      f.getState() !== 'stop' && f.stop();
    });
  }

  forEach(fn) {
    this._queue.forEach(fn);
  }
}
export default Queue;
