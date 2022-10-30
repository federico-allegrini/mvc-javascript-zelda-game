import Player from "../models/player";
import Room from "../models/room";
import Wall from "../models/wall";
import Object from "../models/object";

import roomsData from "../assets/text/rooms.json";

class Game {
  constructor(playerName) {
    this.rooms = this.createRooms();
    this.player = new Player(playerName, this.rooms[1]);
  }

  createRooms() {
    debugger;
    const rooms = roomsData.rooms;
    for (const {
      number,
      description,
      walls: wallsData,
      objects: objectsData,
    } of rooms) {
      const walls = wallsData.map(
        ({ orientation, type }) => new Wall(orientation, type)
      );
      const objects = objectsData.map(
        ({ name, value }) => new Object(name, value)
      );
      rooms.push(new Room(number, description, walls, objects));
    }
  }
}

export default Game;
