import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./CurrentLocationMap";
 
const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  constructor(props){
    super(props);
    {
      this.state = {
        showingInfoWindow: false, //Hides or the shows the infoWindow
        activeMarker: {}, //Shows the active marker upon click
        selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
        
      };
    }
  }
  

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    
    const data = (Array.isArray(this.props.data))? this.props.data : this.props.data.restaurants;
    const marker = data.map(i => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          name={i.name}
          position={{ lat: i.north, lng: i.west }}
          key={i.id}
          info= {i.description}
          category = {i.category}
          price = { i.price}
        />
      )
    });

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}> 
        {marker}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p>{this.state.selectedPlace.info}</p>
            <p>{this.state.selectedPlace.category}</p>
            <p>${this.state.selectedPlace.price}</p>
          </div> 
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBrKMm2g8gMfsU_JtKF6fkgdtw1ED3ShgU"
})(MapContainer);
