const flashcards = [
  {
    theme: 'Food',
    icon: require('../../assets/images/food.png'),
    cards: [
      {
        word: 'հաց',
        translation: { en: 'bread', ru: 'хлеб' },
        transcription: 'hats',
        audio: require('../assets/audio/hats.mp3'),
        image: require('../assets/images/bread.png'),
      },
      {
        word: 'պանիր',
        translation: { en: 'cheese', ru: 'сыр' },
        transcription: 'panir',
        audio: require('../assets/audio/panir.mp3'),
        image: require('../assets/images/cheese.png'),
      },
    ],
  },
  {
    theme: 'Travel',
    icon: require('../assets/images/travel.png'),
    cards: [
      {
        word: 'ավիաուղի',
        translation: { en: 'airline', ru: 'авиалиния' },
        transcription: 'aviaughi',
        audio: require('../assets/audio/aviaughi.mp3'),
        image: require('../assets/images/airline.png'),
      },
      {
        word: 'քարտեզ',
        translation: { en: 'map', ru: 'карта' },
        transcription: 'k’artez',
        audio: require('../assets/audio/kartez.mp3'),
        image: require('../assets/images/map.png'),
      },
    ],
  },
  // ... другие темы
];

export default flashcards; 