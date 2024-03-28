/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

type Age = {
  years: number | string;
  months: number | string;
  days: number | string;
};

function calculateAge(birthDate: string): Age {
  const today = new Date();
  const birth = new Date(birthDate);

  let ageYears = today.getFullYear() - birth.getFullYear();
  let ageMonths = today.getMonth() - birth.getMonth();
  let ageDays = today.getDate() - birth.getDate();

  if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birth.getDate())) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageMonths--;
    ageDays += prevMonthLastDay;
  }

  if (isNaN(ageYears) || isNaN(ageMonths) || isNaN(ageDays)) {
    return { years: '--', months: '--', days: '--' };
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState<Age>({ years: 0, months: 0, days: 0 });

  const isDarkMode = useColorScheme() === 'dark';

  const calculateAndSetAge = () => {
    const birthDate = `${year}-${month}-${day}`;
    const calculatedAge = calculateAge(birthDate);
    setAge(calculatedAge);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={{
            margin: 10,
            borderRadius: 5,
          }}>
            <View style={styles.data}>
              <View style={styles.item}>
                <Text style={styles.text}>Day</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Day"
                  onChangeText={text => setDay(text)}
                  defaultValue={day}
                />
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Month</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  onChangeText={text => setMonth(text)}
                  defaultValue={month}
                />
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Year</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  onChangeText={text => setYear(text)}
                  defaultValue={year}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={calculateAndSetAge} title="Calculate Age" />
            </View>
            <View style={styles.results}>
              <Text style={styles.text}>
                {age.years} years
              </Text>
              <Text style={styles.text}>
                {age.months} months
              </Text>
              <Text style={styles.text}>
                {age.days} days
              </Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  input: {
    height: 40,
    width: 100,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;
