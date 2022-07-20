export enum HeadingVariant {
  title = "title",
  subtitle = "subtitle",
}

export enum GameState {
  notStart = "notStart",
  start = "start",
  end = "end",
  reset = "reset",
}

export enum GameMessages {
  bestScore = "GAME FINISHED! Congrats You have a high score!",
  wrongKey = "Oops You press the wrong key, added 0.5s ",
  gameEnd = "GAME FINISHED!",
}
