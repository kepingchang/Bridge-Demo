window.startListenClick = function(){
	var iconWrap = document.getElementsByClassName('icon-wrap')
	for(var i = 0 ; i < iconWrap.length ; i++){
		iconWrap[i].addEventListener('click', function(e){
			console.log(e.currentTarget.dataset.icon)
		})
	}
}
window.renderOpertion = function(state) {
	switch (state){
		case 'init':
			return '<div class="operation-hint"><span>Waiting for IR signal....</span></div>\
					<div class="icon-wrap" data-icon="cancel">\
						<img src="./image/icon_cancel@3x.png" alt="cancel">\
						<div>Cancel</div>\
					</div>'
		case 'confirm':
			return '<div class="operation-hint"><span>Please send IR signal again.</span></div>\
				<div class="icon-wrap" data-icon="cancel">\
					<img src="./image/icon_cancel@3x.png" alt="cancel">\
					<div>Cancel</div>\
				</div>'
		case 'error':
			return '<div class="operation-hint"><span>Different signal, try again in 3s.</span></div>\
					<div class="icon-wrap"  data-icon="cancel">\
						<img src="./image/icon_cancel@3x.png" alt="cancel">\
						<div>Cancel</div>\
					</div>'
		case 'complete':
			return '<div class="operation-hint"><span>Decoding complete!</span></div>\
					<div class="complete">\
						<div class="icon-wrap" data-icon="emit">\
							<img src="./image/icon_emit@3x.png" alt="emit">\
							<div>Emit it</div>\
						</div>\
						<div class="icon-wrap" data-icon="delete">\
							<img src="./image/icon_delete@3x.png" alt="delete">\
							<div>Discard</div>\
						</div>\
					</div>'
		case 'home':
		default:
			return '<div class="operation-hint"><span>Here is the visualized IR signal.\nPress the following button to decode.</span></div>\
					<div class="home">\
						<div class="icon-wrap" data-icon="decode">\
							<img src="./image/icon_decode@3x.png" alt="decode">\
							<div>Decode</div>\
						</div>\
					</div>'
	}
}