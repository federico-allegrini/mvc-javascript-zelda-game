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
  rooms = [];
  messages = {
    endDead,
    endLose,
    endWin,
    start,
  };

  constructor() {
    this.createRooms();
    console.dir(this.rooms);
  }

  createRooms() {
    debugger;
    const [linksPositions, charactersPositions, allItems] =
      this.createRoomsWithoutLinksAndCharacters();
    this.addLinkedRoomsWalls(linksPositions);
    this.addRoomsCharacter(charactersPositions, allItems);
  }

  createRoomsWithoutLinksAndCharacters() {
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
      this.rooms.push(new Room(number, description, walls, items));
    }
    return [linksPositions, charactersPositions, allItems];
  }

  addLinkedRoomsWalls(linksPositions) {
    for (const {
      roomNumber,
      orientation,
      linkedRoomNumber,
    } of linksPositions) {
      this.rooms[roomNumber - 1]
        .getWall(orientation)
        .linkRoom(this.rooms[linkedRoomNumber - 1]);
    }
  }

  addRoomsCharacter(charactersPositions, allItems) {
    for (const { roomNumber, orientation, character } of charactersPositions) {
      this.rooms[roomNumber - 1].getWall(orientation).insertCharacter(
        new Character(
          character.name,
          allItems.find((item) => item.name === character.item)
        )
      );
    }
  }
}

export default Data;
