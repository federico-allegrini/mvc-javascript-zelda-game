import { WALL_ORIENTATIONS, WALL_TYPES } from "../data/constants";
import { checkAllowedValues } from "../lib/checkAllowedValues";

class Player {
  name;
  commands = {
    attack: this.attack,
    move: this.move,
    pick: this.pick,
    drop: this.drop,
    look: this.look,
    exit: this.exit,
  };
  message = "";
  end = false;

  room;
  // Only "Princess"
  character;
  // Bag
  objects = [];

  constructor(name, room) {
    this.name = name.toUpperCase().trim();
    this.room = room;
  }

  attack() {
    if (this.room.hasMonster()) {
      const monster = this.room.character;
      const weaponRequired = monster.object.name;
      if (this.hasWeapon(weaponRequired)) {
        this.message = `You attacked "${monster.name}" with the "${weaponRequired}", you killed the monster!`;
        monster.alive = false;
        this.room.unlock();
      } else {
        this.message = `You attacked "${monster.name}" without having the "${weaponRequired}", you are dead!`;
        this.end = true;
      }
    } else {
      this.message = `There is no monster in the room, you cannot attack!`;
    }
  }

  move(orientation) {
    const {allowed: allowedOrientation} = checkAllowedValues(orientation, WALL_ORIENTATIONS)
    if(allowedOrientation){
      const wall = this.room.getWall(orientation);
      if(wall.type ===WALL_TYPES.wall) {
        this.message = `You cannot move in this direction because there is a wall.`
      } else {
        if(wall.blocked) {
          this.message = `You cannot move in this direction because there is ${wall.character.name} blocking your way.`
        } else {
          if(orientation===WALL_ORIENTATIONS.west && wall.exit){
            if(this?.character.endGame) {
              this.message = `You saved the princess, you won the game!`;
            } else {
              this.message = `You left the castle without taking the princess with you, you lost the game...`;
            }
            this.end = true;
          } else {
            const linkedRoom = wall.room;
            this.room = linkedRoom;
            this.message = linkedRoom.getFullDescription();
          }
        }
      }

    }
    if(wall.type)
  }

  pick() {}

  drop() {}

  look() {}

  exit() {}

  hasWeapon(weapon) {
    for (const object of this.objects) {
      if (object.name === weaponRequired) {
        return true;
      }
    }
    return false;
  }
}

export default Player;
