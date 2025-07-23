import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {
    alphabet: 'Alphabet',
    flashcards: 'Flashcards',
    stories: 'Stories',
    progress: 'Progress',
    profile: 'Profile',
  },
  ru: {
    alphabet: 'Алфавит',
    flashcards: 'Карточки',
    stories: 'Истории',
    progress: 'Прогресс',
    profile: 'Профиль',
  },
  es: {
    alphabet: 'Alfabeto',
    flashcards: 'Tarjetas',
    stories: 'Historias',
    progress: 'Progreso',
    profile: 'Perfil',
  },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n; 