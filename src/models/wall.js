import { WALL_ORIENTATIONS, WALL_TYPES } from "../data/constants";
import { checkAllowedValues } from "../lib/checkAllowedValues";

class Wall {
  orientation;
  type;
  // Wall blocked by monster
  blocked = false;
  exit;

  // Linked room
  room;
  // Monster blocking access to the link room
  character;

  constructor(orientation, type) {
    this.orientation = this.checkAllowed(
      orientation,
      "orientation",
      WALL_ORIENTATIONS
    );
    this.type = this.checkAllowed(type, "type", WALL_TYPES);
    this.exit = this.type === WALL_TYPES.exit;
  }

  linkRoom(room = undefined) {
    if (room) {
      if (this.type === WALL_TYPES.link) {
        this.room = room;
      } else {
        throw `You cannot assign a room to a closed wall!`;
      }
    }
  }

  insertCharacter(character = undefined) {
    if (character) {
      if (this.type === WALL_TYPES.link) {
        this.character = character;
      } else {
        throw `You cannot place a character on a closed wall!`;
      }
    }
    this.blocked = !!this.character?.alive && !this.character.endGame;
  }

  checkAllowed(property, propertyName, allowedValues) {
    const { allowed, value } = checkAllowedValues(property, allowedValues);
    if (allowed) {
      return value;
    } else {
      throw value;
    }
  }
}

export default Wall;
