export const convertMSFormate = (ms: number) => {
  const mSec = ms % 100;
  const sec = Math.floor(ms / 100) % 60;
  const min = Math.floor(ms / (100 * 60));
  return `${min > 0 ? min + "m:" : ""}${
    sec < 10 ? "0" + sec + "s:" : sec + "s:"
  }${mSec > 9 ? mSec : "0" + mSec} `;
};

const lettersWithKeyCode: any = {};
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < letters.length; i++) {
  lettersWithKeyCode[letters[i]] = letters[i].charCodeAt(0);
}
export { lettersWithKeyCode };
export const getRandomAlphabets = () => {
  return { letter: letters.charAt(Math.floor(Math.random() * letters.length)) };
};
