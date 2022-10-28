import { WALL_ORIENTATIONS, WALL_TYPES } from "../data/constants";
import { checkAllowedValues } from "../lib/checkAllowedValues";

class Wall {
  orientation;
  type;
  // Wall blocked by monster
  blocked;
  exit;

  // Linked room
  room;
  // Monster blocking access to the link room
  character;

  constructor(orientation, type, room = undefined, character = undefined) {
    this.checkAllowed(orientation, "orientation", WALL_ORIENTATIONS);
    this.checkAllowed(type, "type", WALL_TYPES);
    this.type = checkAllowedValues(type, WALL_TYPES);
    this.exit = this.type === WALL_TYPES.exit;
    if (room && this.type !== WALL_TYPES.link) {
      this.room = room;
    } else {
      throw `You cannot assign a room to a closed wall!`;
    }
    if (character && this.type !== WALL_TYPES.link) {
      this.character = character;
    } else {
      throw `You cannot place a character on a closed wall!`;
    }
    this.blocked = this?.character.alive;
  }

  checkAllowed(property, propertyName, allowedValues) {
    const { allowed, value } = checkAllowedValues(property, allowedValues);
    if (allowed) {
      this[propertyName] = value;
    } else {
      throw value;
    }
  }
}

export default Wall;
