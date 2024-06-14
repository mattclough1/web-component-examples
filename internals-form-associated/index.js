class MyCustomCheckbox extends HTMLElement {
  static observedAttributes = ['checked', 'name', 'value'];
  static formAssociated = true;

  name;
  value;

  constructor() {
    super();

    this.internals = this.attachInternals();
    this.internals.role = 'checkbox';
  }

  get checked() {
    return this.internals.states.has('checked');
  }

  set checked(value) {
    if (Boolean(value)) {
      this.internals.states.add('checked');
      this.internals.ariaChecked = true;
      this.internals.setFormValue(this.value);
    } else {
      this.internals.states.delete('checked');
      this.internals.ariaChecked = false;
      this.internals.setFormValue(undefined);
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.tabIndex = 0;

    const style = document.createElement('style');
    style.innerHTML = `
    :host {
      box-sizing: border-box;
      contain: layout;
      display: inline-block;
      width: 2rem;
      aspect-ratio: 1 / 1;
      border: 1px solid black;
      border-radius: 6px;
      padding: 0.25rem;
    }
    :host(:state(checked))::after {
      content: '\u{2714}\u{FE0E}' / '';
      color: white;
      background-color: #7065d8;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    :host(:focus-visible) {
      outline: 2px solid blue;
      outline-offset: 0.25rem;
    }
    :host(:disabled) {
      opacity: 0.5;
    }
    `
    shadow.append(style);

    this.addEventListener('click', (e) => {
      this.checked = !this.checked;
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') {
      return this[name] = typeof newValue === 'string' ? true : false;
    }
    this[name] = newValue;
  }

  formAssociatedCallback(form) { /* ... */ }

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formDisabledCallback() { /* ... */ }

  formStateRestoreCallback(state, reason) {
    this.checked = Boolean(state);
  }
}

customElements.define('my-custom-checkbox', MyCustomCheckbox)





