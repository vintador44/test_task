import React, { useState, useEffect } from 'react';
import HumanClass from './scripts/HumanClass';
import Tree from './scripts/Tree';
import Search from './scripts/Search';

function App() {
    const [tree, setTree] = useState(() => {
        const savedTree = localStorage.getItem('familyTree');
        return savedTree ? JSON.parse(savedTree) : new HumanClass('Иван', 'Иванов', 'М', '01.01.1980');
    });
    const handleTreeUpdate = (updatedTree) => {
        setTree(updatedTree);
      };

    useEffect(() => {
        localStorage.setItem('familyTree', JSON.stringify(tree));
    }, [tree]);

    const handleAddChild = (parent) => {
      if(parent.children.length<2) {
        const childName = prompt('Введите имя ребенка:');
        const childSurname = prompt('Введите фамилию ребенка:');
        const childGender = prompt('Введите пол ребенка (М/Ж):');
        const childBirthDate = prompt('Введите дату рождения ребенка:');

        if (childName && childSurname && childGender && childBirthDate) {
            const newChild = new HumanClass(childName, childSurname, childGender, childBirthDate);
            const updatedTree = deepCopyHuman(tree);
            const parentNode = findPersonInTree(updatedTree, parent.name);

            if (parentNode) {
                parentNode.addChild(newChild);
                setTree(updatedTree);
            }
        }
      }
    };

    const handleRemoveSelf = (person) => {
        const updatedTree = deepCopyHuman(tree);

        const removeFromTree = (human) => {
            human.children = human.children.filter(child => child.name !== person.name);
            human.children.forEach(removeFromTree);
        };

        removeFromTree(updatedTree);
        setTree(updatedTree);
    };

    const deepCopyHuman = (human) => {
        const newHuman = new HumanClass(human.name, human.surname, human.gender, human.birthDate);
        newHuman.children = human.children.map(deepCopyHuman);
        return newHuman;
    };
    
    const findPersonInTree = (human, name) => {
        if (human.name === name) return human;

        for (const child of human.children) {
            const found = findPersonInTree(child, name);
            if (found) return found;
        }

        return null;
    };

    return (
        <div className="App">
            <Search tree={tree} onTreeUpdate={handleTreeUpdate} />
            <div className="family-tree">
                <Tree
                    human={tree}
                    handleAddChild={handleAddChild}
                    handleRemoveSelf={handleRemoveSelf}
                />
            </div>
        </div>
    );
}

export default App;
