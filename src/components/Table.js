import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import submitData from 'actions/submitAction';

import { Grid, Modal, Typography, Table as MuiTable, TableBody, TableCell, TablePagination, TableRow, Checkbox, IconButton, SvgIcon } from '@material-ui/core';

import Button from './Button';
import TextField from './TextField';
import Select from './Select';
import RadioSelection from './RadioSelection';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
// import { SnackbarContentDangerResponse } from './SnackbarContent'

import Snackbar from './Snackbar';

import './style.css';

class Table extends React.Component {
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
			order: 'asc',
			orderBy: 'name',
			selected: [],
			page: 0,
			rowsPerPage: 5,
			rows: [
				{ id: 'firstName', numeric: false, disablePadding: false, label: 'Name' },
				{ id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
				{ id: 'mobile', numeric: false, disablePadding: false, label: 'Mobile Phone' },
				{ id: 'nation', numeric: false, disablePadding: false, label: 'Nationailty' },
				{}
			],
			open: false,
			selectedId: '',
			eventAction: '',
			errorMessage: '',
			openSnack: false,
		};
	}

	desc(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	stableSort(array, cmp) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = cmp(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map(el => el[0]);
	}

	getSorting(order, orderBy) {
		return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => - this.desc(a, b, orderBy);
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	}

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: this.props.data.map(n => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	}

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	}

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	}

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	handleOpen = (event, id, eventAction) => {
		const { data } = this.props;

		if (id !== '') {
			this.setState({
				open: true,
				selectedId: id,
				eventAction,
				formData: {
					title: data[id - 1].title,
					firstName: data[id - 1].firstName,
					lastName: data[id - 1].lastName,
					birthDay: data[id - 1].birthDay,
					nation: data[id - 1].nation,
					citizenId: data[id - 1].citizenId,
					gender: data[id - 1].gender,
					mobile: data[id - 1].mobile,
					mobileNumber: data[id - 1].mobileNumber,
					passportNo: data[id - 1].passportNo,
					expectedSalary: data[id - 1].expectedSalary,
				},
			});
		} else {
			this.setState({
				open: true,
				selectedId: id,
				eventAction
			});
		}
	};

	handleClose = (event, id) => {
		this.setState({
			open: false,
			selectedId: '',
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
			openSnack: false,
		});
	};

	deleteListAction = async () => {
		const { selected } = this.state;

		await this.props.submitData(selected, 'deleteList');

		this.props.generateTable();
		this.setState({
			selected: [],
			open: false
		});
	}

	deleteAction = async () => {
		const { selectedId } = this.state;

		await this.props.submitData(selectedId, 'delete');

		this.props.generateTable();
		this.setState({
			selectedId: '',
			selected: [],
			open: false
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

		let { formData, selectedId } = this.state;
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

		formData = {
			...formData,
			recordId: selectedId,
		};

		await this.props.submitData(formData, 'edit');

		if (this.props.response === 'success') {
			this.props.generateTable();

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
				open: false,
				errorMessage: '',
				openSnack: false,
			});
		}
	}

	handleCloseMessage = () => {
		this.setState({
			errorMessage: '',
			openSnack: false,
		});
	}

	render() {
		const { formData, errorMessage, titleItem, nationItem, genderItem, mobileItem, order, orderBy, selected, rowsPerPage, page, rows, selectedId, eventAction, openSnack } = this.state;
		const { data } = this.props;

		const emptyRows = data !== null ? rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage) : 5;

		return (
			<div className='table-container'>
				<Modal
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
					open={this.state.open}
				>
					<div className={`modal-section ${eventAction === 'edit' && 'extend'}`}>
						<Typography variant="h6" id="modal-title">
							{eventAction === 'edit' ? 'Edit record' : 'Remove record'}
						</Typography>
						<Typography variant="subtitle1" id="simple-modal-description">
							{eventAction === 'edit' && (
								<div>
									<Snackbar open={openSnack} message={errorMessage} onClose={this.handleCloseMessage} />
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
												<TextField name='firstName' onChange={this.onFieldChanged} value={formData.firstName} />
											</Grid>
											<Grid item>
												<div className='label-section'>
													<label>Last Name: <span className='required'>*</span></label>
												</div>
											</Grid>
											<Grid item xs={3}>
												<TextField name='lastName' onChange={this.onFieldChanged} value={formData.lastName} />
											</Grid>
										</Grid>
										<Grid container spacing={24}>
											<Grid item>
												<div className='label-section'>
													<label>Birthday: <span className='required'>*</span></label>
												</div>
											</Grid>
											<Grid item xs={4}>
												<TextField name='birthDay' type='Date' onChange={this.onFieldChanged} value={formData.birthDay} />
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
												<TextField name='citizenId' onChange={this.onFieldChanged} value={formData.citizenId} />
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
												<TextField name='mobileNumber' onChange={this.onFieldChanged} value={formData.mobileNumber} />
											</Grid>
										</Grid>
										<Grid container spacing={24}>
											<Grid item>
												<div className='label-section'>
													<label>Passport No: </label>
												</div>
											</Grid>
											<Grid item xs={4}>
												<TextField name='passportNo' onChange={this.onFieldChanged} value={formData.passportNo} />
											</Grid>
										</Grid>
										<Grid container spacing={24}>
											<Grid item>
												<div className='label-section'>
													<label>Expected Salary: <span className='required'>*</span></label>
												</div>
											</Grid>
											<Grid item xs={3}>
												<TextField name='expectedSalary' type='number' onChange={this.onFieldChanged} value={formData.expectedSalary} />
											</Grid>
											<Grid item>
												<div className='label-section'>
													<span>THB</span>
												</div>
											</Grid>
											<Grid item xs>
												<div className='buttons'>
													<Button color="secondary" onClick={this.handleClose}>No</Button>
													<Button type='submit'>Update</Button>
												</div>
											</Grid>
										</Grid>
									</form>
								</div>
							)}
							{eventAction === 'delete' ? (selectedId ? 'Do you want to delete this item?' : 'Do you want to delete all items?') : ''}
						</Typography>
						<div className="button-section">
							{eventAction === 'delete' && <Button color="secondary" onClick={this.handleClose}>No</Button>}
							{eventAction === 'delete' && <Button onClick={eventAction === 'delete' ? (selectedId ? this.deleteAction : this.deleteListAction) : ''}>Yes</Button>}
						</div>
					</div>
				</Modal>
				<EnhancedTableToolbar numSelected={selected.length} onClick={event => this.handleOpen(event, '', 'delete')} />
				<div>
					<MuiTable aria-labelledby='tableTitle'>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data !== null ? data.length : 5}
							rows={rows}
						/>
						<TableBody>
							{data !== null && this.stableSort(data, this.getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									const isSelected = this.isSelected(n.id);
									return (
										<TableRow
											hover
											role='checkbox'
											aria-checked={isSelected}
											tabIndex={-1}
											key={`item-${n.id}`}
											selected={isSelected}
										>
											<TableCell padding='checkbox'>
												<Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)} />
											</TableCell>
											<TableCell>
												{n.firstName + ' ' + n.lastName}
											</TableCell>
											<TableCell>{n.gender}</TableCell>
											<TableCell>{n.mobile + n.mobileNumber}</TableCell>
											<TableCell>{n.nation}</TableCell>
											<TableCell>
												<IconButton
													className='edit-button'
													onClick={event => this.handleOpen(event, n.id, 'edit')}
												>
													<SvgIcon fontSize='small'>
														<path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
													</SvgIcon>
												</IconButton>
												<IconButton
													className='delete-button'
													onClick={event => this.handleOpen(event, n.id, 'delete')}
												>
													<SvgIcon>
														<path d='M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306' />
													</SvgIcon>
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={5} />
								</TableRow>
							)}
						</TableBody>
					</MuiTable>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={data !== null ? data.length : 5}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</div>
		);
	}
}

Table.propTypes = {
	data: PropTypes.array.isRequired,
	submitData: PropTypes.func.isRequired,
	generateTable: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	submitData: (formData, event) => dispatch(submitData(formData, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);