import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import flashcards from '../data/flashcards';
import i18n from '../i18n/i18n';

function getRandomCards(cards, n) {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function getOptions(cards, correct, lang) {
  const options = [correct.translation[lang]];
  while (options.length < 4) {
    const random = cards[Math.floor(Math.random() * cards.length)].translation[lang];
    if (!options.includes(random)) options.push(random);
  }
  return options.sort(() => Math.random() - 0.5);
}

const getBestKey = (theme) => `best_score_${theme}`;

export default function ThemeQuizScreen({ route, navigation }) {
  const { theme } = route.params;
  const themeObj = flashcards.find(t => t.theme === theme);
  const lang = 'en';
  const questions = getRandomCards(themeObj.cards, Math.min(10, themeObj.cards.length));
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [best, setBest] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [step]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (step + 1) / questions.length,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [step, questions.length]);

  useEffect(() => {
    AsyncStorage.getItem(getBestKey(theme)).then(val => {
      if (val) setBest(Number(val));
    });
  }, []);

  const current = questions[step];
  const options = getOptions(themeObj.cards, current, lang);

  const handleAnswer = (opt) => {
    if (opt === current.translation[lang]) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const next = async () => {
    setFeedback(null);
    setStep(s => s + 1);
  };

  const tryAgain = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };

  useEffect(() => {
    if (step >= questions.length) {
      if (score > (best || 0)) {
        setBest(score);
        AsyncStorage.setItem(getBestKey(theme), String(score));
      }
    }
    // eslint-disable-next-line
  }, [step]);

  if (step >= questions.length) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Text style={styles.title}>{i18n.t('quiz_result') || 'Quiz result:'}</Text>
          <Text style={styles.score}>{score} / {questions.length}</Text>
          <Text style={styles.best}>{i18n.t('best_result') || 'Best:'} {best !== null ? best : score} / {questions.length}</Text>
        </Animated.View>
        <View style={styles.resultBtns}>
          <TouchableOpacity style={styles.actionBtn} onPress={tryAgain}>
            <Text style={styles.actionBtnText}>{i18n.t('try_again') || 'Try again'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.actionBtnText}>{i18n.t('back') || 'Back'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Прогресс-бар */}
      <View style={styles.progressBarBg}>
        <Animated.View style={[styles.progressBar, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        <Text style={styles.title}>{i18n.t('quiz_question') || 'Choose the correct translation:'}</Text>
        <Text style={styles.word}>{current.word}</Text>
        <View style={styles.optionsRow}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionBtn,
                feedback && opt === current.translation[lang] && feedback === 'correct' ? styles.correct :
                feedback && opt !== current.translation[lang] && feedback === 'wrong' && opt === current.translation[lang] ? styles.correct :
                feedback && opt !== current.translation[lang] && feedback === 'wrong' && opt !== current.translation[lang] ? styles.wrong : null,
                feedback && opt === current.translation[lang] && feedback === 'wrong' ? styles.correct : null,
                feedback && opt !== current.translation[lang] && feedback === 'correct' ? styles.optionBtn : null
              ]}
              onPress={() => handleAnswer(opt)}
              disabled={!!feedback}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {feedback === 'correct' && <Text style={styles.correctText}>{i18n.t('correct') || 'Correct!'}</Text>}
        {feedback === 'wrong' && <Text style={styles.wrongText}>{i18n.t('wrong') || 'Try again!'}</Text>}
        {feedback && <TouchableOpacity style={styles.actionBtn} onPress={next}><Text style={styles.actionBtnText}>{i18n.t('next') || 'Next'}</Text></TouchableOpacity>}
        <Text style={styles.progress}>{step + 1} / {questions.length}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  optionBtn: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    transition: 'background-color 0.2s',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correct: {
    backgroundColor: '#b6eeb6',
    borderColor: '#4caf50',
  },
  wrong: {
    backgroundColor: '#fbb',
    borderColor: '#e53935',
  },
  correctText: {
    color: 'green',
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
  wrongText: {
    color: 'red',
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#4caf50',
  },
  best: {
    fontSize: 18,
    color: '#888',
    marginBottom: 24,
  },
  progress: {
    marginTop: 16,
    color: '#888',
    textAlign: 'center',
  },
  resultBtns: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 16,
    elevation: 2,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
}); 