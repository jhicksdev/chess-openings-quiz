class ChoiceButton {
  private readonly element = document.createElement("button");

  constructor(label: string) {
    this.element.classList.add("choice");
    this.element.textContent = label;
  }

  getElement = () => this.element;

  getLabel = () => this.element.textContent;

  setClickEventListener = (listener: () => void) => (this.element.onclick = listener);
}

export { ChoiceButton };
