export default (state, action) => {
  const newData = state.data;
  switch (action.type) {
    case 'create':
      if (newData !== null && newData.length > 0) action.formData.id = (parseInt(newData[newData.length - 1].id) + 1).toString();
      else action.formData.id = 1;
      newData.push(action.formData);
      localStorage.setItem('data', JSON.stringify(newData));
      return {
        ...state,
        data: newData,
        response: 'success'
      };
    case 'edit':
      const updateData = action.formData;
      const recordId = action.formData.recordId;

      for(let j = 0; j < newData.length; j++){
        if(newData[j].id === recordId){
          newData[j].title = updateData.title;
					newData[j].firstName = updateData.firstName;
					newData[j].lastName = updateData.lastName;
					newData[j].birthDay = updateData.birthDay;
					newData[j].nation = updateData.nation;
					newData[j].citizenId = updateData.citizenId;
					newData[j].gender = updateData.gender;
					newData[j].mobile = updateData.mobile;
					newData[j].mobileNumber = updateData.mobileNumber;
					newData[j].passportNo = updateData.passportNo;
					newData[j].expectedSalary = updateData.expectedSalary;
        }
      }
      localStorage.setItem('data', JSON.stringify(newData));
      return {
        ...state,
        data: newData,
        response: 'success'
      };
    case 'delete':
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === action.formData) {
          newData.splice(i, 1)
        }
      }
      localStorage.setItem('data', JSON.stringify(newData));
      return {
        ...state,
        data: newData,
      };
    case 'deleteList':
      for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < action.formData.length; j++) {
          if (newData[i].id === action.formData[j]) {
            newData.splice(i, 1)
          }
        }
      }
      localStorage.setItem('data', JSON.stringify(newData));
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
};
