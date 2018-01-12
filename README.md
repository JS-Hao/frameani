# aqueue.js

aqueue.js是一款自由度很高的动画库，它从具体的动画实现中抽离出来，根据给定的动画速度曲线，替你完成“帧-值”对应的数值计算，而将实际的渲染工作交给开发者自由发挥。此外，它还提供了一系列方法为你更好地组织、管理动画队列，协助你制作更为复杂的动画，甚至是实现多个动画的组合。






## Feature

* 自由度高。它根据给定的动画速度曲线，完成“帧-值”对应的数值计算，而将实际的渲染工作交给开发者自由发挥
* 支持基本的事件监听，如```onPlay```、```onStop```、```onReset ```、```onEnd```，及相应的回调函数
* 支持主动触发动画的各种状态，如```play```、```stop```、```reset```、```end```
* 支持自定义路径动画
* 支持多组动画的合并、链式触发
* 暂时许多功能仍处于待更新状态，对应详情可查看 [react-rekanva](https://github.com/JS-Hao/react-rekanva)







## 快速开始

```javascript
const ele = document.querySelector('#target');
const aq = new Aqueue({
  value: [0, 500], 
  duration: 1000,
  timingFunction: 'easeOut', 
  render: function(value) {
    ele.style.transform = `translateX(${ value }px)`;
  }, 
  onPlay: () => console.log('begin!'),
  onEnd: () =>  console.log('end! haha...')
});

aq.play();
```

参数设定如下：

* ```target```  可选 / 对象 / 动画目标
* ```duration```  可选 / 数值 / 总时长，默认值为1000ms
* ```timingFunction```  可选 / 数值 / 缓动函数，默认为linear
* ```render```  必选 / 函数 / 渲染函数，参数为当前时间进度对应的运动值
* 各类事件 可选 / 函数 / 回调函数


注意，```value```是一个特殊的参数，它定义了动画的起始与终止两种状态，而aqueue会根据用户所提供的速度函数，计算出当前时间进度所对用的运动中间状态，以```render```参数的形式返回。

例如，创建一个总时长为**3s**、往右平移**300px**的**匀速**位移动画，当时间经历到2s时，返回的值是200

* 当value是一个长度为2的一元数组时，第一项代表起始值，第二项代表终止值

  ```javascript
  // 元素向右平移300px
  const aq = new Aqueue({
    value: [0, 300],
    duration: 1000,
    render: function(value) {
      ele.style.transform = `translateX(${ value }px)`;
    }
  })
  ```

* 当value是一个二元数组时（每一项均为一个长度为2的数组），aqueue会分别计算出每一个项所对应的当前时间进度运动中间状态（二元数组的长度无要求，可无限拓展）

  ```Javascript
  // 元素分别向右、向下平移300px、500px
  const aq = new Aqueue({
    value: [[0, 300], [0, 500]],
    duration: 1000,
    render: function(value1, value2) {
      ele.style.transform = `translate(${ value1 }px, ${ value2 }px)`;
    }
  })
  ```

* 当value是由```Aqueue.path```所构建的路径对象时，aqueue会计算当前时间进度对应路径上的某一点，实现自定义路径动画

  ```javascript
  const aq = new Aqueue({
    value: Aqueue.path('M0 0L23 34L60 90Q32 46 23 12Q234 565 234 645Z'),
    duration: 1000,
    render: function(value1, value2) {
      ele.style.transform = `translate(${ value1 }px, ${ value2 }px)`;
    }
  })
  ```





## 链式执行

倘若你想在某个动画执行完毕时触发下一个动画，可使用```to```方法（```to```方法可多次链式调用）

```javascript
const aq = new Aqueue({
  target: document.getElementById('target1'), 
  value: [0, 500], 
  duration: 1000, 
  timingFunction: 'easeOut',
  render: function(value) {
    this.target.style.transform = `translateX(${ value }px)`;
  }, 
}).to({
  target: document.getElementById('target2'),
  value: [-100, 300],
  render: function(value) {
    this.target.style.transform = `translateX(${ value }px)`;
  },
});

aq.play();
```






## **自定义路径动画**

```Aqueue.path```方法可帮助你实现更为复杂的路径动画

```javascript
const aq = new Aqueue({
  target: document.getElementById('target'),
  value: Aqueue.path('M0 0L23 34L60 90Q32 46 23 12Q234 565 234 645Z'),
  render: function(point, value) {
    this.target.style.transform = `translate(${ point.x }px,${ point.y }px)`
  },
  timingFunction: 'easeOut',
  duration: 7000,
})

aq.play();
```

注意，此时```render```函数的传参发生了变化：```point```记录着当前时间进度对应的点坐标，```value```则是当前时间进度对应的路径长度。




## 事件

Aqueue支持```onPlay```, ```onReset```, ```onStop```以及```onEnd```事件，你只需要将这些事件函数传入动画配置即可：

```javascript
const aq = new Aqueue({
  target: document.getElementById('target'), 
  value: [0, 500], 
  duration: 1000,
  timingFunction: 'easeOut', 
  render: function(value) {
    this.target.style.transform = `translateX(${ value }px)`;
  }, 
  onPlay: () => console.log('begin!'),
  onEnd: () =>  console.log('end! haha...'),
  onReset: () => console.log('reset!'),
  onStop: () => console.log('hoooo...it stop'),
});
```

除此之外，react-rekanva还允许你手动触发以下事件：

- ```play```          动画开始执行；
- ```reset```          重置动画（通过```to```, ```combine```方法添加的所有动画队列也将全部重置）;
- ```stop```          暂停动画（通过```to```, ```combine```方法添加的所有动画队列也将全部停止）;
- ```end```           结束所有的动画（通过```to```, ```combine```方法添加的所有动画队列也将全部结束）;            

注意，```reset```、```stop```和```end```发生时，通过```to```, ```combine```方法添加的、保存在队列```queue```中的所有动画也将全部重置 / 暂停 / 结束。         