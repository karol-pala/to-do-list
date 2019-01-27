import React from "react"

function Task(props){
    return(
        <li className="task">
            <h1 className="task__title">{props.taskName}</h1>
            <h2 className="task__desc">{props.taskDesc}</h2>
            <h2 className="task__date">{props.taskDate}</h2>
            <button onClick={() => props.onMarkAsDone(props.i)}>zrobione</button>
            <button onClick={() => props.onDeleteTask(props.taskKey)}>usuń</button>
        </li>
    )
}

export default Task