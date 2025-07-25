let alphabet = [
  {
    letter: 'Ա',
    transliteration: 'A',
    image: require('../../assets/images/a.png'),
    audio: require('../../assets/audio/a.mp3'),
    examples: ['Արարատ', 'Արմենիա'],
    frequency: 1,
    unlocked: true,
    exercises: [
      { type: 'association', completed: false },
      { type: 'audio_quiz', completed: false },
      { type: 'visual_quiz', completed: false }
    ]
  },
  {
    letter: 'Բ',
    transliteration: 'B',
    image: require('../../assets/images/b.png'),
    audio: require('../../assets/audio/b.mp3'),
    examples: ['Բարև', 'Բան'],
    frequency: 2,
    unlocked: false,
    exercises: [
      { type: 'association', completed: false },
      { type: 'audio_quiz', completed: false },
      { type: 'visual_quiz', completed: false }
    ]
  },
  {
    letter: 'Գ',
    transliteration: 'G',
    image: require('../../assets/images/g.png'),
    audio: require('../../assets/audio/g.mp3'),
    examples: ['Գինի', 'Գիրք'],
    frequency: 3,
    unlocked: false,
    exercises: [
      { type: 'association', completed: false },
      { type: 'audio_quiz', completed: false },
      { type: 'visual_quiz', completed: false }
    ]
  },
  // ... остальные буквы
];

export function completeExercise(letter, type) {
  const idx = alphabet.findIndex(l => l.letter === letter);
  if (idx === -1) return;
  const exIdx = alphabet[idx].exercises.findIndex(e => e.type === type);
  if (exIdx !== -1) alphabet[idx].exercises[exIdx].completed = true;
}

export function unlockNextLetter(letter) {
  const idx = alphabet.findIndex(l => l.letter === letter);
  if (idx === -1) return;
  // Если все упражнения выполнены, открываем следующую букву
  const allDone = alphabet[idx].exercises.every(e => e.completed);
  if (allDone && alphabet[idx + 1]) {
    alphabet[idx + 1].unlocked = true;
  }
}

export default alphabet; 