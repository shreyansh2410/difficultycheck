import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionScreen from './components/SelectionScreen';
import QuestionScreen from './components/QuestionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectionScreen">
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{ title: 'Select Quiz' }} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ title: 'Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
