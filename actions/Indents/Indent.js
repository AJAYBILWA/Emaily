const url = "";
export const FORM ='FORM';

/*export function formData(data){
  console.log("I am here in actions",data);
  return{
    type: 'FORM',
    data,
    sync: {
    url: url+"/v1/url-timer-ms/api/capturebankdetails/",
    method: "POST",
  },
  }
}*/
export const formData= data => ({
//  console.log("I am here in actions",data);

    type: FORM,
    data,
    sync: {
    url: url + "/v1/url-timer-ms/api/capturebankdetails/",
    method: "POST",
  },
});

export const VALIDATE_GIVEN_URL = "VALIDATE_GIVEN_URL";
export const validateGivenUrl = data => ({
  type: VALIDATE_GIVEN_URL,
  sync:{
    url: url+ "/v1/url-timer-ms/api/validate-url/"+data,
    method: "GET",
  },
});

export const UPDATE_INDENT_LOCAL = "UPDATE_INDENT_LOCAL";
export const updateIndentLocal = data => ({
  type: UPDATE_INDENT_LOCAL,
  data,
});

export const ADD_LR_TRUCK_TYPE = "ADD_LR_TRUCK_TYPE";
export const addLrTruckType = data => ({
  type: ADD_LR_TRUCK_TYPE,
  data,
  sync: {
    url: url + "/v1/lr-ms/api/update-lr-type",
    method: "PUT",
  },
});

export const UPDATE = "UPDATE";
export const updateLocal = data => ({
  type: UPDATE,
  data,
});

export const ADD_INDENT = "ADD_INDENT";
export const addIndent = data => ({
  type: ADD_INDENT,
  data,
  sync: {
    url: url + "/v1/order-ms/api/indent",
    method: "POST",
  },
});

export const ADD_ASSIGNUSER = "ADD_ASSIGNUSER";
export const addAssignUser = data => ({
  type: ADD_ASSIGNUSER,
  data,
  sync: {
    url: "/api/indents/assignUser",
    method: "PUT",
  },
});

export const UPDATE_INDENT = "UPDATE_INDENT";
export const updateIndent = data => ({
  type: UPDATE_INDENT,
  data,
  sync: {
    url: "/v1/order-ms/api/indent",
    method: "PUT",
  },
});

export const UPDATE_INDENT_STATUS = "UPDATE_INDENT_STATUS";
export const updateIndentStatus = data => ({
  type: UPDATE_INDENT_STATUS,
  data,
  sync: {
    url: url + "/v1/order-ms/api/indent",
    method: "PUT",
  },
});

export const GET_INDENT_BY_ID = "GET_INDENT_BY_ID";
export const getIndentById = indentId => ({
  type: GET_INDENT_BY_ID,
  sync: {
    url: url + "/v1/order-ms/api/indent/" + indentId,
    method: "GET",
  },
});

export const CLEAR = "CLEAR";
export const clearIndent = data => ({
  type: CLEAR,
  data,
});
