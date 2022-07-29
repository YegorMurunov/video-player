import { formatSeconds, isMobile } from './modules/additionalsFunctions.js';

window.addEventListener('DOMContentLoaded', () => {
	console.log('Привет! Я Егор - автор этого плеера. Если ты хочешь себе сайт, могу предложить свои услуги, посмотри мои работы на сайте портфолио(https://yegormurunov.gq). И если тебе понравится, обязательно напиши мне! 😉');
	
	// dom
	const dom = {
		preview: document.querySelector('.video-preview'),
		video: document.getElementById('video-player'),
		videoContainer: document.querySelector('.video-container'),
		videoName: 'video.mp4',
		videoControls: document.querySelector('.video-controls'),
		videoBtns: document.querySelector('.video-btns'),
		play: {
			btn: document.getElementById('video-play'),
			icon: document.getElementById('video-play').querySelector('i'),
		},
		restart: document.getElementById('video-reset'),
		mute: {
			btn: document.getElementById('video-mute'),
			icon: document.getElementById('video-mute').querySelector('i'),
		},
		fullscreen: document.getElementById('video-fullscreen'),
		progressContainer: document.getElementById('video-progress-container'),
		progressBar: document.getElementById('video-progress'),
		time: {
			currentTime: document.getElementById('video-currentTime'),
			allTime: document.getElementById('video-allTime'),
		},
	}
	
	// lazy load
	let isLoad = false;

	const loadVideo = () => {
		isLoad = true;
		dom.preview.hidden = true;
		dom.videoContainer.classList.add('_loading');
		dom.video.src = `assets/${dom.videoName}`;
		dom.video.onloadeddata = () => {
			dom.videoContainer.classList.remove('_loading');
			playVideo();
		}
	}

	dom.preview.onclick = () => {
		loadVideo();
	}

	// vars
	let isPlay = false;
	let isMute = false;

	// functions
	const showControls = () => {
		if ( isLoad ) {
			if ( !dom.videoControls.classList.contains('_visible') ) {
				dom.videoControls.classList.add('_visible');
			}
		} else {
			return;
		}
	}

	const hideControls = (timer = true) => {
		if ( timer ) {
			setTimeout(() => {
				dom.videoControls.classList.remove('_visible');
			}, 5000)
		} else {
			dom.videoControls.classList.remove('_visible');
		}
	}

	const playVideo = () => {
		if ( isLoad ) {
			if ( isPlay ) {
				dom.video.pause();
				dom.play.icon.classList.remove('fa-pause');
				dom.play.icon.classList.add('fa-play');
				showControls();
			} else {
				dom.video.play();
				dom.play.icon.classList.remove('fa-play');
				dom.play.icon.classList.add('fa-pause');
			}
			isPlay = !isPlay;
		}
	}

	const muteVideo = () => {
		isMute = !isMute;
		if ( isMute ) {
			dom.video.volume = 0;
			dom.mute.icon.classList.remove('fa-volume-high');
			dom.mute.icon.classList.add('fa-volume-xmark');
		} else {
			dom.video.volume = 1;
			dom.mute.icon.classList.remove('fa-volume-xmark');
			dom.mute.icon.classList.add('fa-volume-high');
		}
	}

	const restartVideo = () => {
		isLoad ? dom.video.currentTime = 0 : '';
	}

	const updateProgress = () => {
		if ( isLoad ) {
			let duration = dom.video.duration;
			let currentTime = dom.video.currentTime;
			dom.progressBar.style.width = `${(currentTime / duration) * 100}%`;
			updateTime(currentTime);
		}
	}

	const updateTime = (seconds) => {
		dom.time.currentTime.innerHTML = `${formatSeconds(seconds)}`;
	}
	updateTime(0);

	const stopVideo = () => {
		dom.video.pause();
		dom.video.currentTime = 0;
		isPlay = false;
		let icon = dom.play.querySelector('i');
		icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
		showControls();
	}	

	const rewindVideo = (e) => {
		let x = e.offsetX;
		let width = dom.progressContainer.offsetWidth;
		let duration = dom.video.duration;
		dom.video.currentTime = duration * (x/width);
	}

	const rewindForward = () => {
		isLoad ? dom.video.currentTime += 10 : "";
	}

	const rewindBackward = () => {
		isLoad ? dom.video.currentTime -= 10 : "";
	}

	const checkKey = (e) => {
		e.preventDefault();
		switch(e.keyCode) {
			case 32:
				playVideo();
				break;
			case 77:
				muteVideo();
				break;
			case 82:
				restartVideo();
				break;
			case 37:
				rewindBackward();
				break;
			case 39:
				rewindForward();
				break;
			case 40:
				hideControls(false);
				break;
			default:
				return;
		}
	}

	// functions call
	dom.video.onclick = showControls;
	dom.video.onmousemove = showControls;
	dom.video.onmouseover = () => hideControls(true);
	dom.play.btn.onclick = playVideo;
	dom.mute.btn.onclick = muteVideo;
	dom.restart.onclick = restartVideo;
	dom.video.ontimeupdate = updateProgress;
	dom.progressContainer.onclick = rewindVideo;
	dom.video.onended = stopVideo;
	dom.fullscreen.onclick = () => {
		dom.videoContainer.requestFullscreen().then(() => {}).catch(err => {
			alert(`Произошла ошибка при попытке переключиться в полноэкранный режим: ${err.message} (${err.name})`);		
		});
	}
	window.addEventListener('keydown', checkKey);

	if ( isMobile.any() ) {
		let div = document.createElement('div');
		div.className = 'video-hideControls';
		div.setAttribute('id', 'video-hideContols');
		dom.videoBtns.appendChild(div);
		div.innerHTML = '<i class="fa-solid fa-tent-arrows-down"></i>';
		dom.hideControls = document.getElementById('video-hideContols');

		dom.hideControls.onclick = () => hideControls(false);
		dom.video.onclick = showControls;
	}



	// block additional information
	const showInfo = document.querySelector('.show-info'),
		blockInfo = document.querySelector('.block-info');

	showInfo.onclick = (e) => {
		e.preventDefault();
		blockInfo.hidden = !blockInfo.hidden;
	}
});