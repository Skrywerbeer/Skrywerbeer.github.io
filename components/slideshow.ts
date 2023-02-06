class SlideShow extends HTMLObjectElement {
	static get observedAttributes(): Array<string> {
		return ["slides", "index"];
	}
	get index(): number {
		return this.hasAttribute("index") ?
			Number(this.getAttribute("index")) : 0;
	}
	get latestSlides(): Array<string> {
		if (!this.hasAttribute("slides"))
			return [];
		const slides: Array<string> = [];
		const reg = /[\S]+/g;
		const slideURLs = this.getAttribute("slides")!.matchAll(reg);
		if (slideURLs)
			for (const slide of slideURLs)
				slides.push(slide[0]);
		return slides;
	}
	private slides: Array<string> = [];
	private currentIndex: number = 0;
	constructor() {
		super();
	}
	private connectedCallback(): void {
		this.slides = this.latestSlides;
		this.currentIndex = this.index;;
		this.setAttribute("data", this.slides[this.index]);
	}
	nextSlide(): void {
		if (this.currentIndex < (this.slides.length - 1))
			this.data = this.slides[++this.currentIndex];
	}
	previousSlide(): void {
		if (this.currentIndex > 0)
			this.data = this.slides[--this.currentIndex];
	}
}

customElements.define("slide-show", SlideShow, {extends: "object"});
