import { createSlice } from '@reduxjs/toolkit';

export interface Task {
    id: number,
    title: string;
    done: boolean;
    deleted: boolean;
}

export interface TasksState {
    tasks: Task[];
};

const initialState: TasksState = {
    tasks: localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks')!) : []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        add: (state, action) => {
            const newTask: Task = {
                id: state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 0,
                title: action.payload,
                done: false,
                deleted: false
            }
            const newTasks = [...state.tasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return { ...state, tasks: newTasks };
        },
        remove: (state, action) => {
            const updatedTasks = [...state.tasks];
            updatedTasks[action.payload] = { ...updatedTasks[action.payload], deleted: true };
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { ...state, tasks: updatedTasks };
        },
        removeAll: (state) => {
            const updatedTasks = state.tasks.map(task => ({
                ...task,
                deleted: true
            }));
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { ...state, tasks: updatedTasks };
        },
        done: (state, action) => {
            const updatedTasks = [...state.tasks];
            updatedTasks[action.payload] = { ...updatedTasks[action.payload], done: true };
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { ...state, tasks: updatedTasks };
        },
        undone: (state, action) => {
            const updatedTasks = [...state.tasks];
            updatedTasks[action.payload] = { ...updatedTasks[action.payload], done: false };
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { ...state, tasks: updatedTasks };
        },
        back: (state, action) => {
            const updatedTasks = [...state.tasks];
            updatedTasks[action.payload] = { ...updatedTasks[action.payload], deleted: false };
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { ...state, tasks: updatedTasks };
        }
    },
});

export const { add, remove, removeAll, done, undone, back } = tasksSlice.actions;

export default tasksSlice.reducer;
