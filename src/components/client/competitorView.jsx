import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class CompetitorView extends Component {
  state = {};
  render() {
    var { competitors } = this.props;
    let data ={
        columns=[
            {
                label: "ID",
                field: "id",
                sort: "asc",
                width: 50
              },
              {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 100
              },
              {
                label: "Description",
                field: "description",
                sort: "asc",
                width: 100
              },{
                label: "Distance",
                field: "distance",
                sort: "asc",
                width: 100
              },{
                label: "Available in shops",
                field: "avInShops",
                sort: "asc",
                width: 100
              },{
                label: "Board Brand",
                field: "boardBrand",
                sort: "asc",
                width: 100
              }
        ],
        rows:competitors.map(comp =>{
            return {
                id:comp.id,
                name:comp.name,
                description:comp.description,
                distance:comp.distance,
                avInShops:comp.distance,
                boardBrand=comp.boardBrand
            }
        })
    }
    return <div>
        <MDBDataTable striped bordered small hover data={data} />
    </div>;
  }
}

export default CompetitorView;
