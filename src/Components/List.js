import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";

function List(props){
    return(
        <ul className="list">
            {props.state.list && props.state.list.map((item, i) => <Task  taskName={item.taskName} 
                                                                            taskDesc={item.taskDesc}
                                                                            taskDate={item.taskDate}
                                                                            taskKey={item.taskKey}
                                                                            onDeleteTask={props.onDeleteTask}
                                                                            onMarkAsDone={props.onMarkAsDone}
                                                                            i={i}
                                                                            key={i}/>)}
        </ul>
        
    )
}

List.propTypes = {
    list: PropTypes.array,
    taskName: PropTypes.string,
    taskDesc: PropTypes.string,
    taskDate: PropTypes.string,
    onDeleteTask: PropTypes.func,
    onMarkAsDone: PropTypes.func
}

export default List