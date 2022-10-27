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

  allowedOrientations = ["NORTH", "EAST", "SOUTH", "WEST"];
  allowedTypes = ["LINK", "WALL", "EXIT"];

  constructor(orientation, type, room = undefined, character = undefined) {
    this.orientation = checkAllowedValues(
      orientation,
      this.allowedOrientations
    );
    this.type = checkAllowedValues(type, this.allowedTypes);
    this.exit = this.type === this.allowedTypes[2];
    if (room && this.type !== this.allowedTypes[0]) {
      this.room = room;
    } else {
      throw `You cannot assign a room to a closed wall!`;
    }
    if (character && this.type !== this.allowedTypes[0]) {
      this.character = character;
    } else {
      throw `You cannot place a character on a closed wall!`;
    }
    this.blocked = this?.character.alive;
  }

  checkAllowedValues(value, allowedValues) {
    const valueUpperCase = value.toUpperCase().trim();
    if (allowedValues.includes(valueUpperCase)) {
      return valueUpperCase;
    } else {
      throw `Allowed values are only: ${this.allowedValues
        .join(", ")
        .slice(0, -2)}!`;
    }
  }
}

export default Wall;
