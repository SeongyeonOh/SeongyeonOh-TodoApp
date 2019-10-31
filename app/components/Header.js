import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headercontainer}>
            <Text style={styles.headertext}>MyToDoApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headercontainercontainer: {
      marginTop: 50,
      marginBottom:50,
    },
    headertext: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3f4e66',
    }
  });
  