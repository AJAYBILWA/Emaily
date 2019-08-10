import React from "react";
import PageHeadImage from "./PageHeadImage";

class ContainerStart extends React.Component {
  render() {
    return (
      <div>
        <div className="main-menu" style={{ color: "#fff" }}>
          <li className="logo">
           <img src=" https://www.transin.in/images/logo_web.png" />
          </li>
        </div>


        {/*<PageHeadImage />*/}
      </div>
    );
  }
}
require("./styles.css");
export default ContainerStart;
