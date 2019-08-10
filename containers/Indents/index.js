import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerStart from './ContainerStart';
import RowComeIn from './RowComeIn.js';
import ContainerMid from './ContainerMid';



import * as IndentActions from '../../actions/Indents/Indent';

@connect(state => ({
	Indents: state.Indents,

}))

class Indents extends Component {
	state = {
		information :{
			lrNumber: "notset",
			truckNumber: "notset",
			from :"notset",
			to : "notset",
			date: "notset",
			lrNumber :"notset",
			freightCharges: 0,
			loadingCharges : 0,
		},
		flag : true,
	};

	componentDidMount() {
	let url = window.location.href;
	console.log("I am here     ",  url.trim());
	var fields = url.split('=');
	var id = fields[1];
	console.log("I am here at fetch")
	//console.log("given url is       ",window.location.href);
	this.fetchData('http://ms-dev.truce.transin.in:3000/v1/url-timer-ms/api/get-advance-form-data/'+id);
	//this.fetchData('http://localhost:3000/v1/url-timer-ms/api/get-advance-form-data/'+id);
	}
	fetchData(url) {
		var count= 0;
		var self=this;
			fetch(url)
					.then(function(response) {return response.json();})
					.then(function(data){
						let items;
						if(data.valid){
							//console.log("The data is valid")
							items =data.data;
 					//		console.log("stat",items);
						}
						else{
							self.state.flag= false;
						//	console.log("The data is invalid")
						//	console.log("flagggg",self.state.flag)
							items ={};
						}

						return items;

						//  console.log("nave",this.state.information)
					}).then(function(data){
						 self.setState({information:data});

					})
}



	render() {
		const information = this.state.information;
		const lrNumber = this.state.information.lrNumber;
		//console.log(this.state.information);
		if (!this.state.flag) {
			return (
				<div>
				<ContainerStart />
	      <br />
				<br />
				<br />
				<br />
	      <br />
	      <div className="row come-in">
	        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" />
	        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
	          <div className="panel panel-primaryErr">
	            <div className="panel-headingErr">Error Message</div>
	            <div className="panel-body" id="errorData" />
							<p className="errmsg">
							We are sorry, the URL you accessed is either invalid or has expired.
							<br />
							Please contact Transin office for further details.
							</p>

	          </div>
	        </div>
	      </div>
				</div>
			);
		}

		return (
			<div>
				<ContainerStart />
				<div className="container-fluid">
				<RowComeIn information={information}/>
				<ContainerMid  lrNumber={lrNumber}/>
			</div>
			</div>
		);
	}
}

require('./styles.css');
export default Indents;
