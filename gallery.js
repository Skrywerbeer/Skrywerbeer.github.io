"use strict";
{
    const buttons = document.querySelectorAll("#loadingIndicators button");
    const slideShow = document.querySelector("#loadingIndicators object[is=\"slide-show\"]");
    buttons[0].addEventListener("click", () => { slideShow.previousSlide(); });
    buttons[1].addEventListener("click", () => { slideShow.nextSlide(); });
}
