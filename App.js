import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from './src/i18n/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import FlashcardsScreen from './src/screens/FlashcardsScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={i18n.t('alphabet')} component={AppNavigator} />
        <Tab.Screen name={i18n.t('flashcards')} component={FlashcardsScreen} />
        <Tab.Screen name={i18n.t('stories')} component={StoriesScreen} />
        <Tab.Screen name={i18n.t('progress')} component={ProgressScreen} />
        <Tab.Screen name={i18n.t('profile')} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 