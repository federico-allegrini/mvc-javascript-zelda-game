import Player from "../models/player";
import Room from "../models/room";
import Wall from "../models/wall";
import Item from "../models/item";

import roomsData from "../assets/text/rooms.json";

class Game {
  constructor(playerName) {
    this.rooms = this.createRooms();
    this.player = new Player(playerName, this.rooms[1]);
  }

  createRooms() {
    const rooms = roomsData.rooms;
    for (const {
      number,
      description,
      walls: wallsData,
      items: itemsData,
    } of rooms) {
      const walls = wallsData?.map(
        ({ orientation, type }) => new Wall(orientation, type)
      );
      const items = itemsData?.map(({ name, value }) => new Item(name, value));
      rooms.push(new Room(number, description, walls, items));
    }
  }
}

export default Game;
