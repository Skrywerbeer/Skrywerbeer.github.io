interface Link {
	text: string;
	href: string;
};

class InternalLink extends HTMLAnchorElement {
	constructor() {
		super();
		this.addEventListener("click", (event) => {
			event.preventDefault();
			const page = new URL(this.href).search;
			history.pushState(null, ",", `${page}`);
		})
	}
	connectedCallback() {
		const loader = document.querySelector("content-loader") as ContentLoader;
		this.addEventListener("click", loader.loadFragment);
	}
}
customElements.define("internal-link", InternalLink, {extends: "a"});

class ContentLoader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: "open"});
	}
	private connectedCallback(): void {
		this.style.display = "none";
		window.addEventListener("popstate", this.loadFragment);
		window.addEventListener("load", this.loadFragment);
	}
	private disconnectedCallback(): void {
		window.removeEventListener("popstate", this.loadFragment);
		window.removeEventListener("load", this.loadFragment);
	}
	public loadFragment(): void {
		// TODO: add error and timeout handling.
		const docURL = new URL(document.URL);
		let fragmentURL = docURL.searchParams.get("page");
		if (fragmentURL === null)
			fragmentURL = "home.html"
		fetch(fragmentURL)
			.then((response) => {
				// TODO: load 404 error page.
				if (!response.ok)
					throw new Error("content-loader: Failed to fetch fragment, " +
						`response returned ${response.status}`);
				return response.text();
			})
			.then((fragment) => {
				const view = document.getElementById("contentView");
				if (view) {
					const loader = document.querySelector("content-loader") as ContentLoader;
					if (!loader)
						throw new Error("Could not find content-loader");
					loader.clearView(view);
					const parser = new DOMParser();
					const dom = parser.parseFromString(fragment, "text/html");
					const body = dom.querySelector("body");
					if (body)
						for (let child of [...body.children])
							view.append(document.adoptNode(child));
					view.append(loader.createHookFrom(fragmentURL.replace(".html", ".js")));
				}
				else {
					throw new Error("Could not find contentView");
				}
			})
			.catch((error) => {
				console.error(`content-loader: ${error} happened while ` +
					`fetching: ${fragmentURL}`);
			});
	}
	public clearView(view: HTMLElement): void {
		for (const child of [...view.children])
			child.remove();
	}
	public createHookFrom(url: string): HTMLScriptElement {
		const script = document.createElement("script");
		script.setAttribute("src", url);
		return script;
	}
}

customElements.define("content-loader", ContentLoader);

