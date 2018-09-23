import "babel-polyfill";
import "./polyfill";
import Core from "./core";
import Queue from "./queue";

class Frameani {
  constructor(opt) {
    this._queueArr = [new Queue()];
    this._queueArr[0].add(new Core(opt));
    this._state = "reset";
  }

  to(opt) {
    const queue = new Queue();
    queue.add(new Core(opt));
    this._queueArr.push(queue);
    return this;
  }

  with(opt) {
    this._queueArr[this._queueArr.length - 1].add(new Core(opt));
    return this;
  }

  async play() {
    this._state = "play";
    for (let i = 0; i < this._queueArr.length; i++) {
      console.log(this._state);
      if (this._state !== "play") {
        break;
      }
      await this._queueArr[i].play();
      console.log("卡西莫多");
    }
  }

  // play() {
  //   const queue = this.queue;
  //   this.queue.map((core, index) => {
  //     if (queue[index + 1]) {
  //       const callback = core.onEnd;
  //       core.onEnd = () => {
  //         callback && callback();
  //         queue[index + 1].play();
  //         core.onEnd = callback;
  //       };
  //     }
  //   });
  //   this.queue.length && this.queue[0].play();
  // }
  reset() {
    this._state = "reset";
    this._queueArr
      .concat()
      .reverse()
      .forEach(q => q.reset());
  }

  // reset() {
  //   for (let i = this.queue.length - 1; i >= 0; i--) {
  //     this.queue[i].reset();
  //   }
  // }
  stop() {
    this._state = "stop";
    this._queueArr.forEach(q => q.stop());
  }
  // stop() {
  //   this.queue.map(core => {
  //     core.stop();
  //   });
  // }
  end() {
    this._state = "end";
    this._queueArr.forEach((q, i) => {
      console.log(`开始启动第${i}个end`);
      q.end();
      console.log(`已完成第${i}个end`);
    });
  }
  // end() {
  //   this.queue.map(core => {
  //     core.end();
  //   });
  // }
}

Frameani.path = function(path) {
  const pathSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathSVG.setAttributeNS(null, "d", path);

  return {
    svg: pathSVG,
    type: "path"
  };
};

export default Frameani;
export { Frameani };
