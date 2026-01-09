const sounds = {
  reveal: new Audio(import.meta.env.BASE_URL + '/sounds/reveal.mp3'),
  hide: new Audio(import.meta.env.BASE_URL + '/sounds/hide.mp3'),
  correct: new Audio(import.meta.env.BASE_URL + '/sounds/correct.mp3'),
  wrong: new Audio(import.meta.env.BASE_URL + '/sounds/wrong.mp3'),
  success: new Audio(import.meta.env.BASE_URL + '/sounds/success.mp3'),
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