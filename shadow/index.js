class MyCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.append("I'm in the shadow DOM")
    p.classList.add('special-class')
    shadowRoot.append(p);
    
    const style = document.createElement('style');
    style.innerHTML = `
    p {
      font-family: sans-serif;
      color: var(--text-color);
    }
    `
    shadowRoot.append(style);
  }
}

customElements.define('my-custom-element', MyCustomElement)





