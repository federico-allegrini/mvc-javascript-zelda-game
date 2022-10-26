class Wall {
  orientation;
  type;
  blocked;
  exit;

  // Linked room
  room;
  // Monster blocking access to the link room
  character;

  allowedOrientations = ["NORTH", "EAST", "SOUTH", "WEST"];
  allowedTypes = ["LINK", "WALL", "EXIT"];

  constructor(orientation, type, room = null, character = null) {
    this.orientation = checkAllowedValues(
      orientation,
      this.allowedOrientations
    );
    this.type = checkAllowedValues(type, this.allowedTypes);
    this.blocked = this.type === this.allowedTypes[1];
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
