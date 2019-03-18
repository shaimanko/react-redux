import { createStore } from 'redux';
import submitReducer from 'reducers/submitReducer';

function configureStore(state = { 
  // data: mockUpData
  data: []
}) {
  // localStorage.setItem('data', JSON.stringify(mockUpData));
  localStorage.setItem('data', null);
  return createStore(submitReducer, state);
}

export default configureStore;

/*const mockUpData = [
  { id: '1', firstName: 'Sample1', lastName: 'Sample1', gender: 'Male', mobile: '+66', mobileNumber: '000000000', nation: 'Thai' },
  { id: '2', firstName: 'Sample2', lastName: 'Sample2', gender: 'Female', mobile: '+66', mobileNumber: '000000000', nation: 'Thai' },
  { id: '3', firstName: 'Sample3', lastName: 'Sample3', gender: 'Male', mobile: '+1', mobileNumber: '000000000', nation: 'American' },
];*/