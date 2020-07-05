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
    if (this.animationInstance) {
      // 销毁到上一个动画
      this.animationInstance.destroy()
    }
    this.animationInstance = animation({
      // 一开始的动画进度
      beginProgress: this.data.wrapperWidth / this.data.distance,
      // 动画的最开始点到动画的最结束点所用的时间
      duration: this.data.duration,
      // 循环动画之间的时间间隔
      between: this.data.between,
      // 是否循环动画
      isLoop: true,
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
