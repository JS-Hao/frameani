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
    this.reset();
    this._state = "play";

    for (let i = 0; i < this._queueArr.length; i++) {
      if (this._state !== "play") {
        break;
      }
      await this._queueArr[i].play();
    }
  }

  reset() {
    this._state = "reset";
    this._queueArr
      .concat()
      .reverse()
      .forEach(q => q.reset());
  }

  stop() {
    this._state = "stop";
    this._queueArr.forEach(q => q.stop());
  }

  end() {
    this._state = "end";
    this._queueArr.forEach(q => q.end());
  }
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
