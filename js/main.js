var index = 0;
var bgImage;
var projetsFond;
var duration = 0.7;
var sections = ['#section1',
								'#section2',
								'#section3',
								'#section4'];
var isMobile = true;


onReady(function () {


	bgImage = document.getElementsByClassName('background-img')[0];
	projetsFond = document.getElementsByClassName('projets-fond')[0];
	projetsView = document.getElementsByClassName('projets-view')[0];


	//gsap.ticker.lagSmoothing(10, 2);

	screenSizeTest();
	window.addEventListener("resize", screenSizeTest);

	//partTwo();

});

function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 100);

    function checkReady() {
        if (document.getElementsByTagName('section')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}
function screenSizeTest(){
	if(isMobile == true && window.innerWidth >= 900){
		console.log('desktop');
		isMobile = false;

		window.addEventListener("wheel", scrollStop, {passive: false});
		window.addEventListener("wheel", scrollTest);


		slidesInit();
	
	}else if(isMobile == false && window.innerWidth < 900){
		console.log('mobile');
		isMobile = true;

		window.removeEventListener("wheel", scrollStop, {passive: false});
		window.removeEventListener("wheel", scrollTest);


		slidesInit();
	
	}
}
function slidesInit(){
	var y = 0
	index = 0;
	if(isMobile == false){
		window.scrollTo(0, 0);
		for(var i = 0; i<sections.length; i++){
			
			if(i<index){
				y = -100;
			}else if(i>index){
				y = 100;
			}else if( i==index){
				y = 0;
			}

			gsap.set(sections[i], {
				yPercent: y
			})
		}
	}else{
		for(var i = 0; i<sections.length; i++){
			gsap.timeline()
			.set(sections[i], {
				yPercent: 0,
				autoAlpha: 1
			})
			.set(bgImage, {
				autoAlpha: (0.25)
			})
		}
	}
}
function scrollTest(event){

	var current = index;

	if(event.type == 'click' || event.deltaY > 0){
		index++;
	}else{
		index--;
	}

	if(index<0){
		index = 0;
	}else if(index >= sections.length){
		index = sections.length-1;
	}else{

		window.removeEventListener("wheel", scrollTest);
		smoothScroll(current, index);

	}
}
function smoothScroll(prev, next){

	var prevY = (prev - next) * 100;
	var nextY = 0;

	if(prev == 0){
		bgFade(0, false);
	}else if(next == 0){
		bgFade(1, false);
	}

	gsap.timeline()
		.to(sections[next], {
			duration: duration,
			ease: "sine.out",
			yPercent: nextY,
			onStart: () => {
				if(next==1&&prev==0){
					animateProfil();
				}
			}
		})	
		.to(sections[prev], {
			duration: duration,
			ease: "sine.out",
			yPercent: prevY,
			onComplete: () => {
				window.addEventListener("wheel", scrollTest);
			}
		}, '<');

}
function bgFade(inOut, inst){

	var t = (inst ? 0 : duration);
	console.log(t);
	gsap.to(bgImage, {
		duration: t,
		ease: 'sine.out',
		autoAlpha: (0.25 * inOut)
	})
}
function animateProfil(){
	gsap.timeline()
		.from('.p-item', {
			duration: duration,
			ease: 'sine.out',
			yPercent: 100,
			stagger: 0.075
		})
		.from('.p-desc', {
			duration: duration,
			ease: 'sine.out',
			autoAlpha: 0,
			stagger: 0.075
		}, '<0.3')
		.from('.photo-profil', {
			duration: duration,
			ease: 'power3.out',
			yPercent: 100,
			scale: 0.1
		}, '<');
}
function skipToProfileMobile(event){
	if(isMobile){
		document.getElementById('section2').scrollIntoView();
	}else{
		scrollTest(event);
	}
}
function skipToProjectsMobile(){
	if(isMobile){
		document.getElementById('section3').scrollIntoView();
	}else{
		skipToProjects();
	}
}
function skipToContactMobile(){
	if(isMobile){
		document.getElementById('section4').scrollIntoView();
	}else{
		skipToContact();
	}
}
function skipToContact(){
	window.removeEventListener("wheel", scrollTest);
	index = 3;
	gsap.timeline()
		.to('.stripe', {
			duration: duration,
			ease: 'sine.out',
			width: window.innerWidth,
			stagger: 0.2
		})
		.set(sections[3], {
			yPercent: 0
		}, '<')
		.from('.cai', {
			duration: duration,
			ease: 'back.out(1.4)',
			xPercent: 75,
			stagger: 0.2
		}, '<0.6')
		.set('.stripe', {
			width:0
		})
		.set([sections[0], sections[1], sections[2]], {
			yPercent: -100,
			onComplete: () => {
				bgFade(0, true);
				window.addEventListener("wheel", scrollTest);
			}
		});
}
function skipToProjects(){
	window.removeEventListener("wheel", scrollTest);
	index = 2;
	var fondRect = projetsFond.getBoundingClientRect();
	var posX = fondRect.x + 5;
	var posY = fondRect.y + 5;
	var rayon = Math.sqrt(posX*posX + posY*posY)
	var scale = rayon/5

	var master = gsap.timeline()
		.to(projetsFond, {
			duration: 0,
			autoAlpha: 1
		}).to(projetsFond, {
			duration: 0.8,
			ease: 'sine.out',
			scale: scale + 1,
			backgroundColor: '#195AFF'
		}).to(projetsFond, {
			duration: 0,
			autoAlpha: 0,
			scale: 1
		}).set(sections[2], {
			yPercent: 0
		}).set(sections[3], {
			yPercent: 100
		}).set(sections[0], {
			yPercent: -100
		}).set(sections[1], {
			yPercent: -100,
			onComplete: () => {
				bgFade(0, true);
			}
		})

	master.add(projetsPartTwo());

}
function projetsPartTwo(){
	var tl = 

	gsap.timeline()
		.from('.dot', {
			duration: duration,
			ease: 'back.out(6)',
			scale: 0,
			stagger: 0.2
		})
		.from('.projets-titre', {
			duration: duration,
			ease: 'back.out(1)',
			scale: 0,
			onComplete: () => {
				console.log('complete');
			}
		}, '<0.2')
		.from('.projets-view', {
			duration: duration,
			ease: 'none',
			autoAlpha: 0
		}, '<')
		.from('.slideshow-btn', {
			duration: duration,
			ease: 'none',
			autoAlpha: 0,
			onComplete: () => {
				window.addEventListener("wheel", scrollTest);
			}
		}, '<');

	return tl;
}
function scrollStop(event){
	event.preventDefault();
}