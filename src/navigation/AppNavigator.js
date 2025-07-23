import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlphabetScreen from '../screens/AlphabetScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import ThemeFlashcardsScreen from '../screens/ThemeFlashcardsScreen';
import ThemeQuizScreen from '../screens/ThemeQuizScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Alphabet" component={AlphabetScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
      <Stack.Screen name="ThemeFlashcards" component={ThemeFlashcardsScreen} />
      <Stack.Screen name="ThemeQuiz" component={ThemeQuizScreen} />
    </Stack.Navigator>
  );
} 