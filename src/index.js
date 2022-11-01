import "./assets/css/style.css";
import Game from "./controllers/game";

const title = document.createElement("h2");
title.textContent = "Zelda Game";

const page = document.querySelector("body");
page.append(title);

const game = new Game("Fede");

game.play();
