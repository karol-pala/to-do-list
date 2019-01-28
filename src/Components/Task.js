import React from "react"
import PropTypes from "prop-types"

function Task(props){
    return(
        <li className="task" id={props.taskKey}>
            <h1 className="task__title">{props.taskName}</h1>
            <h2 className="task__desc">{props.taskDesc}</h2>
            <h2 className="task__date">{props.taskDate}</h2>
            <button onClick={() => props.onMarkAsDone(props.i)}>zrobione</button>
            <button onClick={() => props.onDeleteTask(props.taskKey)}>usuń</button>
        </li>
    )
}

Task.propTypes = {
    taskName: PropTypes.string.isRequired,
    taskDesc: PropTypes.string.isRequired,
    taskDate: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
    taskKey: PropTypes.number.isRequired,
    onMarkAsDone: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
}

export default Task