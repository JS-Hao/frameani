import Core from './core';

class Aqueue {
    constructor(opt) {
        this.queue = [new Core(opt)];
    }

    to(opt) {
        this.queue.push(new Core(opt));
        return this;
    }

    play() {
        const queue = this.queue;
        this.queue.map((core, index) => {
            if (queue[index + 1]) {
                const callback = core.onEnd;
                core.onEnd = () => {
                    callback && callback();
                    queue[index + 1].play();
                }
            }
        })
        this.queue.length && this.queue[0].play();
    }

    reset() {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            this.queue[i].reset();
        }
    }

    stop() {
        this.queue.map(core => {
            core.stop();
        })
    }

    end() {
        this.queue.map(core => {
            core.end();
        })
    }
}

window.Aqueue = Aqueue;

Aqueue.path = function (path) {
    const pathSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSVG.setAttributeNS(null, 'd', path);

    return {
        svg: pathSVG,
        type: 'path'
    }
}