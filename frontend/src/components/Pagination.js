import React, { Component } from 'react';

export class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: Number(this.props.currentPage),
      totalPages: Number(this.props.totalPages)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.currentPage !== nextProps.currentPage) {
  //     this.setState({ currentPage: nextProps.currentPage });
  //     this.sendData(nextProps.currentPage);
  //   }
  //   if (this.state.totalPages !== nextProps.totalPages) {
  //     this.setState({ totalPages: nextProps.totalPages });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.currentPage !== prevProps.currentPage) {
      this.sendData(this.props.currentPage);
    }
  }

  sendData(currentPage) {
    this.props.getCurrentPage(Number(currentPage))
  }

  handleClick(event) {
    console.log(event.target.id, "********page id")
    this.setState({
      currentPage: Number(event.target.id)
    });
    this.props.getCurrentPage(Number(event.target.id));
  }

  render() {
    let { currentPage, totalPages } = this.props;
    currentPage = Number(currentPage)
    // Logic for displaying page numbers
    const pageNumbers = [];
    if (currentPage >= 3) {
       pageNumbers.push(currentPage-2) 
    }
    if (currentPage  > 1) {
      pageNumbers.push(currentPage - 1)
    }

    for (let i = currentPage; i <=totalPages; i++) {
      if (pageNumbers.length < 5) {
        pageNumbers.push(i);
      }
      else { break; }
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <a
          key={number}
          id={number}
          onClick={this.handleClick}
          className={(number === currentPage) ? "active" : ""}
        >
          {number}
        </a>
      );
    });
    // const isLast = currentPage === totalPages
    // const isFirst = (currentPage === 1)
    return (
      <div className={`pagination ${this.props.class ? this.props.class : ''}`}>
        {currentPage === 1 ? '': <a
            key="first"
            id={1}
            onClick={this.handleClick}
            // className={isFirst ? 'disabled' : ''}
          >
          First
          </a> }
          {currentPage === 1 ? '':
          <a
            key={"key" + currentPage - 1}
            id={currentPage - 1}
            onClick={this.handleClick}
            // className={isFirst ? 'disabled' : ''}
          >
          &laquo;
          </a>
        }
        {renderPageNumbers}
        {currentPage === totalPages ? '' :
        <a
            key={"key" + currentPage + 1}
            id={Number(currentPage) + 1}
            onClick={this.handleClick}
            // className={isLast ? 'disabled' : ''}
          >
            &raquo;
          </a> }
          {currentPage === totalPages ? '' :
          <a
            key="last"
            id={totalPages}
            onClick={this.handleClick}
            // className={isLast ? 'disabled' : ''}
          >
            Last
          </a>}
      </div>
    );
  }
}