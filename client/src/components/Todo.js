import React, { useEffect, useRef, useState } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);
  function handleSubmit(e) {
      e.preventDefault();
      props.editTask(name, props.id);
      setName("");
      setEditing(false);
  }
  function handleChange(e) {
      setName(e.target.value)
  }
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
         id={props.id}
         className="todo-text"
         type="text"
         ref={editFieldRef}
         onChange={handleChange}
         value={name}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" ref={editButtonRef} onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);  
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}