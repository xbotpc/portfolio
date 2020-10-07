import React, { Fragment, useRef, useState } from 'react';
import styles from '../../stylesheets/todo/todo.module.scss';
import cx from 'classnames';

type TodoProps = {
    id: string;
    todoText: string | number;
    isCompleted: boolean;
    onDelete: (id: string) => void
    onEdit: (id: string, text: string, action: 'Save' | 'Edit') => void
    onChange: (text: string, id: string) => void
    onTaskDone: (id: string) => void
}

const Todo = (props: TodoProps) => {
    const { id, todoText, isCompleted,
        onDelete, onEdit, onChange: onTextChange,
        onTaskDone
    } = props;

    const [text, setText] = useState<string>(todoText.toString());
    const [editMode, setEditMode] = useState<boolean>(false);
    const todoRef = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const value = todoRef.current.value;
        setText(value);
        onTextChange(value, id);
    }

    const onEditClick = () => {
        setEditMode(!editMode);
        onEdit(id, text, editMode ? 'Save' : 'Edit');
    }

    const onDeleteClick = () => {
        if (!editMode) {
            onDelete(id);
        }
        todoRef.current.value = todoText.toString();
        setEditMode(false);
    }

    const onTaskDoneClick = () => {
        onTaskDone(id);
    }

    return (
        <Fragment key={id}>
            <div className={cx(styles.todoContainer, { [styles.inCompleteShadow]: false })} id={id}>
                <input type="checkbox" name="checkbox" onClick={onTaskDoneClick} checked={isCompleted} />
                {!editMode
                    ?
                    <>
                        <div className={cx(styles.text, { [styles.strikeOut]: isCompleted })}>
                            {todoText}
                        </div>
                    </>
                    :
                    <>
                        <input
                            ref={todoRef}
                            className={cx(styles.text, { [styles.strikeOut]: isCompleted })}
                            autoFocus
                            onChange={onChange}
                            value={text}
                        />
                    </>
                }
                <>
                    <img
                        className={cx({ [styles.editIcon]: !editMode, [styles.greenTick]: editMode })}
                        alt={`${editMode ? 'check mark' : 'edit'}`}
                        onClick={onEditClick}
                    />
                    <img className={cx({ [styles.redCross]: editMode, [styles.deleteIcon]: !editMode })}
                        alt={`${editMode ? 'red cross' : 'delete'}`}
                        onClick={onDeleteClick}
                    />
                </>
            </div>
        </Fragment>
    )
}

export default React.memo(Todo, (prevProps, nextProps) => {
    // const { id: prevID, todoText: prevText, isCompleted: prevIsCompleted } = prevProps;
    // const { id: nextID, todoText: nextText, isCompleted: nextIsCompleted } = nextProps;
    // if (prevID === nextID && prevText === nextText && prevIsCompleted === nextIsCompleted) {
    //     return true;
    // }
    return false;
});
