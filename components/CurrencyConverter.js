import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => setCurrencyList(Object.keys(data.rates)))
      .catch(() => Alert.alert('Error', 'Failed to fetch currency data'));
  }, []);

  const convertCurrency = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
      })
      .catch(() => Alert.alert('Error', 'Conversion failed'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
        style={styles.picker}
      >
        {currencyList.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
        style={styles.picker}
      >
        {currencyList.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={convertCurrency}
      >
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {convertedAmount && (
        <Text style={styles.result}>
          Converted Amount: {convertedAmount} {toCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded corners
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CurrencyConverter;