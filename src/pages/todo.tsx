import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import SingleTodo from '../components/todo/todo';
import styles from '../stylesheets/todo/todo.module.css';

interface TodoData {
    id: string;
    text: string;
    isDeleted: boolean;
    isCompleted: boolean;
}

const Todo = () => {

    const [toDoData, setToDoData] = useState<Array<TodoData>>([{
        id: '1',
        text: 'Here2',
        isDeleted: false,
        isCompleted: false,
    },
    {
        id: '2',
        text: 'Here3',
        isDeleted: false,
        isCompleted: false,
    },
    {
        id: '3',
        text: 'Here4',
        isDeleted: false,
        isCompleted: false,
    },
    {
        id: '4',
        text: 'Here 5',
        isDeleted: false,
        isCompleted: true,
    },]);
    const [todoCount, setTodoCount] = useState<number>(0);

    const addNewTodoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const count = toDoData.filter((x) => !x.isCompleted && !x.isDeleted).length;
        setTodoCount(count);
    }, [toDoData]);


    const onTodoEditClick = (id: string, text: string, action: string): void => {
        if (action === 'Save') {
            const todoCopy = [...toDoData];
            const index = todoCopy.findIndex(x => x.id === id);
            todoCopy.splice(index, 1, {
                ...todoCopy[index],
                text
            });
            setToDoData(todoCopy);
        }
    }

    const onTodoDeleteClick = (id: string): void => {
        const todoCopy = [...toDoData];
        const index = todoCopy.findIndex(x => x.id === id);
        todoCopy.splice(index, 1, {
            ...todoCopy[index],
            isDeleted: true
        });
        setToDoData(todoCopy);
    }

    const onTodoChange = (text, id) => {
        const todoCopy = [...toDoData];
        const index = todoCopy.findIndex(x => x.id === id);
        todoCopy.splice(index, 1, {
            ...todoCopy[index],
            text
        });
        setToDoData(todoCopy);
    }

    const onTaskDone = (id) => {
        const todoCopy = [...toDoData];
        const index = todoCopy.findIndex(x => x.id === id);
        const currentTaskStatus = todoCopy[index].isCompleted;
        const doneTask = todoCopy[index];
        todoCopy.splice(index, 1);
        if (currentTaskStatus) {
            const taskCompleteIndex = todoCopy.findIndex(x => x.isCompleted);
            todoCopy.splice(taskCompleteIndex, 0, {
                ...doneTask,
                isCompleted: !doneTask.isCompleted,
            });
        } else {
            todoCopy.push({
                ...doneTask,
                isCompleted: !doneTask.isCompleted,
            })
        }
        setToDoData(todoCopy);
    }

    const onNewTodoEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        const text = addNewTodoRef.current.value;
        import('../utils/isEmpty').then(isEmpty => {
            if (e.key === 'Enter' && !isEmpty.default(text)) {
                const todoCopy = [...toDoData];
                todoCopy.unshift({
                    id: `${parseInt(toDoData.sort((a, b) => parseInt(a.id) - parseInt(b.id))[toDoData.length - 1].id, 10) + 1}`,
                    text,
                    isCompleted: false,
                    isDeleted: false,
                });
                setToDoData(todoCopy);
                addNewTodoRef.current.value = '';
            }
        })
    }

    const renderTodoList = (): Array<JSX.Element> => {
        return toDoData.map(({ id, text, isCompleted, isDeleted }) => {
            if (!isDeleted) {
                return <SingleTodo
                    id={id}
                    todoText={text}
                    isCompleted={isCompleted}
                    onEdit={onTodoEditClick}
                    onDelete={onTodoDeleteClick}
                    onChange={onTodoChange}
                    onTaskDone={onTaskDone}
                />
            }
            return null;
        });
    }

    return (
        <>
            <div className={styles.todoBoxContainer}>
                <input
                    ref={addNewTodoRef}
                    className={styles.searchBox}
                    type="text"
                    name="add new task"
                    placeholder={'Enter new task'}
                    onKeyPress={onNewTodoEnterKeyPress}
                />
                <div className={styles.todoCount}>{`${todoCount} Tasks`}</div>
                <div className={styles.todoListContainer}>
                    {renderTodoList()}
                </div>
            </div>
        </>
    )
}

export default Todo
