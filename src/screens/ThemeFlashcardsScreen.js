import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Button, Animated, Easing } from 'react-native';
import * as Speech from 'expo-speech';
import flashcards from '../data/flashcards';
import i18n from '../i18n/i18n';

export default function ThemeFlashcardsScreen({ route, navigation }) {
  const { theme } = route.params;
  const themeObj = flashcards.find(t => t.theme === theme);
  const [index, setIndex] = useState(0);
  const card = themeObj.cards[index];

  // Анимация
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [direction, setDirection] = useState(0); // -1: влево, 1: вправо

  const animateCard = (dir, nextIndex) => {
    setDirection(dir);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: dir * 40,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ]).start(() => {
      setIndex(nextIndex);
      slideAnim.setValue(-dir * 40);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        })
      ]).start();
    });
  };

  const playSound = () => {
    Speech.speak(card.word, { language: 'hy-AM' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.themeTitle}>{themeObj.theme}</Text>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Image source={card.image} style={styles.image} />
        <Text style={styles.word}>{card.word}</Text>
        <Text style={styles.transcription}>[{card.transcription}]</Text>
        <Text style={styles.translation}>{card.translation.en} / {card.translation.ru}</Text>
        <Button title={i18n.t('listen') || 'Listen'} onPress={playSound} />
      </Animated.View>
      <View style={styles.navRow}>
        <Button
          title="←"
          onPress={() => animateCard(-1, Math.max(0, index - 1))}
          disabled={index === 0}
        />
        <Text>{index + 1} / {themeObj.cards.length}</Text>
        <Button
          title="→"
          onPress={() => animateCard(1, Math.min(themeObj.cards.length - 1, index + 1))}
          disabled={index === themeObj.cards.length - 1}
        />
      </View>
      <Button title={i18n.t('quiz') || 'Quiz'} onPress={() => navigation.navigate('ThemeQuiz', { theme })} style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  themeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    width: 300,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transcription: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
  },
  translation: {
    fontSize: 20,
    marginBottom: 12,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
}); 