interface SlideShow {
	previousSlide: () => void;
	nextSlide: () => void;
}
{
	const buttons = document.querySelectorAll("#loadingIndicators button");
	const slideShow =
		document.querySelector("#loadingIndicators object[is=\"slide-show\"]") as SlideShow;
	buttons[0].addEventListener("click", () => {slideShow.previousSlide();});
	buttons[1].addEventListener("click", () => {slideShow.nextSlide();});
}
