function Spiro(canvas){

	this.A = 0.6 * Math.random()
	this.B = 0.4 * Math.random()
	this.canvas = canvas
	var width = ~~window.getComputedStyle(canvas).width.replace('px','')
	var height = ~~window.getComputedStyle(canvas).height.replace('px','')
	this.canvas.width = width
	this.canvas.height = height
	this.ctx = canvas.getContext('2d')
	this.ctx.lineWidth = 1
	this.O = { x: width/2, y: height/2 }
	this.width = width
	this.height = height
	this.D = 0.2 * width
	this.deg = 0
	this.interval = Math.PI / 180 * 10
	this.calcSpiroX = function(_deg) {
		return this.O.x + (this.R - this.r) * Math.cos(_deg) + this.D * Math.cos((this.R - this.r)/ this.r * _deg)
	}
	this.calcSpiroY = function(_deg) {
		return this.O.y + (this.R - this.r) * Math.sin(_deg) - this.D * Math.sin((this.R - this.r)/ this.r * _deg)
	}
	this.draw()
}
Spiro.prototype.draw = function(data){
	//设为5种主题
	//0-0.1，0.1-0.2，0.2-0.3，0.3-0.4，0.4 - 1
	var STYLE = [
		[0.009554832824269976, 0.18762649779136312],//大号棒棒糖型
		[0.3615778431830298, 0.22570875606245888], 	//不萌的Star
		[0.39572529032965903, 0.1810532420179468], 	//像个菊花一样
		[0.07158218785761754, 0.2261380588539161], 	//像个屁股一样
		[0.21874016659118992, 0.12400965767975211], //萌萌的星星
		[0.20471841190462275, 0.23742860702237306] 	//萌萌的小云朵
	]  	
	switch(true){
		case 0 < data && data < 0.1:
			this.A = STYLE[0][0]
			this.B = STYLE[0][1]
			break
		case 0.1 < data && data < 0.2:
			this.A = STYLE[1][0]
			this.B = STYLE[1][1]
			break
		case 0.2 < data && data < 0.3:
			this.A = STYLE[2][0]
			this.B = STYLE[2][1]
			break
		case 0.3 < data && data < 0.4:
			this.A = STYLE[3][0]
			this.B = STYLE[3][1]
			break
		case 0.4 < data && data < 1:
			this.A = STYLE[4][0]
			this.B = STYLE[4][1]
			break
		default: 
			this.A = 0.6
			this.B = 0.41
	}
	this.R = this.width * this.A
	this.r = this.width * this.B
	if(data !== 0){
		this.ctx.clearRect(0, 0, this.width, this.height)
		this.animate()
	}
}
Spiro.prototype.animate = function(){
	var self = this
	function draw(){
		var spiroGradient = self.ctx.createLinearGradient(0, 0, 0, self.canvas.height);
		spiroGradient.addColorStop(0.16, '#F43651');
		spiroGradient.addColorStop(0.32, '#B45D95');
		spiroGradient.addColorStop(0.48, '#41E9F8');
		spiroGradient.addColorStop(0.64, '#BBE289');
		spiroGradient.addColorStop(0.80, '#FAB84A');
		spiroGradient.addColorStop(1, '#F66C2E');
		self.ctx.beginPath()
		var x = self.calcSpiroX(self.deg)
		var y = self.calcSpiroY(self.deg)
		self.ctx.moveTo(x, y)
		self.deg += self.interval
		x = self.calcSpiroX(self.deg)
		y = self.calcSpiroY(self.deg)
		self.ctx.lineTo(x, y)
		self.ctx.strokeStyle = spiroGradient
		self.ctx.stroke()
		self.ctx.closePath()
		requestAnimationFrame(draw);
	}
	draw()
}