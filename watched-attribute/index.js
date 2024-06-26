class MyCustomElement extends HTMLElement {
  static observedAttributes = ['text'];

  constructor() {
    super();
  }

  connectedCallback() {
    const p = document.createElement('p');
    p.append(this.getAttribute('text'))
    this.append(p);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      const p = this.querySelector('p');
      if (p) {
        p.textContent = newValue;
      }
    }
  }
}

customElements.define('my-custom-element', MyCustomElement)





