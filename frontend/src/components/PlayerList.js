import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get, fetch_post  } from './Fetch';
import Context from '../Context';
import { PLAYER } from './apiUrls';
import { Pagination } from './Pagination';
import { Modal } from './Modal';


class PlayerList extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      currentPageData: [],
      currentPage: '',
      num_pages: '',
      prev_page: '',
      selectedreportheaderId: '',
      displayDeleteModal: false,
      taskList: '',
      reportsList: ''
    };

    this.fetchplayerlist = this.fetchplayerlist.bind(this);
    this.handleDeletePlayer = this.handleDeletePlayer.bind(this);

  }

  componentDidMount() {
    this.fetchplayerlist();

  }

  handleDeletePlayer() {
    fetch_post(PLAYER + 'view/' + this.state.selectedreportheaderId + '/', true)
    .then((response) => {
        this.setState({ displayDeleteModal: false })
        alert('Player Deleted Successfully');
        this.fetchplayerlist();
    });
  }

  fetchplayerlist() {
    fetch_get(PLAYER + 'list/')
    .then((response) => {
      console.log(response, "***************")
        if (response.player_list) {
        this.setState({ 
            playerList: response.player_list,
            currentPageData: response.player_list,
            currentPage: response.player_list.number,
            num_pages: response.player_list.num_pages,
            prev_page: response.player_list.previous_page_number,
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
    const { playerList, num_pages } = this.state;
    console.log(playerList, "*******")
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="add-button"><Link to={'/report-headers/add'} className="btn btn-primary btn-round">Add Player</Link></div>

            <div className="card">
              <div className="card-header">
                <h5>Player List</h5>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Jersey Number</th>
                        <th>Country</th>

                      </tr>
                    </thead>
                    <tbody>
                     {playerList && playerList.length > 0 &&
                          playerList.map((player,index) =>

                      <tr>
                        <td>{player.first_name}</td>
                        <td>{player.last_name}</td>
                        <td>{player.jersey_number}</td>
                        <td>{player.country}</td>
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
          modalAction={this.handleDeletePlayer.bind(this)}
          removeModal={() =>
          this.setState({ displayDeleteModal: false })}
        />
      </div>
    );
  }
}
export default PlayerList;