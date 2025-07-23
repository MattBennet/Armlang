import React from 'react';
import { View, Text } from 'react-native';
import i18n from '../i18n/i18n';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{i18n.t('profile')}</Text>
    </View>
  );
} 