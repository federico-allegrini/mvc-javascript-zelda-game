import { CHARACTER_TYPES, WALL_ORIENTATIONS } from "../data/constants";

class Room {
  number;
  description;

  walls = [];
  // Items on the ground
  items = [];

  constructor(number, description, walls, items) {
    this.number = number;
    this.description = description;
    if (walls) {
      if (walls.length === 4) {
        if (this.isBlockedMaximumOne(walls)) {
          this.walls = walls;
        } else {
          throw `You cannot create a room with multiple blocked walls!`;
        }
      } else {
        throw `You cannot create a room with a number of walls other than 4!`;
      }
    }
    this.items = items;
  }

  hasCharacter(type) {
    const checkEndGame =
      type === CHARACTER_TYPES.monster
        ? !wall.character.endGame
        : wall.character.endGame;
    for (const wall of this.walls) {
      if (wall.character && checkEndGame) {
        return true;
      }
    }
    return false;
  }

  hasMonster() {
    return this.hasCharacter(CHARACTER_TYPES.monster);
  }

  hasPrincess() {
    return this.hasMonster(CHARACTER_TYPES.princess);
  }

  containsItem(name) {
    for (const item of this.items) {
      if (item.name === name.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  unlock() {
    const indexBlockedWall = this.walls.findIndex((wall) => wall.blocked);
    if (indexBlockedWall !== -1) {
      this.walls[indexBlockedWall].blocked = false;
    }
  }

  isBlockedMaximumOne(walls) {
    return walls.filter((wall) => wall.blocked).length <= 1;
  }

  getWall(orientation) {
    orientation = orientation.toLowerCase();
    return this.walls.find(
      (wall) => wall.orientation === WALL_ORIENTATIONS[orientation]
    );
  }

  getItem(name) {
    return this.items.find((item) => item.name === name);
  }

  getPrincess() {
    for (const wall of this.walls) {
      if (wall.character && wall.character.endGame) {
        return wall.character;
      }
    }
    return undefined;
  }

  removeItem(name) {
    this.items = this.items.filetr((item) => item.name !== name);
  }

  removePrincess() {
    for (const wall of this.walls) {
      if (wall.character && wall.character.endGame) {
        wall.character = undefined;
      }
    }
  }

  dropCharacter(character) {
    for (const wall of this.walls) {
      if (!wall.character) {
        wall.character = character;
        return wall.orientation;
      }
    }
    return "";
  }

  getFullDescription() {
    return [
      this.getNumberDescription(),
      this.getRoomDescription(),
      this.getWallsDescription(),
    ].join("\n");
  }

  getNumberDescription() {
    return `Currently you are in Room ${this.number}.`;
  }

  getRoomDescription() {
    return this.description;
  }

  getWallsDescription() {
    return this.walls
      .map(
        (wall) =>
          `There is a ${wall.type} ${
            wall.room ? `to room ${wall.room.number}` : ""
          } to your ${wall.orientation}. ${
            wall.blocked
              ? `Access to the room is blocked by the ${wall.character.name}.`
              : ""
          }`
      )
      .join(" ");
  }

  getItemsDescription() {
    return this.items
      .map((item) => `The ${item.name} is lying on the floor.`)
      .join(" ");
  }
}

export default Room;
