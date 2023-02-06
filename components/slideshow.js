"use strict";
class SlideShow extends HTMLObjectElement {
    static get observedAttributes() {
        return ["slides", "index"];
    }
    get index() {
        return this.hasAttribute("index") ?
            Number(this.getAttribute("index")) : 0;
    }
    get latestSlides() {
        if (!this.hasAttribute("slides"))
            return [];
        const slides = [];
        const reg = /[\S]+/g;
        const slideURLs = this.getAttribute("slides").matchAll(reg);
        if (slideURLs)
            for (const slide of slideURLs)
                slides.push(slide[0]);
        console.log(slides);
        return slides;
    }
    slides = [];
    currentIndex = 0;
    constructor() {
        super();
        console.log("create slide-show");
    }
    connectedCallback() {
        this.slides = this.latestSlides;
        this.currentIndex = this.index;
        ;
        this.setAttribute("data", this.slides[this.index]);
    }
    nextSlide() {
        if (this.currentIndex < (this.slides.length - 1))
            this.data = this.slides[++this.currentIndex];
    }
    previousSlide() {
        if (this.currentIndex > 0)
            this.data = this.slides[--this.currentIndex];
    }
}
customElements.define("slide-show", SlideShow, { extends: "object" });
