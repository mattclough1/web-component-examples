class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    const slot = document.createElement('slot');
    shadow.append(slot);
    
    const wordCountElem = document.createElement('p');
    const wordCount = this.textContent.match(/\S+/g);
    wordCountElem.innerText = `Word count: ${wordCount?.length || 0}`;
    shadow.append(wordCountElem)

    const style = document.createElement('style');
    style.innerHTML = `
    p {
      font-size: 0.75rem;
    }
    `
    shadow.append(style)
  }
}

customElements.define('word-count', WordCount, { extends: 'p' })






