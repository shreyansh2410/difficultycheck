// QuestionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'demo-api-key-shreyanshBHAi69'; 

// questions using the API 
const fetchQuestions = (topic, difficulty, numberOfQuestions) =>
  fetch(`https://api.example.com/questions?topic=${topic}&difficulty=${difficulty}&limit=${numberOfQuestions}&api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) =>
      data.map((item, index) => ({
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
      }))
    );

export default function QuestionScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { difficulty, topic, subject, numberOfQuestions } = route.params;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions(topic, difficulty, numberOfQuestions).then(setQuestions);
  }, [topic, difficulty, numberOfQuestions]);

  const handleOptionPress = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert('Quiz Completed', `Your final score is ${score + 1}/${questions.length}`);
      navigation.navigate('SelectionScreen');
    }
  };

  if (!questions.length) {
    return (
      <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
        <Text style={styles.heading}>Loading Questions...</Text>
      </LinearGradient>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
      <Text style={styles.heading}>{subject}: {currentQuestion.question}</Text>
      <Text style={styles.progress}>Question {currentQuestionIndex + 1} of {questions.length}</Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#4b0082',
    textAlign: 'center',
    marginBottom: 20,
  },
  progress: {
    fontSize: 18,
    color: '#4b0082',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4b0082',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  optionButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
