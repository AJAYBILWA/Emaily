import React from "react";

class PageHeadImage extends React.Component {
  render() {
    return (
      <figure className="page-head-image">
        <img src="http://loremflickr.com/300/300/person" />
      </figure>
    );
  }
}
require("./styles.css");
export default PageHeadImage;
