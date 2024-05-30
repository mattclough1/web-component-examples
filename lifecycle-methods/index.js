class MyCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  // element is added to the DOM
  connectedCallback() { /* ... */ }
  // element is removed from the DOM
  disconnectedCallback() { /* ... */ }
  // element is moved to a different document
  adoptedCallback() { /* ... */ }
}

customElements.define('my-custom-element', MyCustomElement)





