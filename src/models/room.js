class Room {
  number;
  description;

  walls = [];
  // Objects on the ground
  objects = [];

  constructor(number, description, walls, objects) {
    this.number = number;
    this.description = description;
    this.walls = walls;
    this.objects = objects;
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

  getObjectsDescription() {
    return this.objects
      .map((object) => `The ${object.name} is lying on the floor.`)
      .join(" ");
  }
}

export default Room;
