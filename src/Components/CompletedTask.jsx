import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCompletedTask, moveToPending } from '../TaskSlice';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const CompletedTasks = () => {
    const completedTasks = useSelector(state => state.tasks.completedTasks);
    const dispatch = useDispatch();
    const [selectedCompletedTasks, setSelectedCompletedTasks] = useState([]);
    const [selectAllCompleted, setSelectAllCompleted] = useState(false);

    const deleteCompleted = () => {
        if (selectedCompletedTasks.length === completedTasks.length) {
            // Ask for confirmation twice if all tasks are selected
            if (window.confirm("Are you sure you want to delete all tasks?")) {
                if (window.confirm("Are you absolutely sure you want to delete all tasks? This action cannot be undone.")) {
                    selectedCompletedTasks.forEach(task => {
                        dispatch(removeCompletedTask(task));
                    });
                    setSelectedCompletedTasks([]);
                }
            }
        } else {
            // Ask for confirmation once if not all tasks are selected
            if (window.confirm("Are you sure you want to delete the selected tasks?")) {
                selectedCompletedTasks.forEach(task => {
                    dispatch(removeCompletedTask(task));
                });
                setSelectedCompletedTasks([]);
            }
        }
    };

    const moveSelectedToPending = () => {
        selectedCompletedTasks.forEach(task => {
            dispatch(moveToPending(task));
        });
        setSelectedCompletedTasks([]);
    };

    const handleCompletedCheckboxChange = (task) => {
        if (selectedCompletedTasks.includes(task)) {
            setSelectedCompletedTasks(selectedCompletedTasks.filter(selectedTask => selectedTask.id !== task.id));
        } else {
            setSelectedCompletedTasks([...selectedCompletedTasks, task]);
        }
    };

    const handleSelectAllCompletedChange = () => {
        if (selectAllCompleted) {
            setSelectedCompletedTasks([]);
        } else {
            setSelectedCompletedTasks(completedTasks);
        }
        setSelectAllCompleted(!selectAllCompleted);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Completed Tasks</h2>
            <button className="btn btn-danger mb-3" onClick={deleteCompleted}>
                {selectAllCompleted ? "Delete All Tasks" : "Delete Selected Tasks"}
            </button>
            <button className="btn btn-warning mb-3 ms-2" onClick={moveSelectedToPending}>Move Selected To Pending</button>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectAllCompleted}
                    onChange={handleSelectAllCompletedChange}
                />
                <label className="form-check-label">Select All</label>
            </div>
            <ul className="list-group">
                {completedTasks && completedTasks.map((task) => (
                    <li key={task.id} className="list-group-item">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={selectedCompletedTasks.includes(task)}
                            onChange={() => handleCompletedCheckboxChange(task)}
                        />
                        {task.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTasks;
