var Audio = document.getElementById('Audio');
var timer = null;
var mousefirst, mousemove, mouseend, mouseleft, len;

function main(){
	clearInterval(timer);
	timer = setInterval(function(){
		len = parseInt(Audio.currentTime) / parseInt(Audio.duration) * $('#progress').width();
		$('#progress i').width(len);
		$('#progress i b').css('left', len);
		$('#hh').html(parseInt(Audio.currentTime) + 's / ' + parseInt(Audio.duration)+'s');
		if (Audio.currentTime >= Audio.duration) {   //播放完毕后，回到起点
			$('#progress i b').css('left', 0);
			$('#progress i').width(0);
			$('#hh').html('0s / ' + parseInt(Audio.duration)+'s');
		}
	}, 200);
};


//点击播放/暂停
function PS_Audio(){
	if(Audio.paused) {
		main();
	    Audio.play();
	}else{
	    clearInterval(timer);
	    Audio.pause();
	}
}
function Play_Audio(){
	if(!Audio.paused) return;
	main();
	Audio.play();
}
function Stop_Audio(){
	if(Audio.paused) return;
    clearInterval(timer);
	Audio.pause();
}
function End_Audio(){
    clearInterval(timer);
	Audio.pause();
	Audio.currentTime = 0;
	$('#progress i b').css('left', 0);
	$('#progress i').width(0);
	$('#hh').html('0s / ' + parseInt(Audio.duration)+'s');
}




// 进度条
function startPos(ev){
	var ev = ev || window.event;
	mousefirst = ev.originalEvent.targetTouches[0].pageX;
	mouseleft = parseInt($('#progress i').width());
}
function movePos(ev){
	if (mouseleft == 0) return null;   //没开始播放，禁止拖动进度条
	clearInterval(timer);
	var ev = ev || window.event;
	mousemove = ev.originalEvent.targetTouches[0].pageX;

	// 判断输入当前播放进度
	len = mousemove - mousefirst + mouseleft;
	if (len <= 0) len = 0;
	if (len >= parseInt(Audio.duration)) len = parseInt(Audio.duration);

	// 赋值并 展示进度条
	$('#progress i b').css('left', len);
	$('#progress i').width(len);
	$('#hh').html(parseInt(len / $('#progress').width() * parseInt(Audio.duration)) + 's / ' + parseInt(Audio.duration)+'s');
}
function endPos(){
	if (mouseleft == 0) return null;   //没开始播放，禁止拖动进度条
	Audio.currentTime = parseInt(len / $('#progress').width() * parseInt(Audio.duration));
	main();
}

$('#progress i b').on('touchstart', startPos);
$('#progress i b').on('touchmove', movePos);
$('#progress i b').on('touchend', endPos);

