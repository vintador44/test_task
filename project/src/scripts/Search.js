
import React, { useState } from 'react';

function Search({ tree, onTreeUpdate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [editingHuman, setEditingHuman] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', surname: '' });

  const findHumans = (human, searchTerm, foundHumans = []) => {
    if (
      human.name.toLowerCase().includes(searchTerm) ||
      human.surname.toLowerCase().includes(searchTerm)
    ) {
      foundHumans.push(human);
    }
    for (const child of human.children) {
      findHumans(child, searchTerm, foundHumans);
    }
    return foundHumans;
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const foundHumans = findHumans(tree, trimmedSearchTerm);
    setResults(foundHumans);
    setEditingHuman(null); 
  };

  const startEditing = (human) => {
    setEditingHuman(human);
    setEditForm({
      name: human.name,
      surname: human.surname

    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = () => {
    if (editingHuman) {
      editingHuman.name = editForm.name;
      editingHuman.surname = editForm.surname;
      if (onTreeUpdate) {
        onTreeUpdate({...tree}); 
      }
      setResults(results.map(human => 
        human === editingHuman ? {...human, name: editForm.name, surname: editForm.surname} : human
      ));
      
      setEditingHuman(null);
    }
  };

  const cancelEditing = () => {
    setEditingHuman(null);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск по имени или фамилии"
        />
        <button onClick={handleSearch}>Найти</button>
      </div>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((human, index) => (
            <div key={index} className="person-card">
              {editingHuman === human ? (
                <div>
                  <input
                    name="surname"
                    value={editForm.surname}
                    onChange={handleEditChange}
                    placeholder="Фамилия"
                  />
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Имя"
                  />
                  <button onClick={saveChanges}>Сохранить</button>
                  <button onClick={cancelEditing}>Отмена</button>
                </div>
              ) : (
                <div>
                  {human.surname} {human.name}
                  <button id='change' onClick={() => startEditing(human)}>
                    изменить
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='no-results'>Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}

export default Search;