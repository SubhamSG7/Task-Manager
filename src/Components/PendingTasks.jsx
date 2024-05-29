import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPendingTask, completeTask } from '../TaskSlice';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const PendingTasks = () => {
    const pendingTasks = useSelector(state => state.tasks.pendingTasks);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [selectedPendingTasks, setSelectedPendingTasks] = useState([]);
    const [selectAllPending, setSelectAllPending] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPendingTasks, setFilteredPendingTasks] = useState(pendingTasks);

    useEffect(() => {
        setFilteredPendingTasks(pendingTasks.filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [pendingTasks, searchQuery]);

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addPendingTask({ text: text, id: Date.now() }));
            setText('');
        }
    };
    /// function to move selected task to pending sections
    const moveSelectedToCompleted = () => {
        selectedPendingTasks.forEach(task => {
            dispatch(completeTask(task));
        });
        setSelectedPendingTasks([]);
    };
    // checking my 
    const handlePendingCheckboxChange = (task) => {
        if (selectedPendingTasks.includes(task)) {
            setSelectedPendingTasks(selectedPendingTasks.filter(selectedTask => selectedTask.id !== task.id));
        } else {
            setSelectedPendingTasks([...selectedPendingTasks, task]);
        }
    };
    //// to check weather my task all are selected or not
    const handleSelectAllPendingChange = () => {
        if (selectAllPending) {
            setSelectedPendingTasks([]);
        } else {
            setSelectedPendingTasks(pendingTasks);
        }
        setSelectAllPending(!selectAllPending);
    };
    /// searching for pending tasks through iterating through pending task array
    const handleSearch = () => {
        setFilteredPendingTasks(pendingTasks.filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase())));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Pending Tasks</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAdd}>Add Task</button>
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Pending Tasks"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
            </div>
            <button className="btn btn-success mb-3" onClick={moveSelectedToCompleted}>Move Selected To Completed</button>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectAllPending}
                    onChange={handleSelectAllPendingChange}
                />
                <label className="form-check-label">Select All</label>
            </div>
            <ul className="list-group">
                {filteredPendingTasks && filteredPendingTasks.map((task) => (
                    <li key={task.id} className="list-group-item">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={selectedPendingTasks.includes(task)}
                            onChange={() => handlePendingCheckboxChange(task)}
                        />
                        {task.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingTasks;
