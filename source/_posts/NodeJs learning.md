---
title: NodeJs Summary
tags: [服务端, Javascript, NodeJs]

---
## Event Loop
事件驱动这个概念，或者说模型，在浏览器与NodeJs中都有，但是实现的细节有许多区别。在此主要总结NodeJs的Event Loop。

Node中的EL主要分为以下几个阶段：
1. run timers
把计时到点的timer callback执行，如上一轮塞入的setTimeout, setInterval

2. run pendings
执行被延迟到此循环的回调函数，I/O回调。

3. idle/prepare
处理系统级的任务。

4. io poll
执行与I/O相关的回调。

5. run check
检查一些剩余的任务，setImmediate就在此处运行。

6. close callbacks
执行关闭事件的回调，如socket.on('close', {})

在每个宏任务执行的中间，会检查微任务队列，并执行。

Process.nextTick是一个特殊的任务，程序碰到它时，会停止事件循环，立马执行此任务的回调。

### 执行流程图

![Alt text](http://acemood.github.io/assets/images/20160201/loop_iteration.png)

### Refs
[acemood.github.io](http://acemood.github.io/2016/02/01/event-loop-in-javascript/)
[github.com/yjhjstz](https://github.com/yjhjstz/deep-into-node/blob/master/chapter5/chapter5-1.md)