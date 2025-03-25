import React from 'react';

function Tree({ human, handleAddChild, handleRemoveSelf }) {
    return (
        <div className="tree-node">
            <div className="person-card">
                {human.surname} {human.name} ({human.gender}, {human.birthDate})
            </div>

            <div className="actions">
                <button onClick={() => handleAddChild(human)}>Добавить</button>
                <button onClick={() => handleRemoveSelf(human)}>Удалить</button>
            </div>

            {human.children.length > 0 && (
                <div className="children">
                    {human.children.map((child, index) => (
                        <Tree
                            key={index}
                            human={child}
                            handleAddChild={handleAddChild}
                            handleRemoveSelf={handleRemoveSelf}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tree;
