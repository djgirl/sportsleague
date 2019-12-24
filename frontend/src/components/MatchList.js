import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get, fetch_post  } from './Fetch';
import Context from '../Context';
import { MATCH } from './apiUrls';
import { Pagination } from './Pagination';
import { Modal } from './Modal';


class MatchList extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      matchList: [],
      currentPageData: [],
      currentPage: '',
      num_pages: '',
      prev_page: '',
      selectedreportheaderId: '',
      displayDeleteModal: false,
      taskList: '',
      reportsList: ''
    };

    this.fetchmatchlist = this.fetchmatchlist.bind(this);
    this.handleDeleteMatch = this.handleDeleteMatch.bind(this);

  }

  componentDidMount() {
    this.fetchmatchlist();

  }

  handleDeleteMatch() {
    fetch_post(MATCH + 'view/' + this.state.selectedreportheaderId + '/', true)
    .then((response) => {
        this.setState({ displayDeleteModal: false })
        alert('Match Deleted Successfully');
        this.fetchmatchlist();
    });
  }

  fetchmatchlist() {
    fetch_get(MATCH + 'list/')
    .then((response) => {
      console.log(response, "***************")
        if (response.match_list) {
        this.setState({ 
            matchList: response.match_list,
            currentPageData: response.match_list,
            currentPage: response.match_list.number,
            num_pages: response.match_list.num_pages,
            prev_page: response.match_list.previous_page_number,
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
    const { matchList, num_pages } = this.state;
    console.log(matchList, "*******")
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
                        <th>Team1</th>
                        <th>Team2</th>
                        <th>Team1 Score</th>
                        <th>Team2 Score</th>
                        <th>Winner</th>
                        <th>Held On</th>

                      </tr>
                    </thead>
                    <tbody>
                     {matchList && matchList.length > 0 &&
                          matchList.map((player,index) =>

                      <tr>
                        <td>{player.team1.name}</td>
                        <td>{player.team2.name}</td>
                        <td>{player.team1_score}</td>
                        <td>{player.team2_score}</td>
                        <td>{player.winner.name}</td>
                        <td>{player.started_on}</td>

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
          modalAction={this.handleDeleteMatch.bind(this)}
          removeModal={() =>
          this.setState({ displayDeleteModal: false })}
        />
      </div>
    );
  }
}
export default MatchList;