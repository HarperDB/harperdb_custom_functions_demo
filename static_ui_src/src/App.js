import { useEffect, useState } from 'react';

import './App.css';

const defaultDog = { dog_name: '', owner_name: '', weight_lbs: 0 };

function App() {
  const [dogs, setDogs] = useState([]);
  const [filter, setFilter] = useState('');
  const [newDog, setNewDog] = useState(defaultDog);
  const [newDogResponse, setNewDogResponse] = useState('');

  const addDog = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:9926/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operation: 'insert',
        schema: 'dev',
        table: 'dog',
        records: [newDog]
      })
    });

    const result = await response.json();
    setNewDogResponse(result.message);
    setNewDog(defaultDog);
  }

  useEffect(() => {
    const getDogs = async() => {
      const response = await fetch(filter.length ? `http://localhost:9926/dogs/${filter}` : `http://localhost:9926/dogs`)
      const newDogs = await response.json();
      setDogs(newDogs);
    }

    getDogs();
  }, [filter, newDogResponse]);

  return (
    <div className="App">
      <table className="column">
        <thead>
          <tr>
            <th>Dog Name</th>
            <th>Dog Owner</th>
            <th>Dog Weight</th>
          </tr>
        </thead>
        <tbody>
        {dogs.length ? dogs.map((dog) => (
          <tr key={dog.id}>
            <td>{dog.dog_name}</td>
            <td>{dog.owner_name}</td>
            <td>{dog.weight_lbs}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan="3">No Dogs Found</td>
          </tr>
        )}
        </tbody>
      </table>
      <div className="column">
        <form>
          Filter Dogs: <input type="text" onChange={(e) => setFilter(e.currentTarget.value)} value={filter} />
        </form>
        <br />
        <hr />
        <br />
        <form>
          <table>
            <thead>
              <tr>
                <th>Dog Name</th>
                <th>Dog Owner</th>
                <th>Dog Weight</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="text" onChange={(e) => setNewDog({ ...newDog, dog_name: e.currentTarget.value })} value={newDog.dog_name} />
              </td>
              <td>
                <input type="text" onChange={(e) => setNewDog({ ...newDog, owner_name: e.currentTarget.value })} value={newDog.owner_name} />
              </td>
              <td>
                <input type="number" onChange={(e) => setNewDog({ ...newDog, weight_lbs: e.currentTarget.value })} value={newDog.weight_lbs} />
              </td>
              <td>
                <button onClick={addDog}>Add Dog</button>
              </td>
            </tr>
            </tbody>
          </table>
          <br />
          {newDogResponse}
        </form>
      </div>
    </div>
  );
}

export default App;
