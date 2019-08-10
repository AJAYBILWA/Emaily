import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  browserHistory,
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from "react-router";
import thunk from "redux-thunk"; //
import syncMiddleware from "./middleware/Sync";
import * as reducers from "./reducers";

const URLSearchParams = require("url-search-params");

import enUS from "antd/lib/locale-provider/en_US";
import { LocaleProvider } from "antd";
import Keycloak from "keycloak-js";

// ------ Keycloak Config ------
const kcConfigDev = {
  realm: "transin_dev",
  url: "http://ms.truce.transin.in/auth",
  clientId: "transin_dev",
};

const kcConfigStaging = {
  realm: "transin_staging",
  url: "http://ms.truce.transin.in/auth",
  clientId: "transin_staging",
};

const kcConfigProduction = {
  realm: "transin_prod",
  url: "http://ms.truce.transin.in/auth",
  clientId: "transin_prod",
};

// ------ Base URL Config ------
const syncMiddlewareConfigDev = {
  // baseURL: "http://localhost:3000",
  baseURL: "http://ms-dev.truce.transin.in:8080",
};

const syncMiddlewareConfigStaging = {
  baseURL: "http://ms-staging.truce.transin.in:8080",
};
const syncMiddlewareConfigProd = {
  baseURL: "http://ms.truce.transin.in",
};

let kcConfig;
let syncMiddlewareConfig;
let config;

config = "dev";
// config = "staging";
// config = "prod";

if (config == "prod") {
  //Prod Config
  kcConfig = kcConfigProduction;
  syncMiddlewareConfig = syncMiddlewareConfigProd;
} else if (config == "staging") {
  //Staging Config
  kcConfig = kcConfigStaging;
  syncMiddlewareConfig = syncMiddlewareConfigStaging;
} else if (config == "dev") {
  //Dev Config
  kcConfig = kcConfigDev;
  syncMiddlewareConfig = syncMiddlewareConfigDev;
} else {
  console.log("config not set");
}

const kc = Keycloak(kcConfig);
kc.init({ onLoad: "check-sso" }).success(authenticated => {
  if (authenticated) {
    store.getState().keycloak = kc;
    const userData = kc.tokenParsed;
    let userRole = "";
    if (kc.tokenParsed.realm_access.roles.indexOf("Management") > -1) {
      userRole = "Management";
    } else if (
      kc.tokenParsed.realm_access.roles.indexOf("KeyAccountManager") > -1
    ) {
      userRole = "KeyAccountManager";
    } else if (kc.tokenParsed.realm_access.roles.indexOf("SOE") > -1) {
      userRole = "SOE";
    } else if (kc.tokenParsed.realm_access.roles.indexOf("OE") > -1) {
      userRole = "OE";
    } else if (kc.tokenParsed.realm_access.roles.indexOf("AccountsTeam") > -1) {
      userRole = "AccountsTeam";
    }

    userData.userRole = userRole;
    store.getState().UserProfile = userData;
    setInterval(() => {
      kc
        .updateToken(10)
        .success(() => {
          // localStorage.setItem('token', kc.token)
        })
        .error(() => kc.logout());
    }, 1000);
    // ReactDOM.render(app, document.getElementById("app"));
    // localStorage.setItem('token', kc.token)
    renderApp();
  } else {
    // show possibly other page here...
    kc.login();
  }
});

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  compose(
    applyMiddleware(
      store => next => action => Promise.resolve(action).then(next),
      thunk,
      syncMiddleware(syncMiddlewareConfig)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// import * as AppActions from "./actions/App";
import * as AppConfigActions from "./actions/AppConfig";

const history = syncHistoryWithStore(browserHistory, store);

import Indents from "./containers/Indents";
// import AppLayout from './components/AppLayout';
// import GetStarted from './containers/GetStarted';
// import Indents from './containers/Indents';
// import Owners from './containers/Owners';
// import Drivers from './containers/Drivers';
// import Trucks from './containers/Trucks';
// import ChangePass from './containers/ChangePass';
// import Companies from './containers/Companies';
// import Lanes from './containers/Lanes';
// import Fleet from './containers/Fleet';
// import LoadReceipt from './containers/LRCreate';
// import Lrs from './containers/Lrs';
// import SubOrderUpdate from './containers/LRCreate/SubOrderUpdate';
// import CreateLr from './containers/Lrs/components/Lr';
// import ManageCompanies from './containers/ManageCompanies';
// import TrackTrucks from './containers/TrackTrucks';
// import Easygaadi from './containers/Easygaadi';
// import kpclPrintLr from './components/PrintLr/kpclIndex';
// import fmcgPrintLr from './components/PrintLr/fmcgIndex';
// import Dashboards from './containers/Dashboards';
// import GoogleMaps from './containers/Maps';
// import SingleLr from './containers/SingleLr';
// import Cashbook from './containers/Cashbook';
// import ManageOrders from './containers/ManageOrders';
// import LRCounts from './containers/LRCounts';
// import OrderSummary from './containers/OrderSummary';
// import DailyReports from './containers/DailyReports';
// import FinanceEvents from './containers/FinanceEvents';
// import CustomerPrices from './containers/Prices';
// import OldPrices from './containers/OldPrices';
var url = window.location.href;
//  var url = 'http://localhost:8000/bankdetails?id=8835c737fd3e3ac9419465511d183e5a86a0423abb0770918c37d53f8df7866d';
//var url = 'http://localhost:8000/bankdetails?id=cf651ddabff2c6be4fb37831c153171e7238f250a53446860a4358926fffc8e4';
   var fields = url.split('=');
   var new_url = fields[1];

const isReady = (nextState, replace, callback) => {
  if (nextState.location.pathname == "/app/lrs") {
  } else {
    browserHistory.replace('/bankdetails?id='+new_url);
  }
  return callback();
};

const routes = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" onEnter={isReady}>
      <Route path="/bankdetails" component={Indents} />
    </Route>
  </Router>
);


// store.dispatch(
//   AppConfigActions.appConfigSet({ syncMiddlewareConfig, kcConfig })
// );
// store.dispatch(
//   AppConfigActions.appConfigSet({ syncMiddlewareConfig, kcConfig })
// );
// store.dispatch(
//   AppConfigActions.appConfigSet({ syncMiddlewareConfig, kcConfig })
// );

const renderApp = () => {
  render(
      <Provider store={store}>{routes}</Provider>,
    document.getElementById("root")
  );
};

require("./styles.css");
