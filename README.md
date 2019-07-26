体验：https://adtkcn.github.io/LuckDraw/

 


## 原生实现转盘抽奖效果
	改为使用transition和transform属性旋转canvas


使用方法：
样式参考index.html,canvas的transition和transform是必须的
```js
 <canvas class="item" id="wheelCanvas" width="844px" height="844px"></canvas>


 var data = [
            { good: 19, name: "花生", pics: './huasheng.jpg' },
            { good: 39, name: "瓜子", pics: './huasheng.jpg' },
            { good: 30, name: "啤酒", pics: './huasheng.jpg' },
            { good: 40, name: "饮料", pics: './huasheng.jpg' },
            { good: 16, name: "矿泉水", pics: './huasheng.jpg' },
            { good: 19, name: "花生", pics: './huasheng.jpg' }];

var luck = new luckdraw(document.getElementById("wheelCanvas"), data); //data中pics是可选的


/**
* 开始转动
* 传入 商品goods，和回调函数
* 回调res返回选中的商品
*/
 luck.start(39, function (err, res) {
	if (err) {
		return console.log("err", err)
	}
	console.log("res", res)
})


/**
* 重新设置商品数据
* 在转动时禁止重新设置
* 
*/
 luck.setData([
		{ goods: 19, name: "花生", pics: './huasheng.jpg' },
		{ goods: 39, name: "瓜子", pics: './huasheng.jpg' },
		{ goods: 30, name: "啤酒", pics: './huasheng.jpg' },
		{ goods: 40, name: "饮料", pics: './huasheng.jpg' },
		{ goods: 19, name: "花生", pics: './huasheng.jpg' },
		{ goods: 39, name: "瓜子", pics: './huasheng.jpg' },
		{ goods: 30, name: "啤酒", pics: './huasheng.jpg' },
		{ goods: 40, name: "饮料", pics: './huasheng.jpg' },
	],function (err) {
		console.log(err)
	})



luck.goods;//查看选中的商品


/**
* 设置与读取转盘颜色，
* 颜色数量不必与数据数量相同
* 设置后需要调用luck.setData() 重新绘制
*/
luck.colors = [
		"#AE3EFF",
		"#4D3FFF",
		"#FC262C",
		"#3A8BFF",
		"#EE7602",
		"#FE339F"
	];


//其它设置与读取选项，设置后需要调用luck.setData() 重新绘制
luck.outsideRadius = 340; //转盘外圆的半径
luck.textRadius = 320; //转盘奖品位置距离圆心的距离
luck.insideRadius = 10; //转盘内圆的半径
luck.startAngle = 0; //开始角度
luck.bRotate = false;//是否停止:停止;ture:旋转

```