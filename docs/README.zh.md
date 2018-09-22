# frameani

Frameani 是一个高度自由的动画帧值计算库，它并不关注动画的具体实现细节，而会根据你提供的速度曲线，帮你自动计算出不同时刻的运动值，而具体如何渲染动画则交给你实现

例如你想实现一个球体的落体运动，选择适合的速度曲线后，它便会帮助你计算出每一帧的球体下落位置

此外，它还为您提供了一系列方法，可以更好地组织和管理动画队列，帮助您制作更复杂的动画，甚至实现多个动画的组合

- [English Readme](https://github.com/JS-Hao/frameani/tree/master/README.md)

## 安装

```
npm i frameani
```

## 快速开始

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

### 参数说明

| name           | necessary | type     | meaning            | default  |
| -------------- | --------- | -------- | ------------------ | -------- |
| duration       | false     | number   | 动画运行时间       | 1000(ms) |
| value          | true      | array    | 运动起始、终点值   | /        |
| render         | true      | function | 渲染函数           | /        |
| timingFunction | false     | string   | 速度曲线           | linear   |
| onPlay         | false     | function | 运动事件的回调函数 | /        |
| onStop         | false     | function | 暂停事件的回调函数 | /        |
| onEnd          | false     | function | 结束事件的回调函数 | /        |
| onReset        | false     | function | 重置事件的回调函数 | /        |

请注意，`value`是一个特殊参数，它定义了动画的起始和终点值，frameani 将计算当前时间进度的运动值，并将其作为渲染函数的参数返回

例如，要使元素在匀速状态下在 3s 内向右平移 300px，当它达到 2 秒时，`render`回调函数中的传参值为 200

- 当`value`是长度为 2 的一元数组时，第一个是起始值，第二个是结束值

  ```javascript
  // 元素向右平移300px
  const frameani = new Frameani({
    value: [0, 300],
    duration: 1000,
    render: function(value) {
      ele.style.transform = `translateX(${value}px)`;
    }
  });
  ```

- 当`value`是二维数组（每项均是长度为 2 的数组）时，frameani 将计算每一项数组的当前时间进度的运动值（二维数组的长度可以无限扩展）

  ```Javascript
  // 元素分别向右、向下平移300px、500px
  const frameani = new Frameani({
    value: [[0, 300], [0, 500]],
    duration: 1000,
    render: function(value1, value2) {
      ele.style.transform = `translate(${ value1 }px, ${ value2 }px)`;
    }
  })
  ```

- 当 value 是由`Frameani.path`构造的路径对象时，frameani 会根据给定路径，获取当前时间进度的点坐标，以实现自定义路径动画。

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

运行动画

#### frameani.stop()

暂停动画

#### frameani.end()

结束动画

#### frameani.reset()

重置动画

#### frameani.to(option)

* **option** 与Frameani实例化的参数格式保持一致
* returns frameani自身

如果要在动画结束时触发下一个动画，可以使用`to`方法。 它支持链式调用。*请注意，当调用`reset`，`stop`和`end`时，通过`to`添加的队列中保存的所有动画也将被重置/暂停/结束*

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
  value: [-100, 300],
  render: function(value) {
    ele2.style.transform = `translateX(${value}px)`;
  }
});

frameani.play();
```

#### Frameani.path(string)

* **string** svg路径字符串
* returns 对象

`Frameani.path`可以帮助你实现更复杂的自定义路径动画。*请注意，在这种情况下`render`函数的传参将被修改：`point`是一个对象，它保存当前点的坐标*

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
