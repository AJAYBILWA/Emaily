import * as IndentActions from "../../actions/Indents/Indent";
import _ from "lodash";
function Indents(state = {}, action) {
  switch (action.type) {

    case IndentActions.FORM:
      return[
        ...state,
        {
          data:action.data
        }
      ]
    case IndentActions.UPDATE_INDENT_LOCAL:
      ////console.log(action);
      //console.log("in red")
      if (action) {
        //console.log("in if")
        //console.log(action.data)
        return [action.data];
      }
    case IndentActions.UPDATE:
      var newState = state[0] ? state[0] : {};
      newState[action.data.path] = action.data.value;
      return [newState];
    case IndentActions.ADD_INDENT:
      if (action.response) {
        return [action.response.data];
      }

    case IndentActions.ADD_ASSIGNUSER:
      if (action.response) {
        return [action.response.data];
      }

    case IndentActions.UPDATE_INDENT:
      ////////console.log(action)
      if (action.response) {
        return [action.response.data];
      }
    case IndentActions.UPDATE_INDENT_STATUS:
      //////console.log("in reducers ...")
      if (action.response) {
        return [action.response.data];
      }
      return [...state];
    case IndentActions.GET_INDENT_BY_ID:
      if (action.response) {
        return [action.response.data];
      }
      return [...state];
    case IndentActions.CLEAR:
      return [state];

    default:
      return state;
  }
}

export default Indents;
