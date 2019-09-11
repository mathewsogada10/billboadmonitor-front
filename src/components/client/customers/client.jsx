import React, { Component } from "react";

class Client extends Component {
  state = {};
  render() {
    var { agency, client, onLoad } = this.props;
    return (
      <div>
        <small>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => onLoad(client.boards, client, agency)}
          >
            {client.name}
          </button>
        </small>
      </div>
    );
  }
}

export default Client;
