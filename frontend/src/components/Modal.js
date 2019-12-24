import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: props.display,
      message: ''
    };
    this.onPressEsc = this.onPressEsc.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return (nextProps.display !== prevState.display) ? {
      display: nextProps.display
    } : null
  }

  onPressEsc(event){
    if(event.keyCode === 27) {
      this.props.removeModal()
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onPressEsc, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onPressEsc, false);
  }

  render() {
    if(!this.state.display) {
      return null;
    }
    return (
      <div>
        <div className="overlay" onClick={this.props.removeModal}></div>
        <div className="slide_section modal modal-content">
          <div className="slide_content delete">
            <h2 className="heading">{this.props.modaltext ? this.props.modaltext : 'Confirmation'}
              <Link to="#" className="float-right close" onClick={this.props.removeModal}>
                <i className="fas fa-times-circle"/>
              </Link>
            </h2>
            <div className="body">
              {this.props.displayInput ?
                <div className="form-group">
                  <input className="form-control" rows="3" value={this.state.message} placeholder="Add Message" onChange={(e)=> this.setState({message: e.target.value })}/>
                </div>
                :
                <p>{this.props.bodyText}</p>
              }
            </div>
            <div className="modal-footer">
              <div className="buttons text-right">
                <button type="button" className="btn btn-primary btn-round" onClick={() => this.props.modalAction(this.state.message)}>Yes</button>
                <button type="button" className="btn btn-danger btn-round cancel" onClick={this.props.removeModal}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
