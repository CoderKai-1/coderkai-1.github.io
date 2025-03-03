const topbarTitle = document.getElementById('topbarTitle');
const titleName = document.getElementById('titleName');
const videoOverlay = document.getElementById("videoOverlay");
const imageEnlargen = document.getElementById("imageEnlargen");

const ribbons = document.querySelectorAll('.ribbon');
const flat_ribbons = document.querySelectorAll('.flat_ribbon')
const top_bar_items = document.querySelectorAll('.topbar_item');
const project_overlays = document.querySelectorAll('.project_overlay');
const iframes = document.querySelectorAll('iframe')

const clickable_images = document.querySelectorAll('.clickable_screenshot')

window.onload = function () {
	var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	if (mobile) {
		videoPreview.remove()
		alert("This site is not suitable for mobile devices using data (large file sizes)");
	}

	// for screenshots to be displayed large
	clickable_images.forEach(element => {
		element.addEventListener('click', function () { enlargenImage(element.getAttribute("src")); });
	});
	
}

// const videoPreview = document.getElementById("videoPrev");
// if (screen.orientation.type != 'landscape-primary') {
// 	// console.log(screen.orientation)
// 	videoPreview.remove()
// 	alert("This site is not suitable for mobile devices using data (large file sizes)");
// }


const aboutPath = document.querySelector('.about_line');

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		// console.log(entry.isIntersecting)
		if (entry.isIntersecting) {
			entry.target.classList.remove('fade_in_hidden');
			entry.target.classList.add('fade_in_show');
		}
		else {
			entry.target.classList.remove('fade_in_show');
			entry.target.classList.add('fade_in_hidden');
		}
	});
});
	
const fadeIns = document.querySelectorAll('.fade_in');


fadeIns.forEach(element => {
	// if (element.parentElement != oldParentElement) {
	// 	fadeInElementIndex = 0
	// 	oldParentElement = element.parentElement
	// }

	observer.observe(element)
	// element.style.transitionDelay = (fadeInElementIndex*2) + "00ms";
	// element.style.position = "absolute";

	// fadeInElementIndex += 1;
});


window.addEventListener('scroll', scrollCall);


let aboutLineScrollAmount = 0


function scrollCall() {
	// console.log(window.scrollY)
	
	if (window.scrollY < 550) {
		aboutLineScrollAmount = -window.scrollY * 0.5;
	}
	else {
		aboutLineScrollAmount = (-window.scrollY + 245) * 0.9;
	}

	aboutPath.style.strokeDashoffset = aboutLineScrollAmount + 500

	flat_ribbons.forEach(element => {
		let ribbonDistanceFromTop = element.getBoundingClientRect().top;
		// console.log(ribbonDistanceFromTop)
		
		element.style.backgroundColor = "rgba(20, 20, 20, " + (1+-ribbonDistanceFromTop * 0.01) + ")";
	});

	if (window.scrollY > 150) {
		let darken_value = (window.scrollY - 150) * 0.0025;
		videoOverlay.style.opacity = 0.10 + darken_value;
		
		titleName.style.transform = "translate(" + -(window.scrollY - 250) + "px,400px)"
		titleName.style.fontSize = (100 - ((window.scrollY - 150) * 0.1)) + "px";
		titleName.style.opacity = 1 - (window.scrollY - 150) * 0.0025;

		titleName.style.filter = "blur(" + ((window.scrollY-150) *0.02) + "px)"
	} else {
		videoOverlay.style.opacity = 0.10;
		titleName.style.fontSize = 100
		titleName.style.transform = "translate(100px,400px)"
		titleName.style.opacity = 1
		titleName.style.filter = "blur(0px)"
	}

	if (window.scrollY > 450) {
		topbarTitle.style.opacity = (window.scrollY - 450) * 0.005
	} else {
		topbarTitle.style.opacity = 0
	}

	top_bar_items.forEach(element => {
		let distanceFromTop = element.getBoundingClientRect().top

		if (window.scrollY > 250) {
			element.style.opacity = (window.scrollY - 550) * 0.01
		} else {
			element.style.opacity = 0
		}
	});


	ribbons.forEach(element => {
		let distanceFromTop = element.getBoundingClientRect().top;
		let subtitle = element.getElementsByTagName('p')[0];
		if (subtitle) {
			if (distanceFromTop < 100) {
				// console.log(distanceFromTop)
				subtitle.style.opacity = (distanceFromTop * 0.01);
				subtitle.style.height = (distanceFromTop * 0.2);
				subtitle.style.margin = (distanceFromTop * 0.16);

				element.style.paddingTop = 10 + ((distanceFromTop * 0.15));
				element.style.paddingBottom = 10 + ((distanceFromTop * 0.15));
			} else {
				subtitle.style.opacity = 1;
				subtitle.style.height = 20;
				subtitle.style.margin = 16;

				element.style.paddingTop = 25;
				element.style.paddingBottom = 25;
			}
		}
	});
}

aboutPath.style.strokeDashoffset = 500

topbarTitle.style.opacity = 0;

titleName.style.transform = "translate(100px,400px)";
titleName.style.opacity = 1;
titleName.style.filter = "blur(0px)";

videoOverlay.style.opacity = 0.10;





function showOverlay(overlayName) {
	// console.log(overlayName)


	project_overlays.forEach(element => {
		// console.log(element.id)
		if (element.id == overlayName) {
			document.body.style.overflow = "hidden";

			if (!element.classList.contains(".hide")) {
				element.classList.remove("hide");
				element.classList.add("show");
			}
		}
	});
}
  
function hideAllOverlays() {
project_overlays.forEach(element => {
	if (!element.classList.contains(".show")) {
		element.classList.remove("show");
		element.classList.add("hide");
	}
	document.body.style.overflow = "";
	
	iframes.forEach(iframe => {
		if (iframe) {
			var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
	});
});
}

function enlargenImage(source) {
	if (!imageEnlargen.classList.contains(".hide")) {
		imageEnlargen.classList.remove("hide");
		imageEnlargen.classList.add("show");
	}
	imageEnlargen.querySelector("img").setAttribute("src",source)
}

function hideImageEnlargen() {
	if (!imageEnlargen.classList.contains(".show")) {
		imageEnlargen.classList.remove("show");
		imageEnlargen.classList.add("hide");
	}
}