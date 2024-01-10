import("../git-modules/SVGUtils/svgutils.mjs").then((module) => {
	let graphTan = document.getElementById("graphTan");
	graphTan.append(module.polylineFromFunc((x) => Math.tan(-x), -1.4, 1.4));

	let graphTanh = document.getElementById("graphTanh");
	graphTanh.append(module.polylineFromFunc((x) => Math.tanh(x), -2, 2));
})
