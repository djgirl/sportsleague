import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {fetch_get } from './Fetch';
import Context from '../Context';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Home from './Home';


export default class HomeComponent extends Component{
  static contextType = Context;
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      id: '',
      status: '',
      login: false,
    }
  }

  componentWillMount() {
    if(localStorage.getItem('token')) {
      fetch_get('/api/user-details/')
      .then((response) => {
        if(response && response.user_details){
          this.setState({username: response.user_details.username})          
        }
      })
    }
  }

  render() {
    return(
        <Context.Provider value={{
              id: this.state.id,
              username: this.state.username,
            }}>
          <Router>
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard}/>
                  <Route path="/" component={Home} />
                </Switch>
          </Router>
        </Context.Provider>
    );
  }
}

