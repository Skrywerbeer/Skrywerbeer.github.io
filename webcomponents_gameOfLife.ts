(document.getElementById("toggleBtn")!).addEventListener("click", function() {
	const game = document.querySelector("game-of-life")!;
	if (this.innerText === "run") {
		this.innerText = "stop";
		game.setAttribute("timer", "run");
	}
	else if (this.innerText === "stop") {
		this.innerText = "run";
		game.setAttribute("timer", "stop");
	}
});

(document.getElementById("randomBtn")!).addEventListener("click", function() {
	
});
