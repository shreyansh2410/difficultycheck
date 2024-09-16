import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SelectionScreen() {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Mock data for demonstration purposes
  const subjects = ['Math', 'Science', 'History'];
  const chapters = ['Chapter 1', 'Chapter 2', 'Chapter 3'];
  const topics = ['Topic A', 'Topic B', 'Topic C'];
  const difficulties = ['easy', 'medium', 'hard'];

  const startQuiz = () => {
    const numberOfQuestions = {
      easy: 10,
      medium: 20,
      hard: 30,
    }[selectedDifficulty];

    navigation.navigate('QuestionScreen', {
      difficulty: selectedDifficulty,
      topic: selectedTopic,
      subject: selectedSubject,
      numberOfQuestions,
    });
  };

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
      <Text style={styles.heading}>Select Quiz Options</Text>

      {/* Select Subject */}
      <Text style={styles.label}>Select Subject</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(value) => {
            setSelectedSubject(value);
            setSelectedChapter(null); // Reset chapters
            setSelectedTopic(null); // Reset topics
            setSelectedDifficulty(null); // Reset difficulty
          }}
        >
          <Picker.Item label="Select Subject" value={null} />
          {subjects.map((subject) => (
            <Picker.Item label={subject} value={subject} key={subject} />
          ))}
        </Picker>
      </View>

      {/* Select Chapter - only show if subject is selected */}
      {selectedSubject && (
        <>
          <Text style={styles.label}>Select Chapter</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedChapter}
              onValueChange={(value) => {
                setSelectedChapter(value);
                setSelectedTopic(null); // Reset topics
                setSelectedDifficulty(null); // Reset difficulty
              }}
            >
              <Picker.Item label="Select Chapter" value={null} />
              {chapters.map((chapter) => (
                <Picker.Item label={chapter} value={chapter} key={chapter} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Select Topic - only show if chapter is selected */}
      {selectedChapter && (
        <>
          <Text style={styles.label}>Select Topic</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTopic}
              onValueChange={(value) => {
                setSelectedTopic(value);
                setSelectedDifficulty(null); // Reset difficulty
              }}
            >
              <Picker.Item label="Select Topic" value={null} />
              {topics.map((topic) => (
                <Picker.Item label={topic} value={topic} key={topic} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Select Difficulty - only show if topic is selected */}
      {selectedTopic && (
        <>
          <Text style={styles.label}>Select Difficulty</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <Picker.Item label="Select Difficulty" value={null} />
              {difficulties.map((difficulty) => (
                <Picker.Item label={difficulty} value={difficulty} key={difficulty} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Start Quiz Button - only show if difficulty is selected */}
      {selectedDifficulty && (
        <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 28,
    color: '#4b0082',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#4b0082',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4b0082',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
