class GameView {
  constructor() {
    this.commandInput = document.createElement("input");
    this.commandInput.type = "text";
    document.body.appendChild(this.commandInput);

    this.messageParagraph = document.createElement("p");
    document.body.appendChild(this.messageParagraph);
  }

  getCommandInputValue() {
    return this.commandInput.value.split("-");
  }

  setCommandInputValue(value) {
    this.commandInput.value = value;
  }

  enableCommandInput(enable) {
    this.commandInput.disabled = !enable;
  }

  updateMessageParagraph(value) {
    this.messageParagraph.innerText = value;
  }
}

export default GameView;
