import React, { Component } from 'react';
import { DOMAIN_NAME } from './apiUrls'
import Context from '../Context';
import { Link } from 'react-router-dom';


export default class LeftMenu extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      selectedNav: window.location.pathname.split('/')[2],
      role: '',
      isNewBundle: false
    };
    this.isActive = this.isActive.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClick(value) {
    this.setState({ selectedNav: value });
    this.props.history.push(`/${value}/`);
  }

  isActive(value) {
    return 'nav-link ' + ((value === this.state.selectedNav) ? ' active' : '');
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/signin');
  }

  handleChange = (selectedMenuName) => {
    if(selectedMenuName){
      this.setState({ selectedNav : selectedMenuName.value});
      this.onClick(selectedMenuName.value);
    }
  }

  render() {
    const { selectedNav } = this.state;

    return (
    
<nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul className="nav navbar-nav">
      <li><Link to="/teams/list">Team</Link></li>
      <li><Link to="/players/list">Player</Link></li>
      <li><Link to="/matches/list">Match</Link></li>
      <li><Link to="/points-table/list">Points Table</Link></li>
    </ul>
  </div>
</nav>
    );
  }
}
