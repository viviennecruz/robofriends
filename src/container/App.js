import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import CardList from "../components/CardList";
// import {robots} from "./robots";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";


class App extends React.Component{ //parent component
    constructor(){
        super();
        this.state = { //has two states, app owns the state so any method that uses states must use class syntx
            robots: [], //states is what changes in the app
            searchField : ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users").then(response =>{
            return response.json();
        }).then(users => {
            this.setState({robots: users});
        })
    }

    onSearchChange = (event) => { //use this syntax when making ur own methods
        // console.log(event.target.value);
        this.setState({searchField: event.target.value});
    }

  render() {
      const filteredRobots = this.state.robots.filter((robots) => {
          return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      })
      if (this.state.robots.length === 0){
          return <h1 className="tc">Loading</h1>
      }else{
          return(
              <div className="tc">
                  <h1 className="f1">RoboFriends</h1>
                  <SearchBox searchChange = {this.onSearchChange}/>
                  <Scroll>
                      <CardList robots = {filteredRobots}/>
                  </Scroll>

              </div>
          );
      }

  }
}

export default App;
