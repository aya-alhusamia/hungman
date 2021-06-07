import { useState, useEffect } from "react";
//Components
import Header from "./components/Header";
import Pictures from "./components/Pictures";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers";
//Style
import "./App.css";
const words = ["aya", "laila", "noodels", "pazzel"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((correctLetters) => [...correctLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);
  function playAgain() {
    setPlayable(true);
    // empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);
    const random = [Math.floor(Math.random() * words.length)];
    selectedWord = words[random];
  }
  return (
    <div>
      <Header />
      <div className="game-container">
        <Pictures wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        selectedWord={selectedWord}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
