体验：https://adtkcn.github.io/LuckDraw/

 


## 原生实现转盘抽奖效果
	改为使用transition和transform属性旋转canvas


使用方法：
```
 <canvas class="item" id="wheelCanvas" width="844px" height="844px"></canvas>


 var data = [
            { good: 19, name: "花生", pics: './huasheng.jpg' },
            { good: 39, name: "瓜子", pics: './huasheng.jpg' },
            { good: 30, name: "啤酒", pics: './huasheng.jpg' },
            { good: 40, name: "饮料", pics: './huasheng.jpg' },
            { good: 16, name: "矿泉水", pics: './huasheng.jpg' },
            { good: 19, name: "花生", pics: './huasheng.jpg' }];

var luck = new luckdraw(document.getElementById("wheelCanvas"), data); 


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



luck.bRotate;//查看是否在转动中,布尔值

luck.goods;//查看选中的商品




```