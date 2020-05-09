const header = document.querySelector(".navbar_bg");
const sectionOne = document.querySelector(".front-text");

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
// For Animated Header when scroll
sectionOneObserver.observe(sectionOne);