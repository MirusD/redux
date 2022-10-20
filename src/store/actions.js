import * as actions from "./actionTypes"

export function taskCompleted(id) {
    return {
        type: actions.taskUpdated,
        payload: {id, completed: true}
    }
}

export function titleChange(id) {
    return {
        type: actions.taskUpdated,
        payload: {id, title: `New title for ${id}`}
    }
}

export function taskRemoved(id) {
    return {
        type: actions.taskRemoved,
        payload: {id}
    }
}
