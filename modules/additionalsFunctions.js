export function formatSeconds(value) {
	let secondTime = parseInt(value);
	let minuteTime = 0;
	let hourTime = 0;
	if (secondTime > 60) {
		minuteTime = parseInt(secondTime / 60);
		secondTime = parseInt(secondTime % 60);
		if(minuteTime > 60) {
			hourTime = parseInt(minuteTime / 60);
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	let result = `${minuteTime < 1 ? '00:': ''}${secondTime < 10 ? '0' : ''}` + parseInt(secondTime);

	if(minuteTime > 0) {
		result = `${minuteTime < 10 ? '0' : ''}` + parseInt(minuteTime) + ":" + result;
	}
	if(hourTime > 0) {
		result =  `${hourTime < 10 ? '0' : ''}` + parseInt(hourTime) + ":" + result;
	}
	return result;
}

export const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};