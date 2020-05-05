const header = document.querySelector(".navbar_bg");
const sectionOne = document.querySelector(".front-text");
const sectionStart = document.querySelector(".front_logo ");
const sectionAbout = document.querySelector(".about-section");
const sectionOffer = document.querySelector(".section_offer");
const sectionContact = document.querySelector(".contact-section");

const sectionOneOptions = {
	rootMargin: "-50% 0% 0% 0%",
};
// toDOO!
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
				console.log("W obiekcie");
				console.log(entry.target.id);
			}
		});
	},
	{ rootMargin: "-200px" }
);

sectionOneObserver.observe(sectionOne);

activeStateObserver.observe(sectionStart);
activeStateObserver.observe(sectionAbout);
activeStateObserver.observe(sectionOffer);
activeStateObserver.observe(sectionContact);
