import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "../../utils/util";
import MediaAgency from "./mediaAgency";

class MediaAgencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  fetchAgencies = async () => {
    let { userAgency } = this.props;
    try {
      let response = await Axios.get(
        baseUrl + "media/agency/" + userAgency + "/"
      );

      this.setState({ item: response.data });
    } catch (e) {
      alert("Whoops, an error occured:" + e);
    }
  };

  componentDidMount() {
    this.fetchAgencies();
  }

  render() {
    var { item } = this.state;
    if (!!item) {
      return (
        <div>
          <MediaAgency agency={item} onLoad={this.props.onLoad} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default MediaAgencies;
