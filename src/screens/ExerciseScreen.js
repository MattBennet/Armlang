import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech';
import alphabet, { completeExercise, unlockNextLetter } from '../data/alphabet';
import i18n from '../i18n/i18n';

function getRandomOptions(correctLetter) {
  const options = [correctLetter];
  while (options.length < 4) {
    const random = alphabet[Math.floor(Math.random() * alphabet.length)].letter;
    if (!options.includes(random)) options.push(random);
  }
  return options.sort(() => Math.random() - 0.5);
}

function getRandomImages(correctImage) {
  const images = [correctImage];
  while (images.length < 4) {
    const random = alphabet[Math.floor(Math.random() * alphabet.length)].image;
    if (!images.includes(random)) images.push(random);
  }
  return images.sort(() => Math.random() - 0.5);
}

export default function ExerciseScreen({ route, navigation }) {
  const { letter } = route.params;
  const letterObj = alphabet.find(l => l.letter === letter);
  const [step, setStep] = useState(0); // 0: audio_quiz, 1: association, 2: visual_quiz
  const [feedback, setFeedback] = useState(null);
  const [options, setOptions] = useState(getRandomOptions(letterObj.letter));
  const [completed, setCompleted] = useState(false);
  const [imageOptions, setImageOptions] = useState(getRandomImages(letterObj.image));
  const [visualOptions, setVisualOptions] = useState(getRandomOptions(letterObj.letter));

  const handleAudioQuiz = (selected) => {
    if (selected === letterObj.letter) {
      setFeedback('correct');
      setCompleted(true);
      completeExercise(letterObj.letter, 'audio_quiz');
    } else {
      setFeedback('wrong');
    }
  };

  const handleAssociation = (selected) => {
    if (selected === letterObj.image) {
      setFeedback('correct');
      setCompleted(true);
      completeExercise(letterObj.letter, 'association');
    } else {
      setFeedback('wrong');
    }
  };

  const handleVisualQuiz = (selected) => {
    if (selected === letterObj.letter) {
      setFeedback('correct');
      setCompleted(true);
      completeExercise(letterObj.letter, 'visual_quiz');
    } else {
      setFeedback('wrong');
    }
  };

  const nextExercise = () => {
    setFeedback(null);
    setCompleted(false);
    setStep(step + 1);
  };

  const finishAll = () => {
    unlockNextLetter(letterObj.letter);
    navigation.goBack();
  };

  // audio_quiz
  if (step === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('audio_quiz_title') || 'Which letter do you hear?'}</Text>
        <Button title={i18n.t('play_sound') || 'Play Sound'} onPress={() => Speech.speak(letterObj.letter, { language: 'hy-AM' })} />
        <View style={styles.optionsRow}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, feedback && opt === letterObj.letter && feedback === 'correct' ? styles.correct : feedback && opt !== letterObj.letter && feedback === 'wrong' ? styles.wrong : null]}
              onPress={() => handleAudioQuiz(opt)}
              disabled={!!feedback}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {feedback === 'correct' && <Text style={styles.correctText}>{i18n.t('correct') || 'Correct!'}</Text>}
        {feedback === 'wrong' && <Text style={styles.wrongText}>{i18n.t('wrong') || 'Try again!'}</Text>}
        {completed && <Button title={i18n.t('next') || 'Next'} onPress={nextExercise} />}
      </View>
    );
  }
  // association
  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('association_title') || 'Which image matches the letter?'}</Text>
        <Text style={styles.bigLetter}>{letterObj.letter}</Text>
        <View style={styles.optionsRow}>
          {imageOptions.map((img, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.imageBtn, feedback && img === letterObj.image && feedback === 'correct' ? styles.correct : feedback && img !== letterObj.image && feedback === 'wrong' ? styles.wrong : null]}
              onPress={() => handleAssociation(img)}
              disabled={!!feedback}
            >
              <Image source={img} style={styles.quizImage} />
            </TouchableOpacity>
          ))}
        </View>
        {feedback === 'correct' && <Text style={styles.correctText}>{i18n.t('correct') || 'Correct!'}</Text>}
        {feedback === 'wrong' && <Text style={styles.wrongText}>{i18n.t('wrong') || 'Try again!'}</Text>}
        {completed && <Button title={i18n.t('next') || 'Next'} onPress={nextExercise} />}
      </View>
    );
  }
  // visual_quiz
  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('visual_quiz_title') || 'Which letter matches the image?'}</Text>
        <Image source={letterObj.image} style={styles.quizImage} />
        <View style={styles.optionsRow}>
          {visualOptions.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, feedback && opt === letterObj.letter && feedback === 'correct' ? styles.correct : feedback && opt !== letterObj.letter && feedback === 'wrong' ? styles.wrong : null]}
              onPress={() => handleVisualQuiz(opt)}
              disabled={!!feedback}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {feedback === 'correct' && <Text style={styles.correctText}>{i18n.t('correct') || 'Correct!'}</Text>}
        {feedback === 'wrong' && <Text style={styles.wrongText}>{i18n.t('wrong') || 'Try again!'}</Text>}
        {completed && <Button title={i18n.t('finish') || 'Finish'} onPress={finishAll} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  optionsRow: {
    flexDirection: 'row',
    marginVertical: 32,
  },
  optionBtn: {
    backgroundColor: '#eee',
    padding: 18,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  optionText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  imageBtn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  quizImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  bigLetter: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correct: {
    backgroundColor: '#b6eeb6',
  },
  wrong: {
    backgroundColor: '#fbb',
  },
  correctText: {
    color: 'green',
    fontSize: 20,
    marginTop: 16,
  },
  wrongText: {
    color: 'red',
    fontSize: 20,
    marginTop: 16,
  },
}); 