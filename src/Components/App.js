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
        //getting list from localStorage
        const list = localStorage.getItem("list");
        
        console.log("Lista: ");
        console.log(list);
        //if list in localStorage exist, parse it and assign to this.state.list
        if(list){
            //parsing list; in localStorage data is saved as string, we need to parse it back to array
            let parsedList = JSON.parse(list);
            //list - stores list of tasks
            //taskName, taskDesc, taskDate - temporary variables, used to make a task
            //taskKey - also used to adding, deleting, marking
            this.state = {
                list: parsedList,
                taskName: null,
                taskDesc: null,
                taskDate: null,
                taskKey: null
            } 
        } else {
            if(localStorage.getItem("list")){
                localStorage.removeItem("list");
            }
            this.state = {
                list: [],
                taskName: null,
                taskDesc: null,
                taskDate: null,
                taskKey: null
            };
        }
        console.log(this.state)
        //binding function to constructor
        //functions doesn`t work properly if they`re  not binded, because at render function starts after constructor
        //and it`s trying to use functions which are not loaded yet and that makes errors
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDesc = this.onChangeTaskDesc.bind(this);
        this.onChangeTaskDate = this.onChangeTaskDate.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onMarkAsDone = this.onMarkAsDone.bind(this);
    }

    //lifecycle method
    //setting "list" to LocalStorage
    componentDidUpdate(){
        let list = [];
        list = this.state.list;
        //converting array to string to safe it in local storage
        //in local storage we can save only strings
        list = JSON.stringify(list);
        console.log("Lista przed localStorage");
        console.log(list);
      
            localStorage.setItem("list", list); 
       
        
    }

    //getting values from form inputs

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
    //Adding tasks
    onAddTask = (e) => {
        //stop execute event
        e.preventDefault();
        console.log("state: ")
        console.log(this.state);
        this.setState(state => {
            let task = null;
            let list;
            //if variable "taskName" (title of task, taken from textarea in form),
            // isn`t null, values from form are assigned to task
            if(this.state.taskName !== null){
                task = {
                    taskName: this.state.taskName,
                    taskDesc: this.state.taskDesc,
                    taskDate: this.state.taskDate,
                    taskKey: Date.now(),
                    taskDone: false
                }
            }
            //if "task" isn`t null, "task" is added to array "list",
            if(task !== null){
                list = state.list.concat(task);
                console.log(list);
            } else {
                list = state.list;
            }
            
            //returning list, and empty variables to state
            return {
                list: list,
                taskName: null,
                taskDesc: null,
                taskDate: null,
                taskKey: null,
            }
        })
        console.log("state: ")
        console.log(this.state);
    }

    //deleting tasks, state.list is filtered, if "key" doesn`t equal "taskKey", "item" is deleted from array
    // function returns array without deleted item
    onDeleteTask(key){
        console.log(key)
        this.setState(state => {
            const list = state.list.filter(item => item.taskKey !== key);
            return {
                list,
            }
        })
    }


    //select task, which is done, change it`s flag to true
    onMarkAsDone(key){
        console.log(key);
        //state.list is mapped, if key is equal to variable "j" (which represents index in array "list"),
        //taskDone value is set to true (only if it wasn`t true before), otherwise function returns not changed "item"

        this.setState(state => {
            const list = state.list.map((item, j) => {
                if(key === j){
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
            <div className="app">
                <h1 className="title">to do list</h1>
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