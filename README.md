# Frameani

Frameani is a highly free JavaScript animation library, it does care about how to create an animation by details, but will automatically calculate the motion value at different moments according to the animation-timing-function you provide, and how to render the animation is given to you to achieve.

For example, if you want to achieve a falling body motion of a sphere, after selecting the appropriate animation-timing-function, it will help you calculate the falling position for each frame

In addition, it provides you with a series of methods to better organize and manage animation queues, to help you create more complex animations, and even to combine multiple animations.

- [中文 Readme](https://github.com/JS-Hao/frameani/tree/master/docs/README.zh.md)

## Installing

```
npm i frameani
```

## Getting Started

```javascript
import Frameani from "frameani";

const ele = document.querySelector("#target");

const frameani = new Frameani({
  value: [0, 500],
  duration: 1000,
  timingFunction: "easeOut",
  render: function(value) {
    ele.style.transform = `translateX(${value}px)`;
  },
  onPlay: () => console.log("begin!"),
  onEnd: () => console.log("end!")
});

frameani.play();
```

### Parameter

| name           | necessary | type     | meaning            | default  |
| -------------- | --------- | -------- | ------------------ | -------- |
| duration       | false     | number   | animation runtime  | 1000(ms) |
| value          | true      | array    | start and end point values  | /        |
| render         | true      | function | render callback function           | /        |
| timingFunction | false     | string   | animation-timing-function | linear   |
| onPlay         | false     | function | callback function of play event | /        |
| onStop         | false     | function | callback function of stop event | /        |
| onEnd          | false     | function | callback function of end event | /        |
| onReset        | false     | function | callback function of reset event | /        |

Note that `value` is a special parameter that defines the start and end values of the animation, and frameani will calculate the motion value of the current time progress and return it as a parameter to the render callback function.

For example, to make an element moving 300px to the right within 3s at a constant speed, when it reaches 2 seconds, the value of the parameter in the `render` callback function is 200.

- When the `value` is an array of two numbers, the first number is the starting value and the next one is the ending value.

  ```javascript
  // Element moves 300px to the right
  const frameani = new Frameani({
    value: [0, 300],
    duration: 1000,
    render: function(value) {
      ele.style.transform = `translateX(${value}px)`;
    }
  });
  ```

- When `value` is a two-dimensional array (each item is an array of two numbers), frameani will calculate the motion value of the current time progress for each array (the length of the two-dimensional array can be expanded infinitely).

  ```Javascript
  // Element moves 300px to the right and 500px to the down at the same time
  const frameani = new Frameani({
    value: [[0, 300], [0, 500]],
    duration: 1000,
    render: function(value1, value2) {
      ele.style.transform = `translate(${ value1 }px, ${ value2 }px)`;
    }
  })
  ```

- When `value` is a object constructed by `Frameani.path`, frameani will get the point coordinates of the current time progress according to the given path to implement the custom path animation.

  ```javascript
  const frameani = new Frameani({
    value: Frameani.path("M0 0L23 34L60 90Q32 46 23 12Q234 565 234 645Z"),
    duration: 1000,
    render: function(point) {
      ele.style.transform = `translate(${point.x}px, ${point.y}px)`;
    }
  });
  ```

## API

#### frameani.play()

play animation

#### frameani.stop()

stop animation

#### frameani.end()

end animation

#### frameani.reset()

reset animation

#### frameani.to(option)

* **option** consistent with the parameter format of the instantiated Frameani
* returns itself

If you want to trigger a new animation at the end of the lastest animation, you can use the `to` method. It supports chained calls. *Note that when the `reset`, `stop` or `end` method is called, all animations saved in the queue added via `to` will also be reset/paused/end*


```javascript
const ele1 = document.getElementById("target1");
const ele2 = document.getElementById("target2");
const frameani = new Frameani({
  value: [0, 500],
  duration: 1000,
  timingFunction: "easeOut",
  render: function(value) {
    ele1.style.transform = `translateX(${value}px)`;
  }
}).to({
  value: [0, 300],
  render: function(value) {
    ele2.style.transform = `translateY(${value}px)`;
  }
});

frameani.play();
```

#### frameani.with(option)

* **option** consistent with the parameter format of the instantiated Frameani
* returns itself

If you want to play another one while playing an animation, you can use the `with` method

```javascript
const ele1 = document.getElementById("target1");
const ele2 = document.getElementById("target2");
const frameani = new Frameani({
  value: [0, 500],
  duration: 1000,
  timingFunction: "easeOut",
  render: function(value) {
    ele1.style.transform = `translateX(${value}px)`;
  }
}).width({
  value: [0, 300],
  render: function(value) {
    ele2.style.transform = `translateY(${value}px)`;
  }
});
```

#### Frameani.path(string)
* **string** svg path string
* returns object

It can help you to achieve more complex custom path animation. *Note that in this case the argument to the `render` function will be modified: `point` is an object that saves the coordinates of the current point.*

```javascript
const frameani = new Frameani({
  value: Frameani.path("M0 0L23 34L60 90Q32 46 23 12Q234 565 234 645Z"),
  render: function(point) {
    ele.style.transform = `translate(${point.x}px,${point.y}px)`;
  },
  timingFunction: "easeOut",
  duration: 7000
});

frameani.play();
```


