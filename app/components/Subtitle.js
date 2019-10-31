import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Subtitle({title}) {
    return (
        <View style={styles.headercontainer}>
            <Text style={styles.subtitletext}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    subtitletext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3f4e66',
        marginTop:20,
    }
  });
  