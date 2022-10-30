import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from "./store/store"
import {
    completeTask,
    titleChange,
    taskDeleted,
    getTasks,
    loadTasks,
    getTaskLoadingStatus,
    createTask } from "./store/task"
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore()

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTaskLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState("")

    useEffect(() => {
        dispatch(loadTasks())
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <p>{error}</p>
    }

    return <>
        <h1>App</h1>
        <input
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
        />
        <button onClick={() => dispatch(createTask(newTitle))}>Create task</button>
        <ul>
            {state.length !== 0 ?
              state.map(({id, title, status, completed}) =>
                <li key={id}>
                <p>{title}</p>
                <p>{status}</p>
                <p>{`Completed: ${completed}`}</p>
                <button onClick={() => dispatch(completeTask(id))}>Complete</button>
                <button onClick={() => dispatch(titleChange(id))}>Change title</button>
                <button onClick={() => dispatch(taskDeleted(id))}>Remove</button>
                <hr/>
                </li>) : (<h2>Нет тасков</h2>)
            }
        </ul>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
)
