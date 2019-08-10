import * as AppConfigActions from "../actions/AppConfig";

const initialState = {
  loading: true,
};

function AppConfig(state = initialState, action) {
  switch (action.type) {
    case AppConfigActions.APP_CONFIG_SET:
      return [action.data];

    default:
      return state;
  }
}

export default AppConfig;
