import React, {Component} from "react";

class App extends Component{
    constructor(){
        super();
        const lastValue = localStorage.getItem("lastValue");
        const cachedHits = localStorage.getItem(lastValue);
        if(lastValue){
            this.state = {
                hits: JSON.parse(cachedHits)
            }
        } else {
            this.state = {
                hits: null
            }
        }
        
    }

    onSearch = (e) => {
        e.preventDefault();
        const {value} = this.input;
        localStorage.setItem("lastValue", value);
        if(value === ''){
            return;
        }
        const cachedHits = localStorage.getItem(value);
        if (cachedHits) {
            this.setState({hits: JSON.parse(cachedHits)});
            return;
        }
        fetch("https://hn.algolia.com/api/v1/search?query=" + value)
        .then(response => response.json())
        .then(result => this.onSetResult(result, value));
    }
    onSetResult = (result, taskKey) =>{
        localStorage.setItem(taskKey, JSON.stringify(result.hits));
        this.setState({hits: result.hits});
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSearch}>
                <input type="text" ref={node => this.input = node}/>
                <button type="submit">Submit</button>
                </form>
                {
                    this.state.hits &&
                    this.state.hits.map(item => <div taskKey={item.objectID}>{item.title}</div>)
                }
            </div>
        )
    }
}

export default App