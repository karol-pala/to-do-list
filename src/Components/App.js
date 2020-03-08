import React, {Component} from "react";
import Form from "./Form";
import List from "./List";
import { connect } from "react-redux";
import {getList, makeList, getTaskName, getTaskDescription, getTaskDate} from "../actions"


class App extends Component{

    componentDidMount(){
        const list = localStorage.getItem("list");
        if(list){
            let parsedList = JSON.parse(list);
            this.props.getList(parsedList);
        } else {
            if(localStorage.getItem("list")){
                localStorage.removeItem("list");
            }
            this.props.makeList();
        }
    }

    componentDidUpdate(){
        let list = [];
        list = this.props.list;
        list = JSON.stringify(list);
        localStorage.setItem("list", list);
    }

    onChangeTaskName = (e) => {
        e.preventDefault();
        this.props.getTaskName(e.target.value)
    }

    onChangeTaskDesc = (e) => {
        e.preventDefault();
        this.props.getTaskDescription(e.target.value)
    }

    onChangeTaskDate = (e) => {
        e.preventDefault();
        this.props.getTaskDate(e.target.value)
    }
    

    //przebudowac pod redux
    onAddTask = (e) => {
        //stop execute event
        e.preventDefault();
        let task;
        let list = this.props.list;
        
        this.setState(state => {
            let task = null;
            let list;
            //if variable "taskName" (title of task, taken from textarea in form),
            // isn`t null, values from form are assigned to task
            if(this.props.taskName !== null){
                task = {
                    taskName: this.props.taskName,
                    taskDesc: this.props.taskDesc,
                    taskDate: this.props.taskDate,
                    taskKey: Date.now(),
                    taskDone: false
                }
            }
            //if "task" isn`t null, "task" is added to array "list",
            if(task !== null){
                list = this.props.list.concat(task);
                console.log(list);
            } else {
                list = state.list;
            }
            
            //returning list, and empty variables to state
            //changing formSubmited to true
            return {
                list: list,
                taskName: null,
                taskDesc: null,
                taskDate: null,
                taskKey: null,
                formSubmited: true
            }
        })
    }

    //deleting tasks, state.list is filtered, if "key" doesn`t equal "taskKey", "item" is deleted from array
    // function returns array without deleted item
    onDeleteTask(key){
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
                        item = {
                            ...item,
                            taskDone: true
                        }
                        //changing background of li tag
                        let li = document.getElementById(item.taskKey);
                        li.style.background = "red"
                        return item;
                    } else {
                        return item
                    }
                    
                } else {
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
                    state={this.props} 
                    onChangeTaskDate={this.onChangeTaskDate}
                    onChangeTaskDesc={this.onChangeTaskDesc}
                    onChangeTaskName={this.onChangeTaskName}
                    onAddTask={this.onAddTask}/>
                <List state={this.props} onDeleteTask={this.onDeleteTask} onMarkAsDone={this.onMarkAsDone}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
        task: state.task
    }
}

const mapDispatchToProps = {
    getList,
    makeList,
    getTaskName,
    getTaskDescription,
    getTaskDate
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);