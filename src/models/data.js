import Room from "./room";
import Wall from "./wall";
import Item from "./item";
import Character from "./character";

import endDead from "../assets/text/endDead.txt";
import endLose from "../assets/text/endLose.txt";
import endWin from "../assets/text/endWin.txt";
import start from "../assets/text/start.txt";
import roomsData from "../assets/text/rooms.json";

class Data {
  rooms;
  messages = {
    endDead,
    endLose,
    endWin,
    start
  };

  constructor() {
    this.rooms = this.createRooms();
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

}

export default Data;
