import React, { useState, useEffect } from "react";
import './index.css';

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : ['Add New Tasks'];
    });
    
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(t => [...t, newTask]);
            setNewTask('');
        }
    }

    function removeTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const uT = [...tasks];
            [uT[index], uT[index - 1]] = [uT[index - 1], uT[index]];
            setTasks(uT);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const uT = [...tasks];
            [uT[index], uT[index + 1]] = [uT[index + 1], uT[index]];
            setTasks(uT);
        }
    }

    return (
        <div className="to-do-window">
        <header className="app-header">
            <div className="status-bar">
                <span>System Active</span>
            </div>
            <h1>To Do Application</h1>
            <p>Add your tasks!</p>
        </header>

        <div className="input-group">
            <input 
                type="text" 
                placeholder="Identify a new objective..." 
                value={newTask} 
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="addBtn" onClick={addTask}>
                Add
            </button>
        </div>

        <ol className="task-list">
            {tasks.map((task, index) => (
                <li key={index} className="task-item">
                    <div className="task-content">
                        <span className="task-number">0{index + 1}</span>
                        <span className="task-text">{task}</span>
                    </div>
                    <div className="btns">
                        <button className="move" onClick={() => moveTaskUp(index)} title="Move Up">↑</button>
                        <button className="move" onClick={() => moveTaskDown(index)} title="Move Down">↓</button>
                        <button className="delete" onClick={() => removeTask(index)} title="Archive">✕</button>
                    </div>
                </li>
            ))}
        </ol>
    </div>
    );
}

export default ToDoList;