import React, { Component } from 'react';
import Mapcontainer from './mapcontainer';
import Fliter from './fliter';
import {GoogleApiWrapper} from 'google-maps-react';
import * as config from './mapConfig';



export class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      locationMarkers:[],
      showing:true,
      /*place:[
        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393},type:'hotel'},
        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465},type:'stop'},
        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759},type:'bar'},
        {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377},type:'resturant'},
        {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934},type:'memium'},
        {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237},type:'bar'}
      ],*/
      currentCate:'All',
      catagra:['All','bar','hotel','stop','memium'],
      filtedplace:[]
    }
    this.markers = [];
    this.addMarker = this.addMarker.bind(this);
    this.setPlaces = this.setPlaces.bind(this);
  }

  updateCurrCate=(event)=>{
    let selectedOption=event.target.options[event.target.selectedIndex];
    this.setState({currentCate:selectedOption.value})
  }

  updateplace=()=>{
    let places;
    (this.state.currentCate==='All')?(places=this.state.locationMarkers):(places=this.state.locationMarkers.filter((place)=>place.props.type===this.state.currentCate));
    this.setState({filtedplace:places})
  }


  showingOrHiding=()=>{
    this.setState((state)=>{
      return {showing:!state.showing}
    })
  }

  addMarker(marker) {
    this.markers.push(marker);

    if(this.markers.length === config.locations.length) {
        this.setState({locationMarkers: this.markers})
    }
  }

  setPlaces(places){
    this.setState({places:places})
  }

  render() {
    return (
      <div className="App">
        <Fliter showing={this.state.showing}
                places={this.state.filtedplace} 
                updateCurrentCata={this.updateCurrCate} 
                currentCate={this.state.currentCate} 
                updateplace={this.updateplace} 
                catagra={this.state.catagra}
                locationMarkers={this.state.locationMarkers} />

        <Mapcontainer showing={this.showingOrHiding} google={this.props.google}
                    addMarker={this.addMarker}
                    places={this.state.filtedplace}
                    markers={this.state.locationMarkers} />  
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyAWsJ1d50guNfXbGnlxJUC2DP-xdrqLCw8'
})(App)
