import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Switch, Modal, Button } from "react-native";

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

export default function App() {
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetchTodos()
      .then(setTodos);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => alert('Hello World')}
        title="Add new todo item"
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return <TodoItem {...item} />
        }}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
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
