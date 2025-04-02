import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ShowCurrency() {
  const [currencyData, setCurrencyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        setCurrencyData(Object.entries(data.rates)); // Convert to array of [key, value] pairs
        setCurrencyList(Object.keys(data.rates));
      })
      .catch(() => Alert.alert('Error', 'Failed to fetch currency data'));
  }, []);

  const convertCurrency = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
      })
      .catch(() => Alert.alert('Error', 'Failed to convert currency'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Rates</Text>

      {/* Exchange Currency Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007BFF' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Exchange Currency</Text>
      </TouchableOpacity>

      {/* Modal for Currency Exchange */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Exchange Currency</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={amount}
              onChangeText={(value) => setAmount(value)}
            />

            <Text>From:</Text>
            <Picker
              selectedValue={fromCurrency}
              onValueChange={(itemValue) => setFromCurrency(itemValue)}
              style={styles.picker}
            >
              {currencyList.map((currency) => (
                <Picker.Item key={currency} label={currency} value={currency} />
              ))}
            </Picker>

            <Text>To:</Text>
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
              style={[styles.button, { backgroundColor: '#28A745', marginBottom: 10 }]}
              onPress={convertCurrency}
            >
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>

            {convertedAmount && (
              <Text style={styles.result}>
                Converted Amount: {convertedAmount} {toCurrency}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#DC3545' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Currency List */}
      <FlatList
        data={currencyData}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.currencyName}>{item[0]}</Text>
            <Text style={styles.currencyRate}>{item[1]}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  currencyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyRate: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  picker: {
    marginBottom: 10,
    width: '100%',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded corners for buttons
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});