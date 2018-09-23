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
      return new Promise((resolve, reject) => {
        const cb = f.onEnd;
        f.onEnd = () => {
          console.log("我在里面呀");
          cb && cb();
          f.onEnd = cb;
          console.log("即将resolve");
          resolve();
        };

        f.play();
      });
    });

    return Promise.all(fnArr);
  }

  // play() {
  //   this._queue.forEach(f => f.play());
  // }

  end() {
    this._queue.forEach(f => f.end());
  }

  reset() {
    this._queue.forEach(f => f.reset());
  }

  stop() {
    this._queue.forEach(f => f.stop());
  }
}
export default Queue;
