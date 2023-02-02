"use strict";
;
class NavBar extends HTMLElement {
    static MAIN_LINKS = [
        { text: "Home", href: "./index.html" },
        { text: "Projects", href: "./projects.html" },
        { text: "Web Components", href: "./webcomponents.html" },
        { text: "Web Apps", href: "./webapps.html" },
        { text: "Gallery", href: "./gallery.html" },
        { text: "Mathematics", href: "./mathematics.html" },
        { text: "About", href: "./about.html" },
    ];
    stylesheet = document.createElement("link");
    ;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.attachStylesheet();
    }
    connectedCallback() {
        (this.shadowRoot).append(this.createLinkList(NavBar.MAIN_LINKS));
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
        const a = document.createElement("a");
        a.innerText = link.text;
        a.href = link.href;
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
}
customElements.define("nav-bar", NavBar);
