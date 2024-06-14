class MyCustomInput extends HTMLElement {
  name;
  #value;

  constructor() {
    super();
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.setInternalValue(value);
    this.innerText = value;
    const range = new Range();
    range.selectNode(this.childNodes[0]);
    range.collapse();
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  setInternalValue(value) {
    this.#value = value;
  }

  connectedCallback() {
    this.contentEditable = 'plaintext-only';
    this.#value = this.getAttribute('value');
    this.innerText = this.#value;

    const shadow = this.attachShadow({ mode: 'open' });

    const slot = document.createElement('slot');
    shadow.append(slot);

    const inputArea = document.createElement('div');
    inputArea.contentEditable = true;

    const style = document.createElement('style');
    style.innerHTML = `
    :host {
      display: inline-block;
      border: 1px solid black;
      padding: 0.5rem;
      font-size: 1rem;
      min-width: 20em;
      border-radius: 6px;
    }
    :host(:disabled) {
      border-color: darkgrey;
      background-color: darkgrey;
      user-select: none;
    }
    `
    shadow.append(style);

    this.addEventListener('input', (e) => {
      this.setInternalValue(this.textContent);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  formAssociatedCallback(form) {
  }

  formResetCallback() {
    this.value = '';
  }

  formDisabledCallback() {
    this.contentEditable = this.hasAttribute('disabled') ? false : 'plaintext-only';
  }

  formStateRestoreCallback(state, reason) {

  }
}

customElements.define('my-custom-input', MyCustomInput)





