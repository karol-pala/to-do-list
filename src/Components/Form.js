import React from "react";

function Form(props){
    return(
        <form onSubmit={props.onAddTask}>
            <label htmlFor="taskName">tytuł</label>
            <input type="text" name="taskName" onChange={props.onChangeTaskName}/>
            <label htmlFor="taskDesc">opis</label>
            <input type="text" name="taskDesc" onChange={props.onChangeTaskDesc}/>
            <label htmlFor="taskDate">data</label>
            <input 
                type="date" 
                name="taskDate" 
                onInput={props.onChangeTaskDate}
                defaultValue={props.state.taskDate}/>
            <button>dodaj</button>
        </form>
    )
}

export default Form