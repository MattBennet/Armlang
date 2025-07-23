import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import alphabet from '../data/alphabet';
import i18n from '../i18n/i18n';

export default function AlphabetScreen({ navigation }) {
  const unlockedLetters = alphabet.filter(l => l.unlocked);
  const [selected, setSelected] = useState(unlockedLetters[0]);

  const playSound = () => {
    Speech.speak(selected.letter, { language: 'hy-AM' });
  };

  return (
    <View style={{ flex: 1, paddingTop: 32 }}>
      <FlatList
        data={unlockedLetters}
        horizontal
        keyExtractor={item => item.letter}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} style={styles.letterBtn}>
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        )}
        style={{ maxHeight: 80 }}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.card}>
        <Text style={styles.bigLetter}>{selected.letter}</Text>
        <Text style={styles.translit}>{selected.transliteration}</Text>
        <Image source={selected.image} style={styles.image} />
        <Button title={i18n.t('listen') || 'Listen'} onPress={playSound} />
        <Text style={styles.examplesTitle}>{i18n.t('examples') || 'Examples'}:</Text>
        {selected.examples.map((ex, idx) => (
          <Text key={idx} style={styles.example}>{ex}</Text>
        ))}
        <Button
          title={i18n.t('start_exercises') || 'Start Exercises'}
          onPress={() => navigation.navigate('Exercise', { letter: selected.letter })}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  letterBtn: {
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  letter: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    elevation: 2,
  },
  bigLetter: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  translit: {
    fontSize: 24,
    color: '#888',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  examplesTitle: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  example: {
    fontSize: 18,
    marginTop: 4,
  },
}); 