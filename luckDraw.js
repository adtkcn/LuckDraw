function luckdraw(canvas, data) {
	this.canvas = canvas;
	this.data = data || [];//[  { goods: 19, name: "花生", pics: './huasheng.jpg' }]
	this.goods = {};
	this.colors = [
		"#AE3EFF",
		"#4D3FFF",
		"#FC262C",
		"#3A8BFF",
		"#EE7602",
		"#FE339F"
	]; //转盘奖品区块对应背景颜色

	this.outsideRadius = 340; //转盘外圆的半径
	this.textRadius = 320; //转盘奖品位置距离圆心的距离
	this.insideRadius = 10; //转盘内圆的半径
	this.startAngle = 0; //开始角度
	this.bRotate = false;//false:停止;ture:旋转


	this.luckNum = 1;//第几次旋转
	this.callback = function (err, res) { };//结束或错误回调
	this.back = function (err, res) {
		this.bRotate = false;
		this.callback(err, res)
	}

	this.canvas.addEventListener('transitionend', function () {
		this.back(null, this.goods)
	}.bind(this), false)


	this.drawWheelCanvas = function () {
		// var canvas = document.getElementById("wheelCanvas");
		var baseAngle = Math.PI * 2 / (this.data.length);
		var ctx = canvas.getContext("2d");
		var canvasW = this.canvas.width; // 画板的高度
		var canvasH = this.canvas.height; // 画板的宽度
		// console.log(canvasW);
		ctx.fillStyle = "#fff000";
		ctx.clearRect(0, 0, canvasW, canvasH);//去掉背景默认的黑色
		console.log(canvasW);
		ctx.strokeStyle = "#199301"; //线的颜色
		ctx.font = '26px Microsoft YaHei';
		//ctx.closePath();
		//使用了beginPath(),canvas会知道是重新画一条，如果给这几条设置不同的属性也是可以的。
		for (var index = 0; index < this.data.length; index++) {
			var angle = this.startAngle + index * baseAngle;
			if (this.colors.length > index) {
				ctx.fillStyle = this.colors[index];
			} else {
				ctx.fillStyle = this.colors[index % this.colors.length];
			}


			ctx.beginPath();
			ctx.arc(canvasW * 0.5, canvasH * 0.5, this.outsideRadius, angle, angle + baseAngle, false);
			ctx.arc(canvasW * 0.5, canvasH * 0.5, this.insideRadius, angle + baseAngle, angle, true);
			ctx.stroke();
			ctx.fill();
			ctx.save();
			ctx.fillStyle = "#FFFF00";
			var rewardName = this.data[index].name;

			var line_height = 24;
			var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textRadius;
			var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textRadius;
			ctx.translate(translateX, translateY);
			ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
			ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 100);

			//添加对应图标
			if (this.data[index].imgUrl) {
				ctx.drawImage(this.data[index].imgUrl, -35, 0, 60, 60);
			}

			ctx.restore(); //很关键
		}
	};
	this.loadImg = function () {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i].pics) {

				var imgUrl = new Image();
				imgUrl.src = this.data[i].pics;
				imgUrl.onload = function (i, imgUrl) {
					this.data[i].imgUrl = imgUrl
					this.drawWheelCanvas();
				}.bind(this, i, imgUrl)

			}
		}
		this.drawWheelCanvas();
	};


	this.setData = function (data, callback) {
		if (this.bRotate) {
			if (callback) {
				callback('转动中,禁止设置数据');
			}
			return
		};
		if (data) {
			this.data = data;
		}
		this.loadImg();
	}
	this.setData();

	this.start = function (id, callback) {

		if (this.bRotate) {
			return callback('转动中');
		};

		this.callback = callback;
		if (!id) {
			return this.back('抽中商品信息有误')
		}
		if (this.data.length == 0) {
			return this.back('商品信息错误')
		}
		var index = null;
		this.goods = null;
		this.bRotate = true;//设置转动中

		for (var i = 0; i < this.data.length; i++) {
			var element = this.data[i];
			if (element.goods == id) {
				index = i;
				this.goods = element;
				break;
			}
		}
		if (this.goods) {
			var baseAngle = 360 / this.data.length;//扇形的角度
			var angles = index * baseAngle + 90; //要指向的扇形起始角度； 第一个奖品是从0°水平方向，所以加90度
			var stopAngles = angles + baseAngle / 2;//停留的角度，baseAngle / 2是停留在扇形中间
			var rotate = this.luckNum * 1800 + stopAngles;//旋转停下的位置，luckNum记录第几次，旋转5圈
			console.log(rotate);

			this.canvas.style.msTransform = 'rotate(-' + rotate + 'deg)';
			this.canvas.style.MozTransform = 'rotate(-' + rotate + 'deg)';
			this.canvas.style.OTransform = 'rotate(-' + rotate + 'deg)';
			this.canvas.style.webkitTransform = 'rotate(-' + rotate + 'deg)';
			this.canvas.style.transform = 'rotate(-' + rotate + 'deg)';

			this.luckNum += 1;
		} else {
			this.back('商品信息错误')
		}
	};
}

// export default luckdraw = luckdraw;