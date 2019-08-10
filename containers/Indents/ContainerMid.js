import React from "react";
import { ButtonToolbar  } from 'react-bootstrap';
import { ToggleButton  } from 'react-bootstrap';
import { ToggleButtonGroup  } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as IndentActions from '../../actions/Indents/Indent';
import { FormErrors } from './FormErrors';
import { NameValid } from './NameValid';

var details=[];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


@connect(state => ({
	Indent : state.Indent
}))
class ContainerMid extends React.Component {
  constructor(props){
      super(props);
      this.state ={
        form :
        {
        lrNumber:"",
        ownertype:"OWNER",
        name:"",
        pan:"",
        acc:"",
        ifsc:"",
        branch:"",
      },
        accountnumber:"",
        name: '',
        pan: '',
        acc: '',
        ifsc: '',
        branch: '',
        formErrors: {
        name: '',
        pan: '',
        acc: '',
				re_entered_acc:'',
        ifsc: '',
        branch: '',},
        nameValid: false,
        panValid: false,
        accValid: false,
				re_entered_accValid:false,
        ifscValid: false,
        branchValid: false,
        formValid: false,
				submitFlag:false,

      }
      this.justSubmittedName = this.justSubmittedName.bind(this);
      this.justSubmittedPan = this.justSubmittedPan.bind(this);
      this.justSubmittedBranch = this.justSubmittedBranch.bind(this);
      this.justSubmittedIfsc = this.justSubmittedIfsc.bind(this);
      this.justSubmittedAcc = this.justSubmittedAcc.bind(this);
      this.justSubmittedAccountnumber = this.justSubmittedAccountnumber.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.submitAlert= this.submitAlert.bind(this);
      this.justSubmittedType = this.justSubmittedType.bind(this);
      this.validateField = this.validateField.bind(this);
   }


    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let nameValid = this.state.nameValid;
      let panValid=this.state.nameValid;
      let accValid= this.state.accValid;
      let ifscValid = this.state.ifscValid;
      let branchValid = this.state.branchValid;
			let re_entered_accValid = this.state.re_entered_accValid;

