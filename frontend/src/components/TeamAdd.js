import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get, fetch_post } from './Fetch';
import Context from '../Context';
import { TEAMS } from './apiUrls';
import { Pagination } from './Pagination';


class TeamAdd extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      club_state: '',
      error: '',
      isEdit: this.props.match.params.id ? true : false,
      selectedTeamId: this.props.match.params.id,
    };

    this.teamAdd = this.teamAdd.bind(this);
    this.fetchTeam = this.fetchTeam.bind(this);

  }

  componentDidMount() {
    if(this.state.selectedTeamId){
      this.fetchTeam(this.state.selectedTeamId);    
    }

  }


  fetchTeam() {

    fetch_get(TEAMS + 'view/' + this.state.selectedTeamId + '/')
    .then((response) => {
      console.log(response, "***************")
        if (response.error) {
          this.setState({error: response.errors})
      }else{
        this.setState({name: response.team.name, club_state: response.team.club_state})

      }
    })
    .catch((error) => {
      console.log(error, "error")
      this.setState({ error: 'Something went wrong, Please try again' });
    });
  }

  teamAdd() {
    let data = new FormData()
    data.append('name', this.state.name)
    data.append('club_state', this.state.club_state ? this.state.club_state : '')
          
    
    if(this.state.isEdit){
      fetch_post(TEAMS + 'edit/' + this.state.selectedTeamId + '/', data)
        .then((response) => {
            if (response.error) {
              this.setState({error: response.errors, trials_errors: response.trials_errors})
          }else{
              alert("Team Edited Successfully !!!")
             this.props.history.push('/teams/list') 

          }
        })
        .catch((error) => {
          console.log(error, "error")
          this.setState({ error: 'Something went wrong, Please try again' });
        });
    }
    else{
      fetch_post(TEAMS + 'add/', data)
      .then((response) => {
        console.log(response, "***************")
          if (response.error) {
            this.setState({error: response.errors, trials_errors: response.trials_errors})
        }else{
            alert("Team Added Successfully !!!")
           this.props.history.push('/teams/list') 

        }
      })
      .catch((error) => {
        console.log(error, "error")
        this.setState({ error: 'Something went wrong, Please try again' });
      });
    }
  }


  render() {
    const { permissions, role} = this.context;
    const { moleculeList, num_pages } = this.state;
    console.log(moleculeList, "*******", this.state)
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5>{ this.state.isEdit ? 'Edit Team' : 'Add Team'}</h5>
                  </div>
                  <div className="card-block">
                    <form>
                      
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name<span className="required">*</span></label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" placeholder="Enter Name" name="name"  onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name}/>
                          <div className="error-text">
                            {this.state.error.name ? this.state.error.name : null}
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Club State</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" placeholder="Enter Club State" name="club_state"  onChange={(e) => this.setState({ club_state: e.target.value })} value={this.state.club_state}/>
                          <div className="error-text">
                            {this.state.error.club_state ? this.state.error.club_state : null}
                          </div>
                        </div>
                      </div>
                      
                        
                    </form>
                  </div>
                </div>
                <div className="card">
                  
                  <div className="card-block">

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                      <Link className="btn btn-primary btn-round" onClick={this.teamAdd.bind(this)}>{ this.state.isEdit ? 'Update' : 'Add'}</Link> 
                      <Link className="btn btn-danger btn-round cancel" to={'/teams/list'}>Cancel</Link>
                   </div>
                   </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TeamAdd;