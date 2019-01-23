[TOC]

# 深入浅出node.js

### 第一章 Node简介

#### 1.node给javascript带来的意义：

javascipt只限制在chrome浏览器中运行，它的能力取决于浏览器中间层提供的支持。

![image-20190123181015047](/Users/finup/Library/Application Support/typora-user-images/image-20190123181015047.png)



node 的结构与chrome十分相似。它们都是基于事件驱动的异步架构，浏览器是通过事件驱动来服务界面上的交互，Node是通过事件驱动来服务I/O。在node中，javascript 可以随心所欲的访问本地文件，可以搭建websocket服务器端，可以连接数据库，可以进行多线程。

##### node打破了JavaScript只能在浏览器中运行的局面，前后端编程环境统一，可以降低前后端转化所需要的上下文交换代价。

#### 2.node的特点：

#####(1) 异步I/O：

一个我们常见的ajax请求：

```javascript
$.post('/url', {title: '深入浅出node.js'}, function(data) {
    console.log('收到响应')
})；
console.log('发送ajax结束')；
```

​	图一：经典的异步io

![image-20190123191124505](/Users/finup/Library/Application Support/typora-user-images/image-20190123191124505.png)

​	node中的异步io也很常见， 以读取文件为例，与ajax的调用方式非常类似：

```javascript
var fs = require('fs');

fs.readFile('/path', function(err, file) {
    console.log('读取文件完成')
})；

console.log('发起读取文件')；
```



![image-20190123191904800](/Users/finup/Library/Application Support/typora-user-images/image-20190123191904800.png)

在node中，大部分的操作都是异步的方式进行的。并且可以进行并行I/O操作。每个调用之间不用等待之前的I/O调用结束。 

 两个同时进行的异步任务的耗时，取决于最慢的那个任务的耗时：

```
fs.readFile('path1',function(err, file) {
    console.log(’读取文件1完成‘)；
})
fs.readFile('path2', function(err, file) {
    console.log('读取文件2完成')；
})
```

而同步I/O进行的两个任务，它们的耗时是两个任务的耗时之和。

##### (2) node是单线程： 

node保持了javascript在浏览器中单线程的特点，在node中javascript与其余线程是无法共享任何状态的。关于单线程：

​	-- 优点:  不用处处在意状态的同步问题， 不存在死锁的问题，也没有线程上下文交换带来的性能开销。

​	-- 缺点：无法利用多核CPU；错误会引起整个应用的退出，应用的健壮性值得考量；大量的计算占用CPU导致无法继续调用异步I/O。

 为了解决单线程会阻塞主线程事件的进行，采用了与webWorkers相同的思路： child_process。即创建多个子进程。

#### 3.node的应用场景：

##### （1）I/O密集型：

 I/O密集的主要优势在于Node利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用极少。

##### （2）是否不擅长CPU密集型：

 实际上，V8的执行效率是非常高的。

CPU密集型应用给Node带来的挑战主要是：由于JavaScript单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起。但是适当调整和分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起，这样既可同时享受到并行异步I/O的好处，又能充分利用CPU。

###### Node 可以被使用，只是需要合理的调度。将大型占用CPU计算的任务，进行拆解成小的任务。使占用CPU的计算不影响后续I/O调用的发起。

#### 4.node的使用者：

##### （1）前后端语言环境统一：

##### （2）node带来的高性能I/O用于实时应用：

##### （3）并行I/O使得使用者可以更高效地利用分布式环境：

##### （4）并行I/O，有效利用稳定接口提升Web渲染能力：

##### （5）云计算平台提供Node支持：

##### （6）游戏开发领域：

##### （7）工具类应用：

##### 