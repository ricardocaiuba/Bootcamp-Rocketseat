import React, { Fragment, useState, useEffect } from "react";

import api from "./services/api";

import "./App.css";
import Header from "./components/Header";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject() {
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const newProject = {
      title: `Projeto: ${Date.now()}`,
      owner: "Ricardo Rodrigues dos Santos",
    };
    const res = await api.post("projects", newProject);

    const project = res.data;
    setProjects([...projects, project]);
  }

  return (
    <Fragment>
      <Header title="Homepage" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </Fragment>
  );
};

export default App;
