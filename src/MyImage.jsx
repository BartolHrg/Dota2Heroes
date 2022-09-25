import React from "react";

export default class MyImage extends React.Component {
  constructor(props) {
    super(props);
    this.modified_props = { ...props };
    this.modified_props.src = "https://api.opendota.com" + props.src;
    if (this.modified_props.alt === undefined) {
      this.modified_props.alt = props.src;
    }
  }
  render() {
    return (
      <img loading="lazy" {...this.modified_props} />
    );
  }
}