import React, { Component } from 'react';
import { fetch_get } from './Fetch';
import { LOGIN } from './apiUrls'
import Context from '../Context';

class Signin extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      token: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  gotoDashboard() {
      window.location.href = '/dashboard';
  }

  handleChangeEmail(event) {
    this.setState({ username: event.target.value, error: '', errors: {} });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value, error: '', errors: {} });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
      let data = new FormData()
      data.append('username', username)
      data.append('password', password)
      
      fetch(LOGIN, {
        method: 'post',
        body: data
      })
      .then(response => 
        response.json())
      .then((response) => {
        if (!response.error) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);
          localStorage.setItem('username', response.username);
          window.location.href = '/dashboard';
        }
        else {
          this.setState({ errors: response.errors });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Something went wrong, Please try again' });
      });
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch_get('/api/user-details/')
      .then((response) => {
        if(response && response.user_details){
          this.setState({username: response.user_details.username})          
        }
      })
    }
    else {
      this.props.history.push('/')
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Username" value={this.state.email} onChange={this.handleChangeEmail} required/>
                    <p className='error-text'>{errors.username ? errors.username[0] : null}</p>
                  </div>
                  <div className="form-label-group">
                    <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} required />
                    <p className='error-text'>{errors.password ? errors.password[0] : null}</p>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleSubmit.bind(this)}>Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signin;
