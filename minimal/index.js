class MyCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const p = document.createElement('p');
    p.append('Hello World');
    this.append(p);
  }
}

customElements.define('my-custom-element', MyCustomElement)





