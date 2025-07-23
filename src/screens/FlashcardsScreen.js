import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import flashcards from '../data/flashcards';
import i18n from '../i18n/i18n';

export default function FlashcardsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, paddingTop: 32 }}>
      <Text style={styles.title}>{i18n.t('choose_theme') || 'Choose a theme:'}</Text>
      <FlatList
        data={flashcards}
        keyExtractor={item => item.theme}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.themeBtn} onPress={() => navigation.navigate('ThemeFlashcards', { theme: item.theme })}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.themeText}>{item.theme}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  themeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    resizeMode: 'contain',
  },
  themeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 