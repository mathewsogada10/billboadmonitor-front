import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "../../utils/util";
import MediaAgency from "./mediaAgency";

class MediaAgencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  fetchAgencies = async () => {
    try {
      let response = await Axios.get(baseUrl + "media/agency/all");
      this.setState({ items: response.data });
    } catch (e) {
      alert("Whoops, an error occured:" + e);
    }
  };

  componentDidMount() {
    this.fetchAgencies();
  }

  render() {
    var { items } = this.state;
    return (
      <div>
        {items.map(item => (
          <MediaAgency key={item.id} agency={item} onLoad={this.props.onLoad} />
        ))}
      </div>
    );
  }
}

export default MediaAgencies;
