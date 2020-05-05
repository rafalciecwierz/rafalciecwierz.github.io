const header = document.querySelector(".navbar_bg");
const sectionOne = document.querySelector(".front-text");
const sectionStart = document.querySelector(".front_logo ");
const sectionAbout = document.querySelector(".about-section");
const sectionOffer = document.querySelector(".section_offer");
const sectionContact = document.querySelector(".contact-section");
const navLinks = document.querySelectorAll(".nav-link");

const sectionOneOptions = {
	rootMargin: "-50% 0% 0% 0%",
};

const sectionOneObserver = new IntersectionObserver(
	(entries, sectionOneObserver) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting)
				header.classList.add("navbar_bg-scrolled");
			else header.classList.remove("navbar_bg-scrolled");
		});
	},
	sectionOneOptions
);

const activeStateObserver = new IntersectionObserver(
	(entries, activeStateObserver) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				// console.log("Poza obiektem");
			} else {
				navLinks.forEach((link) => {
					if (entry.target.id === link.href.split("#")[1]) {
						link.classList.add("active");
					} else {
						link.classList.remove("active");
					}
				});
			}
		});
	},
	{ rootMargin: "-100px 0px -100px 0px" }
);
// For Animated Header when scroll
sectionOneObserver.observe(sectionOne);
// For detecting on witch page are we
activeStateObserver.observe(sectionStart);
activeStateObserver.observe(sectionAbout);
activeStateObserver.observe(sectionOffer);
activeStateObserver.observe(sectionContact);
