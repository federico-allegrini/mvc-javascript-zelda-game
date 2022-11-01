import Player from "../models/player";
import Room from "../models/room";
import Wall from "../models/wall";
import Item from "../models/item";
import Character from "../models/character";

import GameView from "../views/gameView";

import roomsData from "../assets/text/rooms.json";

class Game {
  constructor(playerName) {
    this.rooms = this.createRooms();
    this.player = new Player(playerName, this.rooms[0]);
    this.gameView = new GameView();
  }

  createRooms() {
    const rooms = [];
    const linksPositions = [];
    const charactersPositions = [];
    let allItems = [];
    for (const {
      number,
      description,
      walls: wallsData,
      items: itemsData,
    } of roomsData.rooms) {
      const walls = wallsData?.map(
        ({ orientation, type, room: linkedRoomNumber, character }) => {
          linkedRoomNumber &&
            linksPositions.push({
              roomNumber: number,
              orientation,
              linkedRoomNumber,
            });
          character &&
            charactersPositions.push({
              roomNumber: number,
              orientation,
              character,
            });
          return new Wall(orientation, type);
        }
      );
      const items = itemsData?.map(({ name, value }) => new Item(name, value));
      allItems = items?.length > 0 ? [...allItems, ...items] : allItems;
      rooms.push(new Room(number, description, walls, items));
    }
    // Link room's walls
    for (const {
      roomNumber,
      orientation,
      linkedRoomNumber,
    } of linksPositions) {
      rooms[roomNumber - 1]
        .getWall(orientation)
        .linkRoom(rooms[linkedRoomNumber - 1]);
    }
    // Add room's character
    for (const { roomNumber, orientation, character } of charactersPositions) {
      rooms[roomNumber - 1].getWall(orientation).insertCharacter(
        new Character(
          character.name,
          allItems.find((item) => item.name === character.item)
        )
      );
    }
    return rooms;
  }

  executeCommandHandler() {
    const [command, value] = this.gameView.getCommandInputValue();
    if (this.player.checkCommand(command)) {
      this.player[command](value);
    }
    if (this.player.end) {
      this.gameView.enableCommandInput(false);
    }
    this.showMessageHandler();
  }

  showMessageHandler() {
    this.gameView.updateMessageParagraph(this.player.message);
  }

  play() {
    this.createRooms();
    this.player.message = "Welcome!";
    this.showMessageHandler();
    this.gameView.commandInput.addEventListener("change", () =>
      this.executeCommandHandler()
    );
  }
}

export default Game;
