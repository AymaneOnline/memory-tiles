const sounds = {
  reveal: new Audio('/sounds/reveal.mp3'),
  hide: new Audio('/sounds/hide.mp3'),
  correct: new Audio('/sounds/correct.mp3'),
  wrong: new Audio('/sounds/wrong.mp3'),
  success: new Audio('/sounds/success.mp3'),
}

Object.values(sounds).forEach(sound => {
  sound.volume = 0.5
})

export function playSound(soundName) {
  const sound = sounds[soundName];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play();
}