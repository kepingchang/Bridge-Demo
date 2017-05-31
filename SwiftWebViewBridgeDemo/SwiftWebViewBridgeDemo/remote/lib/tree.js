function Tree(canvas){
	this.canvas = canvas
	this.ctx    = canvas.getContext('2d')
	var width   = ~~window.getComputedStyle(canvas).width.replace('px','')
	var height  = ~~window.getComputedStyle(canvas).height.replace('px','')
	this.canvas.width = width
	this.canvas.height = height
	this.ctx.clearRect(0, 0, width, height)
	this.O = { x: width/2, y: height/2 }
	this.r = 0.45 * width
	this.colorPool = [
		{s: "rgba(173, 0, 162, 0.98)", e: "rgba(218, 53, 255, 0.8)"},
		{s: "rgba(55, 219, 255, 0.6)", e: "rgba(78, 236, 255, 1)"},
		{s: "rgba(255, 0, 0, 0.67)", e: "rgba(255, 9, 9, 0.64)"},
		{s: "rgba(109, 226, 249, 1)", e: "rgba(100, 249, 255, 0.7)"},
		{s: "rgba(53, 245, 255, 0.68)", e: "rgba(16, 226, 246, 1)"},
		{s: "rgba(53, 255, 200, 0.90)", e: "rgba(255, 145, 252, 1)"},
		{s: "rgba(32, 130, 137, 1)", e: "rgba(255, 52, 169, 0.4)"},
		{s: "rgba(53, 255, 146, 0.94)", e: "rgba(3, 215, 255, 0.7)"},
		{s: "rgba(255, 210, 210, 1)", e: "rgba(224, 255, 53, 1)"},
		{s: "rgba(205, 249, 63, 1)", e: "rgba(224, 255, 53, 0.45)"},
		{s: "rgba(255, 156, 33, 1)", e: "rgba(255, 156, 33, 1)"},
		{s: "rgba(205, 249, 63, 0.3)", e: "rgba(83, 53, 255, 0.5)"},
		{s: "rgba(255, 144, 248, 1)", e: "rgba(209, 132, 1, 0.4)"},
		{s: "rgba(119, 141, 0, 0.90)", e: "rgba(100, 63, 249, 1)"}
	]
	this.draw()
}
Tree.prototype.draw = function (data){
	if(data === 0) return;
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	for (var i = 0; i < 100 ; i++){
		var startAngle = Math.random() * 20 + 260   //每次循环生成不同的开始点和结束点
		var endAngle   = Math.random() * 270 + -45
		var startP = {
			x: Math.cos(Math.round(startAngle * Math.PI / 180 * 100) / 100 ) * this.r + this.O.x,
			y: -Math.sin(Math.round(startAngle * Math.PI / 180 * 100) / 100 ) * this.r + this.O.y
		}
		var endP = {
			x:  Math.cos(Math.round(endAngle * Math.PI / 180 * 100) / 100 ) * this.r + this.O.x + Math.round(Math.random()*5), 
			y: -Math.sin(Math.round(endAngle * Math.PI / 180 * 100) / 100 ) * this.r + this.O.y+ Math.round(Math.random()*40)
		}
		this.ctx.beginPath()
		this.ctx.moveTo(startP.x, startP.y)
		this.ctx.quadraticCurveTo(this.O.x, this.O.y, endP.x, endP.y)
		var color = this.colorPool[Math.floor( Math.random() * this.colorPool.length)]
		var gradient = this.ctx.createLinearGradient(startP.x, startP.y, endP.x, endP.y)

		var _r = Math.round( 5 * Math.random() + 5)
		var _y = endP.y - (this.O.y - endP.y)/this.r * _r
		var _x = endP.x - (this.O.x - endP.x)/this.r * _r

		gradient.addColorStop(0, color.s)
		gradient.addColorStop(1, color.e)
		this.ctx.shadowBlur = Math.round(Math.random()) === 0? 0 : 10
		this.ctx.shadowColor = color.e

		this.ctx.lineWidth = Math.random() * 2 + 0.4;
		this.ctx.strokeStyle = gradient
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.arc(_x, _y, _r , 0, Math.PI * 2)
		this.ctx.globalAlpha = +(Math.random() * 0.6 ).toFixed(1)
		this.ctx.save()
		this.ctx.stroke()
	}
}






