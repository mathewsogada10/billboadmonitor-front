import React, { Component } from "react";

class competitorModalView extends Component {
  state = {};
  render() {
    var { competitors } = this.props;
    return (
      <div>
        <table className="table table-dark table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Distance(meters)</th>
              <th>Available in shops</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map(comp => (
              <tr key={comp.id}>
                <td>{comp.id}</td>
                <td>{comp.name}</td>
                <td>{comp.description}</td>
                <td>{comp.distance}</td>
                <td>{comp.avInShops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default competitorModalView;
