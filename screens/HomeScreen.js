import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Currency Converter App!</Text>
      <Text style={styles.subHeader}>
        Here, you can:
        {"\n"}- View live currency exchange rates.
        {"\n"}- Convert currencies instantly.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007BFF' }]}
        onPress={() => navigation.navigate('ShowCurrency')}
      >
        <Text style={styles.buttonText}>View Live Rates</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28A745' }]}
        onPress={() => navigation.navigate('CurrencyConverter')}
      >
        <Text style={styles.buttonText}>Advanced Converter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20, // Adds rounded corners
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});