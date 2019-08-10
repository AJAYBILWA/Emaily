import React from "react";

class RowComeIn extends React.Component {
  constructor(props){
     super(props);
   }
  render() {
    var moment = require('moment')
  //  console.log(moment(this.props.information.date).format('MMMM Do YYYY, h:mm:ss a'))
//    console.log("fetftdqfwd" ,this.props.information);
  var date = new Date(this.props.information.date);
    return (
      <div>
      <br />
      <br />
      <div className="row come-in">
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" />
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
            <div className="panel-heading">Load Details</div>
            <div className="panel-body" id="lrData" />
            <ul>
            <li className="mobile"><b>LR NUMBER:</b> {this.props.information.lrNumber}</li>
            <li className="mobile"><b>TRUCK NUMBER:</b> {this.props.information.truckNumber.toUpperCase()}</li>
            <li className="mobile"><b>FROM:</b> {this.props.information.from}</li>
            <li className="mobile"><b>TO:</b> {this.props.information.to}</li>
            <li className="mobile"><b>DATE:</b> {moment(date).format('MMMM Do YYYY')}</li>
            <li className="mobile"><b>TIME:</b> {moment(date).format('h:mm:ss a')}</li>
            <li className="mobile"><b>FREIGHT CHARGES:</b> {this.props.information.freightCharges}</li>
            <li className="mobile"><b>LOADING CHARGES:</b> {this.props.information.loadingCharges}</li>

              </ul>
          </div>
        </div>
      </div>
      
      </div>
    );
  }
}

require('./styles.css');
export default RowComeIn;
