
document.addEventListener("DOMContentLoaded", function () {
	animateText();
	toggleMenu();
	windowLoad();
	addAnimationInit();
	accordionFunction();
	handlePopup();
	prettyScroll();
	animationHeader();
	loadMoreFunc();
	slideDown();
	reviewsSliderInit();
});

setTimeout(function () {
	let aosOffset = 120;
	if (window.innerWidth < 480) {
		aosOffset = 30;
	}
	AOS.init({
		offset: aosOffset
	});
}, 100);
const animateText = () =>{	const aboutText = document.querySelectorAll('.about__content p, .footer nav li, .footer__block, .area__content li, .area__content p, .discover__content h2, .discover__content p, .discover__content li, .discover__content h3 ');

	
	aboutText.forEach((text) => {
		text.setAttribute('data-aos', 'fade-up');
	})
}

const prettyScroll = () => {
	document.querySelectorAll('a[href^="#"]').forEach(link => {
			link.addEventListener('click', function(e) {
					e.preventDefault();

					const href = this.getAttribute('href').substring(1);
					const scrollTarget = document.getElementById(href);

					if (!scrollTarget) return;

					const header = document.querySelector('header');
					const fixedHeader = document.querySelector('.header__bottom');

					const topOffset = header?.offsetHeight || 0;
					const fixedOffset = fixedHeader?.offsetHeight || 0;

					const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
					const elementPosition = scrollTarget.getBoundingClientRect().top;

					const offsetPosition = isDesktop 
							? elementPosition - fixedOffset 
							: elementPosition - topOffset;

					window.scrollBy({
							top: offsetPosition,
							behavior: 'smooth'
					});
			});
	});
};
const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}
function windowLoad() {
	const animationDuration = 3000;
	const frameDuration = 1000 / 60;
	const totalFrames = Math.round(animationDuration / frameDuration);
	const easeOutQuad = t => t * (2 - t);

	const numScroll = statValue => {
    const countTo = parseInt(statValue.dataset.target.replace(/,/g, ''), 10);
    const tempText = statValue.innerHTML;
    statValue.innerHTML = countTo;
    const maxWidth = statValue.offsetWidth;
    statValue.innerHTML = tempText;
    statValue.style.width = maxWidth + 'px';

    let frame = 0;
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);

        statValue.innerHTML = currentCount;

        if (frame === totalFrames) {
            clearInterval(counter);
            statValue.innerHTML = countTo;
        }
    }, frameDuration);
};


	const statValueInit = (statValues = document.querySelectorAll('.stat-value')) => {
			statValues.forEach(numScroll);
	};

	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							const statValues = entry.target.querySelectorAll('.stat-value');
							if (statValues.length) {
									statValueInit(statValues);
							}
					}
			});
	}, { threshold: 0.7 });

	document.querySelectorAll('.advantages__item__content').forEach(section => {
			observer.observe(section);
	});

	if (document.readyState === 'complete') {
			statValueInit();
	} else {
			window.addEventListener('DOMContentLoaded', () => {
					statValueInit();
			});
	}
}
const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
			
		});
	}
}
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");

  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
    });

    const buttons = item.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
};

const handlePopup = () => {
	const openPopup = () => {
			document.querySelectorAll('[data-open="open"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.add('open-popup');
					});
			});
	};

	const closePopup = () => {
			document.querySelectorAll('[data-close="close"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.remove('open-popup');
					});
			});
	};

	openPopup();
	closePopup();
};

const loadMoreFunc = () => {
	const galleries = document.querySelectorAll('.work__items'); 

	galleries.forEach((gallery) => {
		const loadItems = gallery.querySelectorAll('.work__gallery__item');
		const loadMoreBtn = gallery.querySelector('.work__gallery__btn'); 
		const initialItems = 8;
		const itemsPerClick = 4;

		loadItems.forEach((item, index) => {
			if (index < initialItems) {
				item.style.display = "flex";
				item.style.opacity = "1"; 
			} else {
				item.style.display = "none";
			}
		});

		if (loadItems.length <= initialItems) {
			loadMoreBtn.style.display = 'none';
		}

		loadMoreBtn.addEventListener("click", function (e) {
			e.preventDefault();

			let hiddenItems = Array.from(loadItems).filter(item => item.style.display === "none");
	
			hiddenItems.slice(0, itemsPerClick).forEach((item, index) => {
				setTimeout(() => {
					slideDown(item, 300);
				}, index * 100); 
			});
	
			if (hiddenItems.length <= itemsPerClick) {
				loadMoreBtn.style.display = "none";
			}
		
		});
	});
};
const slideDown = (element, duration = 300) => {
	if (!element) return;
	element.style.display = "flex";
	element.style.overflow = "hidden";
	element.style.maxHeight = "0px"; 
	element.style.opacity = "0";

	let start = null;
	const targetHeight = element.scrollHeight; 

	const step = (timestamp) => {
		if (!start) start = timestamp;
		let progress = timestamp - start;
		let newHeight = Math.min((progress / duration) * targetHeight, targetHeight);
		element.style.maxHeight = newHeight + "px";
		element.style.opacity = (progress / duration).toFixed(2); 

		if (progress < duration) {
			requestAnimationFrame(step);
		} else {
			element.style.maxHeight = "";
			element.style.opacity = "1";
			element.style.overflow = "";
		}
	};

	requestAnimationFrame(step);
};
const reviewsSliderInit = () =>{
	const reviewsSliderWrap = document.querySelector('.reviewsSlider');
	if(!reviewsSliderWrap) return;
	const reviewsSlider = new Swiper(reviewsSliderWrap, {
		slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },
		pagination: {
        el: ".reviews-pagination",
				clickable: true,
      },
		navigation: {
			nextEl: ".reviews-button-next",
			prevEl: ".reviews-button-prev",
		},
	});
}
