function Hexagon(canvas) {
	this.MIN = 0.1
	var self = this
	this.canvas = canvas
	var width = ~~window.getComputedStyle(canvas).width.replace('px','')
	var height = ~~window.getComputedStyle(canvas).height.replace('px','')
	this.canvas.width = width
	this.canvas.height = height
	this.ctx = canvas.getContext('2d')
	this.zero = {
		x: width/2,
		y: height/2 + height * 0.01
	}
	this.R = this.canvas.width * 0.9/1.862
	this.data = [
		Math.round(this.R * this.MIN ),
		Math.round(this.R * this.MIN ),
		Math.round(this.R * this.MIN ),
		Math.round(this.R * this.MIN ),
		Math.round(this.R * this.MIN ),
		Math.round(this.R * this.MIN )
	]
	this.prevData = [0, 0, 0, 0, 0, 0]
	this.img = new Image()
	this.img.src = '../image/hexagon.png'
	this.img.onload = function() {
		self.w = this.naturalWidth
		self.h = this.naturalHeight
		self.draw()
	}	
}
Hexagon.prototype.draw = function(data){
	if(data > this.MIN) {
		this.data.unshift( Math.round( this.R * data ) )
		this.data.pop()
	}
	this.animate()
}
Hexagon.prototype.animate = function(){
	var self = this
	var T = 0
	var D = 20
	var cos30 = Math.cos( Math.PI / 6 )
	var cos60 = Math.cos( Math.PI / 3 )

	function animate(){
		self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
		self.ctx.drawImage(
			self.img, 
			0, 0,
			self.w, self.h, 
			self.canvas.width * 0.05, 0, 
			self.canvas.width * 0.9, self.canvas.width * 0.9 / self.w * self.h
		)
		var location = []
		location.push({
			x: self.zero.x, 
			y: self.zero.y - Tween.Quart.easeOut(T, self.prevData[0], self.data[0] - self.prevData[0], D)
		})
		location.push({
			x: Tween.Quart.easeOut(T, cos30 * self.prevData[1], cos30 * self.data[1] - cos30 * self.prevData[1], D) + self.zero.x,
			y: self.zero.y - Tween.Quart.easeOut(T, cos60 * self.prevData[1], cos60 * self.data[1] - cos60 * self.prevData[1], D)
		})
		location.push({
			x: Tween.Quart.easeOut(T, cos30 * self.prevData[2], cos30 * self.data[2] - cos30 * self.prevData[2], D) + self.zero.x,
			y: self.zero.y + Tween.Quart.easeOut(T, cos60 * self.prevData[2], cos60 * self.data[2] - cos60 * self.prevData[2], D)
		})
		location.push({
			x: self.zero.x, 
			y: self.zero.y + Tween.Quart.easeOut(T, self.prevData[3], self.data[3] - self.prevData[3], D)
		})
		location.push({
			x: self.zero.x - Tween.Quart.easeOut(T,  cos30 * self.prevData[4], cos30 * self.data[4] - cos30 * self.prevData[4], D), 
			y: self.zero.y + Tween.Quart.easeOut(T, cos60 * self.prevData[4], cos60 * self.data[4] - cos60 * self.prevData[4], D)
		})
		location.push({
			x: self.zero.x - Tween.Quart.easeOut(T, cos30 * self.prevData[5], cos30 * self.data[5] - cos30 * self.prevData[5], D), 
			y: self.zero.y - Tween.Quart.easeOut(T, cos60 * self.prevData[5], cos60 * self.data[5] - cos60 * self.prevData[5], D)
		})
		self.ctx.beginPath()
		self.ctx.moveTo(location[0].x, location[0].y)
		self.ctx.lineTo(location[1].x, location[1].y)
		self.ctx.lineTo(location[2].x, location[2].y)
		self.ctx.lineTo(location[3].x, location[3].y)
		self.ctx.lineTo(location[4].x, location[4].y)
		self.ctx.lineTo(location[5].x, location[5].y)
		self.ctx.closePath()
		self.ctx.fillStyle = "rgba( 0, 179, 217, 0.2)"
		self.ctx.strokeStyle = "rgba( 23, 209, 247, 0.8)"
		self.ctx.fill()
		self.ctx.stroke()
		T++
		if(T < D){
			requestAnimationFrame(animate);
		}else{
			self.prevData = JSON.parse(JSON.stringify(self.data)) 
		}
	}
	animate()
}















