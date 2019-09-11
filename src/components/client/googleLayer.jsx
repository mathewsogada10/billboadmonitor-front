import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const mapStyles = {
//   width: "100%",
//   height: "100%"
// };

class GoogleLayer extends Component {
  displayMarkers = () => {
    let boards = this.props.boards;
    if (boards)
      return boards.map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: store.latittude,
              lng: store.longitude
            }}
            onClick={() => alert("You clicked me!")}
          />
        );
      });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        initialCenter={{ lat: -1.241, lng: 36.896 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

//export default GoogleLayer;
export default GoogleApiWrapper({
  apiKey: "AIzaSyCZ3tOuFfW6lCvb83n25PaGPo5QCMjKRYE"
})(GoogleLayer);
