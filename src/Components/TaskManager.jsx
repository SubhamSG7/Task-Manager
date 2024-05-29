import React from 'react';
import PendingTasks from './PendingTasks';
import CompletedTasks from './CompletedTask';

const TaskManager = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center">Task Manager</h1>
            <div className="row">
                <div className="col-md-6">
                    <PendingTasks />
                </div>
                <div className="col-md-6">
                    <CompletedTasks />
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
