function Wave(canvas){
	var width = ~~window.getComputedStyle(canvas).width.replace('px','')
	var height = ~~window.getComputedStyle(canvas).height.replace('px','')
	canvas.width = width
	canvas.height = height

	this.smoothie = new SmoothieChart({
		grid: {
			millisPerLine: 1000, 
			verticalSections: 6
		},
		millisPerPixel: 5,
		minValue: 0,
		maxValue: 0.3,
		maxValueScale: 1.1,
		minValueScale: 1.1,
		scaleSmoothing: 0.5
	})
	this.smoothie.streamTo(canvas, 1000);
	this.line = new TimeSeries();
	this.smoothie.addTimeSeries(this.line, {
		strokeLinearGradient: ["#FFC75E", "#F03DA2"],
		fillLinearGradient: ["#FFC75E", "#F03DA2"]
	})
	// ["#9DECE1", "#646EEB"]
	// ["#FFC75E", "#F03DA2"],
}
Wave.prototype.draw = function(data) {
	this.line.append(new Date().getTime(), data)
}