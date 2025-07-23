import React from 'react';
import { View, Text } from 'react-native';
import i18n from '../i18n/i18n';

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{i18n.t('progress')}</Text>
    </View>
  );
} 