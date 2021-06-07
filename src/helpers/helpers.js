export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkin(correct, wrong, word) {
  let status = "win";
  console.log("word", word, correct);
  // check for wins
  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });

  //check for lose
  if (wrong.length === 6) status = "lose";

  return status;
}
