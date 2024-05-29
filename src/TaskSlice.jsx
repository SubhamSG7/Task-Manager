import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        pendingTasks: [],
        completedTasks: [],
    },
    reducers: {
        addPendingTask: (state, action) => {
            state.pendingTasks.push(action.payload);
        },
        completeTask: (state, action) => {
            const { id } = action.payload
            state.completedTasks.push(action.payload);
            state.pendingTasks = state.pendingTasks.filter(data => data.id !== id)
        },
        removeCompletedTask: (state, action) => {
            const { id } = action.payload;
            state.completedTasks = state.completedTasks.filter(data => data.id !== id)
        },
        moveToPending: (state, action) => {
            const { id } = action.payload;
            const taskToMove = state.completedTasks.find(task => task.id === id);
            state.pendingTasks.push(taskToMove);
            state.completedTasks = state.completedTasks.filter(task => task.id !== id);
        }
    }
});

export const { addPendingTask, completeTask, removeCompletedTask,moveToPending } = taskSlice.actions;
export default taskSlice.reducer;
