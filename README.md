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
const aq = new Aqueue({
  target: document.getElementById('target'), 
  value: [0, 500], 
  duration: 1000,
  timingFunction: 'easeOut', 
  render: function(value) {
    this.target.style.transform = `translateX(${ value }px)`;
  }, 
  onPlay: () => console.log('begin!'),
  onEnd: () =>  console.log('end! haha...')
});

aq.play();
```

参数设定如下：

* ```target```  可选 / 对象 / 动画目标
* ```value```  必选 / 数组 / 动画的起始、终点值
* ```duration```  可选 / 数值 / 总时长，默认值为1000ms
* ```timingFunction```  可选 / 数值 / 缓动函数，默认为linear
* ```render```  必选 / 函数 / 渲染函数，参数为当前时间进度对应的运动值
* 各类事件 可选 / 函数 / 回调函数



## 方法

### To

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



### Combine

多个动画可通过```combine```方法合并，多组动画将同时播放

待更新...



### timeline

aqueue提供了一个与css animation很类似的写法: ```timeline```，通过```timeline```我们可以定义目标在不同的进度触发不同的动画

待更新...



### udpate

```update```方法可更新你的动画属性

待更新...



### **add & delete**

aqueue之所以能够执行一系列的动画（如上述通过```combine```，```to```方法所串联的动画），是因为aqueue内部存在着动画队列```queue```（实际上可以理解成一个按顺序存放着所有动画实例的数组，每个动画实例依次播放），为了更灵活的管理这个队列，可以通过```add```和```delete```方法增添或删除指定的动画

待更新...



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