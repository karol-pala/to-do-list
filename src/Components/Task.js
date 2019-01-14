import React from "react"

function Task(props){
    return(
        <div>
            <h1>{props.taskName}</h1>
            <h2>{props.taskDesc}</h2>
            <h2>{props.taskDate}</h2>
            <button onClick={() => props.onMarkAsDone(props.i)}>zrobione</button>
            <button onClick={() => props.onDeleteTask(props.taskKey)}>usuń</button>
        </div>
    )
}

export default Task