"use strict";
;
class NavBarLink extends HTMLAnchorElement {
    constructor() {
        super();
        this.addEventListener("click", (event) => {
            event.preventDefault();
            const page = new URL(this.href).search;
            history.pushState(null, ",", `${page}`);
        });
    }
    connectedCallback() {
    }
}
customElements.define("nav-bar-link", NavBarLink, { extends: "a" });
class NavBar extends HTMLElement {
    static MAIN_LINKS = [
        { text: "Home", href: "?page=home.html" },
        { text: "Projects", href: "?page=projects.html" },
        { text: "Web Components", href: "?page=webcomponents.html" },
        { text: "Web Apps", href: "?page=webapps.html" },
        { text: "Gallery", href: "?page=gallery.html" },
        { text: "Mathematics", href: "?page=mathematics.html" },
        { text: "About", href: "?page=about.html" },
    ];
    stylesheet = document.createElement("link");
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.attachStylesheet();
    }
    connectedCallback() {
        (this.shadowRoot).append(this.createLinkList(NavBar.MAIN_LINKS));
        window.addEventListener("popstate", this.loadFragment);
        window.addEventListener("load", this.loadFragment);
    }
    attachStylesheet() {
        if (this.stylesheet) {
            this.stylesheet.href = "./components/navbar.css";
            this.stylesheet.rel = "stylesheet";
            (this.shadowRoot).appendChild(this.stylesheet);
        }
        else {
            throw new Error("nav-bar: Failed to attach stylesheet.");
        }
    }
    createLink(link) {
        const a = document.createElement("a", { is: "nav-bar-link" });
        a.innerText = link.text;
        a.href = link.href;
        a.addEventListener("click", this.loadFragment);
        return a;
    }
    createLinkList(links) {
        const listItems = [];
        for (const link of links) {
            const li = document.createElement("li");
            li.append(this.createLink(link));
            listItems.push(li);
        }
        const ul = document.createElement("ul");
        ul.append(...listItems);
        return ul;
    }
    loadFragment() {
        const docURL = new URL(document.URL);
        const fragmentURL = docURL.searchParams.get("page");
        if (fragmentURL === null)
            throw new Error("nav-bar: document url misformed.");
        fetch(fragmentURL)
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
customElements.define("nav-bar", NavBar);
