import {
  WALL_ORIENTATIONS,
  WALL_TYPES,
  CHARACTER_TYPES,
  MAX_PLAYER_ITEMS,
  MAX_ROOM_ITEMS,
  PLAYER_COMMANDS,
} from "../data/constants";
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
  items = [];

  constructor(name, room) {
    this.name = name.toUpperCase().trim();
    this.room = room;
  }

  attack() {
    if (this.room.hasMonster()) {
      const monster = this.room.character;
      const weaponRequired = monster.item.name;
      if (this.hasItem(weaponRequired)) {
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
    const { allowed: allowedOrientation } = checkAllowedValues(
      orientation,
      WALL_ORIENTATIONS
    );
    if (allowedOrientation) {
      const wall = this.room.getWall(orientation);
      if (wall.type === WALL_TYPES.wall) {
        this.message = `You cannot move in this direction because there is a wall.`;
      } else {
        if (wall.blocked) {
          this.message = `You cannot move in this direction because there is ${wall.character.name} blocking your way.`;
        } else {
          if (orientation === WALL_ORIENTATIONS.west && wall.exit) {
            if (this?.character.endGame) {
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
  }

  pick(item) {
    item = item.toUpperCase();
    if (this.room.containsItem(item)) {
      if (this.items.length <= MAX_PLAYER_ITEMS) {
        this.items.push(this.room.getObjet(item));
        this.room.removeItem(item);
        this.message = `You picked up and put "${item}" in your bag.`;
      } else {
        this.message = `You can't pick anything. Your bag is full, it already contains ${MAX_PLAYER_ITEMS} items!`;
      }
    } else if (this.room.hasPrincess()) {
      if (this.hasPrincess()) {
        this.message = `You've already got ${CHARACTER_TYPES.princess}, you can't pick her up again!`;
      } else {
        this.character = this.room.getPrincess();
        this.room.removePrincess();
        this.message = `Good boy! You got ${CHARACTER_TYPES.princess}!`;
      }
    } else {
      this.message = `You can't pick anything. There is no item or character named "${item}" in this room...`;
    }
  }

  drop(item) {
    item = item.toUpperCase();
    if (this.hasItem(item)) {
      if (this.room.items.length < MAX_ROOM_ITEMS) {
        this.room.items.push(this.getObjet(item));
        this.removeItem(item);
        this.message = `You drop "${item}" on the ground in room ${this.room.number}.`;
      } else {
        this.message = `You can't drop "${item}". Room ${this.room.number} is full, it already contains ${MAX_ROOM_ITEMS} items!`;
      }
    } else if (this.hasPrincess()) {
      const wallOrientation = this.room.dropCharacter(this.character);
      if (wallOrientation !== "") {
        this.character = undefined;
        this.message = `You dropped ${CHARACTER_TYPES.princess} on wall ${wallOrientation} in room number ${this.room.number}!`;
      } else {
        this.message = `All the walls of room number ${this.room.number} are occupied by characters, you cannot drop "${item}"`;
      }
    } else {
      this.message = `You can't drop anything. You don't have item or character named "${item}"...`;
    }
  }

  look() {
    this.message = this.room.getFullDescription();
  }

  exit() {
    this.message = `Game ended by the player.`;
    this.end = true;
  }

  hasItem(name) {
    for (const item of this.items) {
      if (item.name === name.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  hasPrincess() {
    return this?.character.endGame;
  }

  getItem(name) {
    return this.items.find((item) => item.name === name);
  }

  removeItem(name) {
    this.items = this.items.filetr((item) => item.name !== name);
  }

  checkCommand(command) {
    const valid = !!PLAYER_COMMANDS[command.trim().toLowerCase()];
    this.message = !valid ? `Command ${command.toUpperCase()} not valid!` : "";
    return valid;
  }
}

export default Player;
