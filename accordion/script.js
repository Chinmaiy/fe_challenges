let accordionModule = (() => {

	const hiddenClass = 'is-hidden',
		headerEl = '.accordion-item header a',
		sectionEl = '.accordion-item section';
	
	return {
		init: accordions => {
			accordions.forEach(accordion => {
				let sections = accordion.querySelectorAll(sectionEl);
				let headers = accordion.querySelectorAll(headerEl);
				sections.forEach(section => {
					section.style.height = `${section.offsetHeight}px`;
					section.classList.add(hiddenClass);
				});
				headers.forEach(header => {
					header.addEventListener('click', e => {
						e.preventDefault();
						header.parentElement.nextElementSibling.classList.toggle(hiddenClass);
					});
				})
			});
		}
	}

})();

accordionModule.init(
	document.querySelectorAll('.accordion')
);