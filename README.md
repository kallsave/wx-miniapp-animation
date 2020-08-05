wx-miniapp-animation
========================================

功能
------------
微信小程序transform动画解决方案


使用
-----------
在微信开发者工具中先构建npm生成miniprogram_npm文件夹
```javascript
import animation from './miniprogram_npm/wx-miniapp-animation/index'

// example
Page({
  createAnimation() {
    this.animationInstance = animation({
      // 一开始的动画进度
      beginProgress: this.data.wrapperWidth / this.data.distance,
      // 动画的最开始点到动画的最结束点所用的时间
      duration: this.data.duration,
      // 是否开启循环动画
      isLoop: true,
      // 开启了循环动画后,循环动画之间的时间间隔
      between: this.data.between,
      // 是否自动执行
      isAuto: true,
      offset: {
        translateX: {
          // 动画的最开始点
          begin: this.data.wrapperWidth,
          // 动画的最结束点
          end: -this.data.distance,
        },
      },
      // 每一帧执行触发
      stepCallback: ({
        transform,
      }) => {
        this.setData({
          transform: transform
        })
      },
      // 动画结束触发
      doneCallback: () => {

      }
    })
  },
})
```
参数说明
-----------
options

|:--:|:----------|:--:|
|参数|描述|取值|
|beginProgress|一开始的动画进度|0-1|
|duration|动画的最开始点到动画的最结束点所用的时间|毫秒|
|isLoop|是否开启循环动画|boolean|
|between|开启了循环动画后,循环动画之间的时间间隔|毫秒|
|isAuto|是否自动执行|boolean|
|offset|是否自动执行|css样式属性|
|stepCallback|每一帧执行触发的回调函数|function|
|doneCallback|每一轮动画结束触发的回调函数|function|

方法说明
-----------
|:--:|:----------|
|方法|描述|
|start|当isAuto为false时,使用实例上的start方法手动开启动画