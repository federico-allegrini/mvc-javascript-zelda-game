import Data from "../models/data";
import Player from "../models/player";

import GameView from "../views/gameView";

class Game {
  constructor(playerName) {
    this.data = new Data();
    this.player = new Player(playerName, this.data);
    this.gameView = new GameView();
  }

  executeCommandHandler() {
    const [command, value] = this.gameView.getCommandInputValue();
    if (this.player.checkCommand(command)) {
      this.player[command](value);
    }
    if (this.player.end) {
      this.gameView.enableCommandInput(false);
    }
    this.resetCommandHandler();
    this.focusCommandHandler();
    this.showMessageHandler();
  }

  focusCommandHandler() {
    this.gameView.focusCommandInput();
  }

  resetCommandHandler() {
    this.gameView.setCommandInputValue("");
  }

  showMessageHandler() {
    this.gameView.updateMessageParagraph(this.player.message);
  }

  play() {
    this.focusCommandHandler();
    this.showMessageHandler();
    this.gameView.commandInput.addEventListener("change", () =>
      this.executeCommandHandler()
    );
  }
}

export default Game;
