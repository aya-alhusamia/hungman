import { useEffect } from "react";
import { checkin } from "../helpers/helpers";
import win from "../audio/win.mp3";
import loser from "../audio/loser.mp3";
import { Howl, Howler } from "howler";
const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;
  let sound = win;
  const SondPlay = (src) => {
    const s = new Howl({ src });
    s.play();
  };

  if (checkin(correctLetters, wrongLetters, selectedWord) === "win") {
    console.log("helooo");
    finalMessage = "Congratulations! You won! 😃";
    sound = win;
    playable = false;
  } else if (checkin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately you lost. 😕";
    finalMessageRevealWord = `... the word was ${selectedWord}`;
    playable = false;
    sound = loser;
  }

  useEffect(() => setPlayable(playable));
  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain} onMouseOver={() => SondPlay(sound)}>
          Play Again
        </button>
      </div>
    </div>
  );
};
export default Popup;
