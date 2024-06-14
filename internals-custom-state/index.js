class MyCustomCheckbox extends HTMLElement {
  static observedAttributes = ['checked', 'name', 'value'];

  name;
  value;

  constructor() {
    super();

    this.internals = this.attachInternals();
  }

  get checked() {
    return this.internals.states.has('checked');
  }

  set checked(value) {
    if (Boolean(value)) {
      this.internals.states.add('checked');
    } else {
      this.internals.states.delete('checked');
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

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
      content: '\u{2714}\u{FE0E}';
      color: white;
      background-color: #7065d8;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
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
}

customElements.define('my-custom-checkbox', MyCustomCheckbox)





