import React, {Component} from "react";
import Form from "./Form";
import List from "./List";

const INITIAL_LIST = [
    {
        taskName: "tytuł",
        taskDesc: "opis",
        taskDate: "2019-01-01",
        taskKey: Date.now(),
        taskDone: false
    }
]


class App extends Component{
    constructor(){
        super();
        const list = localStorage.getItem("list");
        
        if(list){
            this.state = {
                list: list,
                taskName: "",
                taskDesc: "",
                taskDate: "",
                taskKey: ""
            } 
        } else {
            this.state = {
                list: INITIAL_LIST,
                taskName: "",
                taskDesc: "",
                taskDate: "",
                taskKey: ""
            };
        }
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDesc = this.onChangeTaskDesc.bind(this);
        this.onChangeTaskDate = this.onChangeTaskDate.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onMarkAsDone = this.onMarkAsDone.bind(this);
    }

    onChangeTaskName = (e) => {
        e.preventDefault();
        this.setState({
            taskName: e.target.value
        })
    }

    onChangeTaskDesc = (e) => {
        e.preventDefault();
        this.setState({
            taskDesc: e.target.value
        })
    }

    onChangeTaskDate = (e) => {
        e.preventDefault();
        this.setState({
            taskDate: e.target.value
        })
    }

    onAddTask = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState(state => {
            let task = null;
            let list;
            if(this.state.taskName !== ""){
                task = {
                    taskName: this.state.taskName,
                    taskDesc: this.state.taskDesc,
                    taskDate: this.state.taskDate,
                    taskKey: Date.now(),
                    taskDone: false
                }
            }
            if(task !== null){
                list = state.list.concat(task);
                console.log(list);
            } else {
                list = state.list;
            }
            
            //localStorage.setItem("list", list);
            return {
                list,
                taskName: "",
                taskDesc: "",
                taskDate: "",
                taskKey: "",
            }
        })
    }

    onDeleteTask(key){
        console.log(key)
        this.setState(state => {
            const list = state.list.filter(item => item.taskKey !== key);
            return {
                list
            }
        })
    }

    onMarkAsDone(key){
        console.log(key);
        this.setState(state => {
            const list = state.list.map((item, j) => {
                if(key === j){
                    console.log(key + " " + j);
                    if(item.taskDone === false){
                        return item = {
                            ...item,
                            taskDone: true
                        }
                    } else {
                        return item
                    }
                    
                } else {
                    console.log(key + " " + item.taskKey);
                    return item
                }
            })
            return{
                list,
            }
        })
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <Form 
                    state={this.state} 
                    onChangeTaskDate={this.onChangeTaskDate}
                    onChangeTaskDesc={this.onChangeTaskDesc}
                    onChangeTaskName={this.onChangeTaskName}
                    onAddTask={this.onAddTask}/>
                <List state={this.state} onDeleteTask={this.onDeleteTask} onMarkAsDone={this.onMarkAsDone}/>
            </div>
        )
    }
}

export default App