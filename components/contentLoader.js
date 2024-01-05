"use strict";
;
class InternalLink extends HTMLAnchorElement {
    constructor() {
        super();
        this.addEventListener("click", (event) => {
            event.preventDefault();
            const page = new URL(this.href).search;
            history.pushState(null, ",", `${page}`);
        });
    }
    connectedCallback() {
        const loader = document.querySelector("content-loader");
        this.addEventListener("click", loader.loadFragment);
    }
}
customElements.define("internal-link", InternalLink, { extends: "a" });
class ContentLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.style.display = "none";
        window.addEventListener("popstate", this.loadFragment);
        window.addEventListener("load", this.loadFragment);
    }
    disconnectedCallback() {
        window.removeEventListener("popstate", this.loadFragment);
        window.removeEventListener("load", this.loadFragment);
    }
    loadFragment() {
        const docURL = new URL(document.URL);
        let fragmentURL = docURL.searchParams.get("page");
        fetch(((fragmentURL !== null) ? fragmentURL : "home.html"))
            .then((response) => {
            if (!response.ok)
                throw new Error("nav-bar: Failed to fetch fragment, " +
                    `response returned ${response.status}`);
            return response.text();
        })
            .then((fragment) => {
            const view = document.getElementById("contentView");
            if (view)
                view.innerHTML = fragment;
        })
            .catch((error) => {
            console.error(`nav-bar: ${error} happened while ` +
                `fetching: ${fragmentURL}`);
        });
    }
}
customElements.define("content-loader", ContentLoader);
