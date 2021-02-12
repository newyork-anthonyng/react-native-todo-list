import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Switch, Button, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*
 * {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
   },
*/
function fetchTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
}

function TodoItem({ title, completed }) {
  return (
    <View>
      <Text>{title}</Text>
      <Switch value={completed} />
    </View>
  );
}

function TodosScreen({ navigation }) {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos()
      .then(setTodos);
  }, []);

  function handleNewTodoEdit(text) {
    setNewTodo(text);
  }

  function handleNewTodoSubmit() {
    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };

    const newTodos = [...todos];
    newTodos.unshift(todo);
    setTodos(newTodos);
    setNewTodo('');
  }

  return (
    <View style={styles.container}>
      <Button
        title="Go home"
        onPress={navigation.goBack}
      />
      <TextInput
        onChangeText={handleNewTodoEdit}
        value={newTodo}
      />
      <Button
        onPress={handleNewTodoSubmit}
        title="Add new todo item"
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return <TodoItem {...item} />
        }}
        keyExtractor={item => item.id}
        extraData={todos}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Hello, welcome to the app!</Text>
      <Button
        title="Go to todos"
        onPress={() => navigation.navigate('Todos')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todos" component={TodosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
