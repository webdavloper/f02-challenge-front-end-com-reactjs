import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/davidsilvasp",
      techs: [
        "Node.js",
        "Express.js"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const result = repositories.filter(repository => repository.id !== id);

    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) =>
          <li key={id}>
            <h3>{title}</h3>

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
