import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetch_get, fetch_post  } from './Fetch';
import Context from '../Context';
import { POINTSTABLE } from './apiUrls';
import { Pagination } from './Pagination';
import { Modal } from './Modal';


class PointsTableList extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      pointstableList: [],
      currentPageData: [],
      currentPage: '',
      num_pages: '',
      prev_page: '',
      selectedreportheaderId: '',
      displayDeleteModal: false,
      taskList: '',
      reportsList: ''
    };

    this.fetchpointstableList = this.fetchpointstableList.bind(this);
    this.handleDeletePointTable = this.handleDeletePointTable.bind(this);

  }

  componentDidMount() {
    this.fetchpointstableList();

  }

  handleDeletePointTable() {
    fetch_post(POINTSTABLE + 'view/' + this.state.selectedreportheaderId + '/', true)
    .then((response) => {
        this.setState({ displayDeleteModal: false })
        alert('Points Table Deleted Successfully');
        this.fetchpointstableList();
    });
  }

  fetchpointstableList() {
    fetch_get(POINTSTABLE + 'list/')
    .then((response) => {
      console.log(response, "***************")
        if (response.points_table_list) {
        this.setState({ 
            pointstableList: response.points_table_list,
            currentPageData: response.points_table_list,
            currentPage: response.points_table_list.number,
            num_pages: response.points_table_list.num_pages,
            prev_page: response.points_table_list.previous_page_number,
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
    const { pointstableList, num_pages } = this.state;
    console.log(pointstableList, "*******")
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="add-button"><Link to={'/report-headers/add'} className="btn btn-primary btn-round">Add Report Header</Link></div>

            <div className="card">
              <div className="card-header">
                <h5>Report Headers List</h5>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Total Points</th>

                      </tr>
                    </thead>
                    <tbody>
                     {pointstableList && pointstableList.length > 0 &&
                          pointstableList.map((points_table,index) =>

                      <tr>
                        <td>{points_table.team.name}</td>
                        <td>{points_table.played}</td>
                        <td>{points_table.won}</td>
                        <td>{points_table.lost}</td>
                        <td>{points_table.total_points}</td>

                        <td><Link className="btn btn-primary btn-round" to={'/report-headers/edit/' + points_table.pk}>Edit</Link><a className="btn btn-danger delete_button btn-round" onClick={() => this.setState({ selectedpoints_tableId: points_table.pk, displayDeleteModal: true })}>  Delete</a></td>
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
          modalAction={this.handleDeletePointTable.bind(this)}
          removeModal={() =>
          this.setState({ displayDeleteModal: false })}
        />
      </div>
    );
  }
}
export default PointsTableList;