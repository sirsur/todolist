import React, { useState, useEffect } from 'react';
import type { RootState } from '../store/store';
import type { Task } from '../features/tasks/tasksSlice';
import {
    add,
    remove,
    removeAll,
    back,
    done,
    undone,
} from '../features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    BsTrash,
    BsX,
    BsCheck,
    BsArrowReturnLeft,
    BsBoxArrowLeft,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const [activeTab, setActiveTab] = useState<number>(2);
    const [inputValue, setInputValue] = useState<string>('');

    const [undoneTasks, setUndoneTasks] = useState<Task[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const handleAdd = () => {
        dispatch(add(inputValue));
        setInputValue('');
    };

    useEffect(() => {
        setUndoneTasks(tasks.filter((task) => !task.done && !task.deleted));
        setAllTasks(tasks.filter((task) => !task.deleted));
        setDoneTasks(tasks.filter((task) => task.done && !task.deleted));
        setDeletedTasks(tasks.filter((task) => task.deleted));
    }, [tasks]);

    useEffect(() => {
        switch (activeTab) {
            case 1:
                setFilteredTasks(undoneTasks);
                break;
            case 2:
                setFilteredTasks(allTasks);
                break;
            case 3:
                setFilteredTasks(doneTasks);
                break;
            case 4:
                setFilteredTasks(deletedTasks);
                break;
        }
    }, [activeTab, undoneTasks, allTasks, doneTasks, deletedTasks]);

    const renderTasks = () => {
        return filteredTasks.map((task) => (
            <div className='taskDiv' key={task.id}>
                <p>{task.title}</p>
                <div>
                    {task.done ? (
                        <button onClick={() => dispatch(undone(task.id))}>
                            <BsX size={'2rem'} />
                        </button>
                    ) : (
                        <button onClick={() => dispatch(done(task.id))}>
                            <BsCheck size={'2rem'} />
                        </button>
                    )}
                    {task.deleted ? (
                        <button onClick={() => dispatch(back(task.id))}>
                            <BsArrowReturnLeft size={'2rem'} />
                        </button>
                    ) : (
                        <button onClick={() => dispatch(remove(task.id))}>
                            <BsTrash size={'2rem'} />
                        </button>
                    )}
                </div>
            </div>
        ));
    };

    return (
        <>
            <header>
                <button className='logOutButton' onClick={() => navigate('/')}>
                    <BsBoxArrowLeft size={'2rem'} />
                    <p style={{ fontSize: '1rem' }}>log out</p>
                </button>
            </header>
            <section className='addRemoveTaskSection'>
                <div className='addDiv'>
                    <input
                        type='text'
                        placeholder='add task to list'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className='addButton' onClick={() => handleAdd()}>
                        + add
                    </button>
                </div>
                <button
                    className='removeButton'
                    onClick={() => dispatch(removeAll())}
                >
                    clear all
                </button>
            </section>
            <section className='tasksSection'>
                <div className='tasksTypesDiv'>
                    <button onClick={() => setActiveTab(1)}>
                        current tasks ({undoneTasks.length})
                    </button>
                    <button onClick={() => setActiveTab(2)}>
                        all tasks ({allTasks.length})
                    </button>
                    <button onClick={() => setActiveTab(3)}>
                        completed tasks ({doneTasks.length})
                    </button>
                    <button onClick={() => setActiveTab(4)}>
                        bin ({deletedTasks.length})
                    </button>
                </div>
                <div>{renderTasks()}</div>
            </section>
        </>
    );
};

export default List;
