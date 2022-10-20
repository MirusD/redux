import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {initiateStore} from "./store/store";
import * as actions from "./store/actions"

const store = initiateStore()

const App = () => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => setState(store.getState()))
    }, [])

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId))
    }
    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChange(taskId))
    }
    const removeTask = (taskId) => {
        store.dispatch(actions.taskRemoved(taskId))
    }

    return <>
        <h1>App</h1>
        <ul>
            {state.length !== 0 ?
              state.map(({id, title, status, completed}) =>
                <li key={id}>
                <p>{title}</p>
                <p>{status}</p>
                <p>{`Completed: ${completed}`}</p>
                <button onClick={() => completeTask(id)}>Complete</button>
                <button onClick={() => changeTitle(id)}>Change title</button>
                <button onClick={() => removeTask(id)}>Remove</button>
                <hr/>
                </li>) : (<h2>Нет тасков</h2>)
            }
        </ul>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
