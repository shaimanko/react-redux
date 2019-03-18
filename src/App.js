import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import submitData from 'actions/submitAction';

// import { SnackbarContentDangerResponse, SnackbarContentSuccessResponse } from './components/SnackbarContent';

import Snackbar from './components/Snackbar';
import Table from './components/Table';
import Button from './components/Button';
import TextField from './components/TextField';
import Select from './components/Select';
import { Grid, Paper } from '@material-ui/core';
import RadioSelection from './components/RadioSelection';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titleItem: [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Ms.', value: 'Ms.' },
      ],
      nationItem: [
        { label: 'Thai', value: 'Thai' },
        { label: 'American', value: 'American' },
      ],
      genderItem: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Unisex', value: 'Unisex' },
      ],
      mobileItem: [
        { label: '+1', value: '+1', countryCode: 'US' },
        { label: '+66', value: '+66', countryCode: 'TH' },
      ],
      formData: {
        title: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        nation: '',
        citizenId: '',
        gender: '',
        mobile: '',
        mobileNumber: '',
        passportNo: '',
        expectedSalary: '',
      },
      errorMessage: '',
      dataTable: null,
      openSnack: false
    };
  }

  componentWillMount() {
    this.generateTable();
  }

  generateTable = () => {
    const data = JSON.parse(localStorage.getItem('data'));

    this.setState({
      dataTable: data
    });
  }

  onFieldChanged = (event) => {
    const { formData } = this.state;

    if (event.target.name === 'citizenId') {
      const pattern = '_-____-___-____-_';
      const pattern_ex = '-';

      let returnText = '';
      const a = event.target.value.length;
      const b = a - 1;
      for (let i = 0; i < pattern.length; i++) {
        if (b === i && pattern.charAt(i + 1) === pattern_ex) {
          returnText += event.target.value + pattern_ex;
          event.target.value = returnText;
        }
      }
      if (a >= pattern.length) {
        event.target.value = event.target.value.substr(0, pattern.length);
      }
    }

    this.setState({
      formData: {
        ...formData,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { formData } = this.state;
    const citizenno = /(\d{1})-(\d{4})-(\d{3})-(\d{4})-(\d{1})/g;

    if (formData.title === '') {
      this.setState({
        errorMessage: 'Please select Title',
        openSnack: true,
      });
      return;
    }
    if (formData.firstName === '') {
      this.setState({
        errorMessage: 'Please enter First Name',
        openSnack: true,
      });
      return;
    }
    if (formData.lastName === '') {
      this.setState({
        errorMessage: 'Please enter Last Name',
        openSnack: true,
      });
      return;
    }
    if (formData.birthDay === '') {
      this.setState({
        errorMessage: 'Please enter Birthday',
        openSnack: true,
      });
      return;
    }
    const checkCitizen = citizenno.test(formData.citizenId);
    if (formData.citizenId !== '' && !checkCitizen) {
      this.setState({
        errorMessage: 'Citizen ID is incorrect format(x-xxxx-xxx-xxxx-x)',
        openSnack: true,
      });
      return;
    }
    if (formData.mobile === '' || formData.mobileNumber === '') {
      this.setState({
        errorMessage: 'Please enter Mobile Phone',
        openSnack: true,
      });
      return;
    }
    if (formData.expectedSalary === '') {
      this.setState({
        errorMessage: 'Please enter Expected Salary',
        openSnack: true,
      });
      return;
    }

    await this.props.submitData(formData, 'create');

    if (this.props.response === 'success') {
      this.generateTable();

      this.registerFormRef.reset();

      this.setState({
        formData: {
          title: '',
          firstName: '',
          lastName: '',
          birthDay: '',
          nation: '',
          citizenId: '',
          gender: '',
          mobile: '',
          mobileNumber: '',
          passportNo: '',
          expectedSalary: '',
        },
        errorMessage: '',
        success: 'Successfully created',
        openSnack: true,
      });
    }
  }

  handleClose = () => {
    this.setState({
      errorMessage: '',
      success: '',
      openSnack: false,
    });
  }

  render() {
    const { titleItem, nationItem, genderItem, mobileItem, formData, errorMessage, success, dataTable, openSnack } = this.state;

    return (
      <div>
        <Paper className='registration-section'>
        <Snackbar open={openSnack} message={errorMessage || success} onClose={this.handleClose} />
          <form ref={(el) => this.registerFormRef = el} className='form-component' onSubmit={(e) => this.handleSubmit(e)}>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Title: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Select
                  name='title'
                  items={titleItem.map(t => ({ value: t.value, label: t.label }))}
                  value={formData.title}
                  onChange={this.onFieldChanged}
                />
              </Grid>
              <Grid item>
                <div className='label-section'>
                  <label>First Name: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={3}>
                <TextField name='firstName' onChange={this.onFieldChanged} />
              </Grid>
              <Grid item>
                <div className='label-section'>
                  <label>Last Name: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={3}>
                <TextField name='lastName' onChange={this.onFieldChanged} />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Birthday: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField name='birthDay' type='Date' onChange={this.onFieldChanged} />
              </Grid>
              <Grid item>
                <div className='label-section'>
                  <label>Nationality: </label>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Select
                  name='nation'
                  items={nationItem.map(n => ({ value: n.value, label: n.label }))}
                  value={formData.nation}
                  onChange={this.onFieldChanged}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>CitizenID: </label>
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField name='citizenId' onChange={this.onFieldChanged} />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Gender: </label>
                </div>
              </Grid>
              <Grid item xs>
                <RadioSelection
                  name='gender'
                  onChange={this.onFieldChanged}
                  radioItem={genderItem.map(g => ({ value: g.value, label: g.label }))}
                  value={formData.gender}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Mobile Phone: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Select
                  name='mobile'
                  items={mobileItem.map(n => ({ value: n.value, label: n.label, countryCode: n.countryCode }))}
                  value={formData.mobile}
                  onChange={this.onFieldChanged}
                />
              </Grid>
              <Grid item>
                <div className='label-section'>
                  <label>-</label>
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField name='mobileNumber' onChange={this.onFieldChanged} />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Passport No: </label>
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField name='passportNo' onChange={this.onFieldChanged} />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item>
                <div className='label-section'>
                  <label>Expected Salary: <span className='required'>*</span></label>
                </div>
              </Grid>
              <Grid item xs={3}>
                <TextField name='expectedSalary' type='number' onChange={this.onFieldChanged} />
              </Grid>
              <Grid item>
                <div className='label-section'>
                  <span>THB</span>
                </div>
              </Grid>
              <Grid item xs>
                <div className='buttons'>
                  <Button type='submit'>Submit</Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper >
        <Paper className='table-section'>
          <Table data={dataTable} generateTable={this.generateTable} />
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
	submitData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  submitData: (formData, event) => dispatch(submitData(formData, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);