      switch(fieldName) {
        case 'name':
        nameValid = value.match(/^[A-Za-z\s]+$/);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
         break;
         case 'pan':
         panValid = value.match(/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/);
         fieldValidationErrors.pan = panValid ? '' : ' is invalid';
         break;
         case 'acc':
         accValid = value.match(/^[0-9]+$/);
         fieldValidationErrors.acc = accValid ? '' : ' is invalid';
         break;
				 case 'reenterredacc':
					if(value === this.state.form.acc){
							re_entered_accValid= true;
					}
					fieldValidationErrors.re_entered_acc = re_entered_accValid ? '' : ' is invalid';
					break;
         case 'ifsc':
         ifscValid = value.match(/^[A-Za-z]{4}\d{7}$/);
         fieldValidationErrors.ifsc = ifscValid ? '' : ' is invalid';
         break;
         case 'branch':
         branchValid = value.match(/^([a-zA-Z0-9 _-]+)$/);
         fieldValidationErrors.branch = branchValid ? '' : ' is invalid';
         break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
        nameValid: nameValid,
        panValid: panValid,
        accValid: accValid,
        ifscValid: ifscValid,
        branchValid: branchValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid:
        this.state.nameValid && this.state.panValid && this.state.accValid && this.state.branchValid && this.state.ifscValid});
    }

    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }


   justSubmittedName(event){
     event.preventDefault();
     //this.state.name = event.target.value
     this.state.form.name = event.target.value
     this.validateField(event.target.name, event.target.value)
   }

   justSubmittedPan(event){
     event.preventDefault();
     //this.state.pan = event.target.value
     this.state.form.pan = event.target.value.toUpperCase();
     this.validateField(event.target.name, this.state.form.pan)
   }

   justSubmittedAcc(event){
     event.preventDefault();
     this.state.acc = event.target.value
     this.state.form.acc = event.target.value;
     this.validateField(event.target.name, event.target.value)
     //console.log(this.state.acc)
   }
   justSubmittedAccountnumber(event){
     event.preventDefault();
     this.state.accountnumber = event.target.value
		 this.validateField(event.target.name, event.target.value)
    // console.log(this.state.accountnumber)
   }

   justSubmittedIfsc(event){
     event.preventDefault();
    //    this.state.ifsc = event.target.value
     this.state.form.ifsc = event.target.value.toUpperCase();
     this.validateField(event.target.name, this.state.form.ifsc)

     //console.log(this.state.ifsc)
   }
   justSubmittedBranch(event){
     event.preventDefault();
     //this.state.branch = event.target.value
     this.state.form.branch = event.target.value
     this.validateField(event.target.name, this.state.form.branch)
     //console.log(this.state.branch)
   }
   justSubmittedType(event){
      if(event.target.checked){
  //    console.log(event.target.value)
       this.state.form.ownertype = event.target.value
      this.setState({ownertype: event.target.value});
   }
   }
   submitAlert(){
    // await sleep(500); // simulate server latency
     window.alert(`You submitted:\n\n${JSON.stringify(this.state.form, null, 2)} \n \n\nif there are any changes please contact us`);

   }
   /*componentDidMount(){
     this.props.dispatch(IndentActions.formData(this.state.form));
   }*/
   submitForm(){

     this.state.form.lrNumber=this.props.lrNumber;
     this.props.dispatch(IndentActions.formData(this.state.form))
		 this.state.submitFlag = true;
     document.getElementById("form-work").reset();


     }


  render() {
		if(this.state.submitFlag){
			return(
			<div> Your details have been sucessfully submitted. </div>);
		}
    return (
			<div>
			<div id="wrapper-heading">
        <h1 className="details">
        Please fill the below fields
        </h1>
      </div>
      <div id="success-msg"> </div>
      <div id="wrapper" className="container">
        <form id="form-work" className name="form-work" action="#" >

          <fieldset>
          <div className="form-group">
            <hr />
            <div className="col-md-6">
              What describes you best?:*
              <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={'OWNER'}
            >
              <ToggleButton value={'OWNER'} onChange={this.justSubmittedType}>
                Owner
              </ToggleButton>
              <ToggleButton value={'BROKER'} onChange={this.justSubmittedType}>
              Broker</ToggleButton>

            </ToggleButtonGroup>
          </ButtonToolbar>
            </div>
          </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="name" >
                Name (As per PAN Card)*
              </label>
              <input
                name="name"
                id="name"
                className="form-control"
                placeholder="Kelly"
                type="text"
                onChange={this.justSubmittedName}
                required
              />
            </div>
          </div>

{this.state.formErrors.name===''?'':<div className ='errorMessages'>Please enter a valid name</div>}

          <div className={`form-group ${this.errorClass(this.state.formErrors.pan)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="pan">
                PAN No *
              </label>
            <input
                name="pan"
                id="pan"
                className="form-control uppercase"
                placeholder={"AAAPL1234C"}
                type="text"
                onChange={this.justSubmittedPan}
              />
            </div>
          </div>
{this.state.formErrors.pan===''?'':<div className ='errorMessages'>Please enter a valid pan number</div>}

          <div className={`form-group ${this.errorClass(this.state.formErrors.acc)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="acc">
                Account No *
              </label>
              <input
                name="acc"
                id="accountNo"
                className="form-control "
                placeholder="9211-4957"
                type="password"
                onChange={this.justSubmittedAcc}
              />
            </div>
          </div>
					{this.state.formErrors.acc===''?'':<div className ='errorMessages'>Please enter a valid account number</div>}

					<div className={`form-group ${this.errorClass(this.state.formErrors.re_entered_acc)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="acc">
                Re-enter account No *
              </label>
              <input
                name="reenterredacc"
                id="reenterredaccountNo"
                className="form-control "
                placeholder="9211-4957"
                type="text"
                onChange={this.justSubmittedAccountnumber}
              />
            </div>
          </div>
{this.state.formErrors.re_entered_acc===''?'':<div className ='errorMessages'>`These account numbers don't match. Try again?`</div>}
          <div className={`form-group ${this.errorClass(this.state.formErrors.ifsc)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="ifsc">
                IFSC *
              </label>
              <input
                name="ifsc"
                id="ifsc"
                className="form-control uppercase"
                placeholder="HDFC1234"
                type="text"
                onChange={this.justSubmittedIfsc}
              />
            </div>
          </div>
{this.state.formErrors.ifsc===''?'':<div className ='errorMessages'>Please enter a valid ifsc number</div>}

          <div className={`form-group ${this.errorClass(this.state.formErrors.branch)}`} >
            <div className="col-md-6">
              <label className="control-label" htmlFor="branch">
                Branch Name *
              </label>
            <input
                name="branch"
                id="branch"
                className="form-control "
                placeholder="Madhapur Branch"
                type="text"
                onChange={this.justSubmittedBranch}
              />
            </div>
          </div>
		{this.state.formErrors.branch===''?'':<div className ='errorMessages'>Please enter a valid branch name</div>}

		<br />
			<div className = "warningMessage">
			 Please note that Advance and Final settlement will be both made to the same account as entered about.
 <br/>Transin Logistics Pvt Ltd is not liable for wrong payment if account number entered above is incorrect.
			</div>


				  <div className="form-group">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block info"
                onClick={this.submitForm}
								disabled={!this.state.formValid}
              >
                Send
              </button>
            </div>
          </div>




          </fieldset>
        </form>
      </div>
			</div>
    );
  }
}


//<FormErrors formErrors={this.state.formErrors} />
/*<FormGroup1 />
<FormGroup2 name={this.state.name}/>
<FormGroup3 pan={this.state.pan}/>
<FormGroup4 acc={this.state.acc}/>
<FormGroup5 ifsc={this.state.ifsc}/>
<FormGroup6 branch={this.state.branch}/>
<FormGroup7 />*/
/*<div className="form-group">
  <div className="col-md-6">
    <label className="control-label" htmlFor="tel">
      Re-enter account No *
    </label>
    <input
      name="tel"
      id="reaccountNo"
      className="form-control"
      placeholder="9211-4957"
      type="text"
      onChange={this.justSubmittedAccountnumber}
    />
  </div>
</div>*/
//require("./styles.css");
export default ContainerMid;
