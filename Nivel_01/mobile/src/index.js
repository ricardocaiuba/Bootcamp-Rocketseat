import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      console.log(res.data);
      setProjects(res.data);
    });
  }, []);

  const handleAddProject = async () => {
    const res = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Ricardo Rodrigues dos Santos",
    });
    const project = res.data;
    setProjects([...projects, project]);
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={handleAddProject}
      >
        <Text style={styles.buttonText}>Adicionar Projetos</Text>
      </TouchableOpacity>
      {/*
        <Text style={styles.footer}>Developed by: Ricardo Rodrigues</Text>
      */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  project: {
    color: "#fff",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
