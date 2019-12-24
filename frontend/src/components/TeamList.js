import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get, fetch_post  } from './Fetch';
import Context from '../Context';
import { TEAMS } from './apiUrls';
import { Pagination } from './Pagination';
import { Modal } from './Modal';


class TeamList extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      teamList: [],
      currentPageData: [],
      currentPage: '',
      num_pages: '',
      prev_page: '',
      selectedreportheaderId: '',
      displayDeleteModal: false,
    };

    this.fetchteamsList = this.fetchteamsList.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);

  }

  componentDidMount() {
    this.fetchteamsList();

  }

  handleDeleteTeam() {
    fetch_post(TEAMS + 'view/' + this.state.selectedreportheaderId + '/', true)
    .then((response) => {
        this.setState({ displayDeleteModal: false })
        alert('Team Deleted Successfully');
        this.fetchteamsList();
    });
  }

  fetchteamsList() {
    fetch_get(TEAMS + 'list/')
    .then((response) => {
      console.log(response, "***************")
        if (response.team_list) {
        this.setState({ 
            teamList: response.team_list,
            currentPageData: response.team_list,
            currentPage: response.team_list.number,
            num_pages: response.team_list.num_pages,
            prev_page: response.team_list.previous_page_number,
        });
      }
    })
    .catch((error) => {
      this.setState({ error: 'Something went wrong, Please try again' });
    });
  }

  getCurrentPage(currentPage=this.state.currentPage) {
    this.setState({currentPage}, this.handlePaginate)
  }

  handlePaginate(){
    const data = new FormData();
  }


  render() {
    const { permissions, role} = this.context;
    const { teamList, num_pages } = this.state;
    console.log(teamList, "*******")
    return (
      <div className="container-fluid">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="add-button"><Link to={'/team/add'} className="btn btn-primary btn-round">Add Team</Link></div>

            <div className="card">
              <div className="card-header">
                <h5>Team List</h5>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                     {teamList && teamList.length > 0 &&
                          teamList.map((team,index) =>

                      <tr>
                        <td>{team.name}</td>
                        <td><Link className="btn btn-primary btn-round" to={'/team/edit/' + team.id}>Edit</Link><a className="btn btn-danger delete_button btn-round" onClick={() => this.setState({ selectedreportheaderId: team.pk, displayDeleteModal: true })}>  Delete</a></td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="row mar_lr_0 justify-content-end">
                      <div className="">
                        {Number(num_pages) > 1 &&
                          <Pagination
                            currentPage={this.state.currentPage}
                            totalPages={this.state.num_pages}
                            getCurrentPage={this.getCurrentPage.bind(this)}
                          />
                        }
                      </div>
                    </div>

              </div>
            </div>
          </div>
        </div>
        <Modal
          display={this.state.displayDeleteModal}
          bodyText='Are you sure? You want to delete?'
          modalAction={this.handleDeleteTeam.bind(this)}
          removeModal={() =>
          this.setState({ displayDeleteModal: false })}
        />
      </div>
    );
  }
}
export default TeamList;