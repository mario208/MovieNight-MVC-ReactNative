import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.getStartedContainer}>
      <Text style={styles.getStartedText}>
        Open up the code for this screen:
      </Text>

      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
        <Text style={styles.codeHighlightText}>{path}</Text>
      </View>

      <Text style={styles.getStartedText}>
        Change any of the text, save the file, and your app will automatically update.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // خفيف ليناسب Dark Mode
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#E0E0E0', // لون نص فاتح
  },
  codeHighlightText: {
    color: '#FF4400', // لون النيون البرتقالي الخاص بمشروعك
    fontFamily: 'monospace',
  },
});