import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get } from './Fetch';
import Context from '../Context';

class Dashboard extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
        username: ''
    };
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch_get('/api/user-details/')
      .then((response) => {
        this.setState({username: response.user_details.email})
      })
    }
    else {
      this.props.history.push('/')
    }
  }

logout() {
    localStorage.clear();
      window.location.href = '/';

  }


  render() {
    const {username} = this.state;
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                      <div className="card-body">
                            <h5 className="card-title text-center">{username}</h5>
                            <Link onClick={this.logout.bind(this)} className="text-center">
                               <i className="ti-layout-sidebar-left"></i> Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
  }
}
export default Dashboard;
