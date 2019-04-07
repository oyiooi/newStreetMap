import React,{Component} from 'react';
import Marker from './marker';
import * as config from './mapConfig';

class Map extends Component {
  componentDidMount() {
    this.loadMap();
  }

componentDidUpdate(prevProps) {
    if (prevProps.google !== this.props.google) {
        this.loadMap();
    }
}

loadMap() {
    const mapContainer = document.getElementById("map");
    if (this.props && this.props.google) {
        const {google} = this.props;
        const maps = google.maps;

        //setup the Map
        const mapObj = Object.assign({}, {
            center: config.center,
            zoom: config.map.zoom,
            styles: config.map.styles,
            mapTypeControl: config.map.mapTypeControl

        })

        //inst. the map
        this.map = new maps.Map(mapContainer, mapObj);
        //unique instance of Bounds
        this.bounds = new google.maps.LatLngBounds();
        //unique instance of infoWindow
        this.largeInfowindow = new google.maps.InfoWindow();

        //force the update here to get this.map filled
        this.forceUpdate();
    } else {
        mapContainer.innerHTML = `<div class="main__error">There is problem with Google's API <i class='fas fa-frown'></i> </div>`
    }
}

render() {
    const { addMarker,places,markers } = this.props;console.log(places);
    let locations=[];
    if(places.length===0){
        locations = config.locations;
    }
    else{
        let tempLocations = markers;
        for(let location of tempLocations){
            let ok = false;
            for(let locationmarker of places){
                if(location.props.name===locationmarker.props.name) {
                    ok = true;
                    location = locationmarker;
                }
            }
            if(!ok) {
                location.marker.setMap(null);
            }
            else{
                location.marker.setMap(this.map);
            }
        }
    }

    return  (
      <div>
          { locations.map( (location, index) =>
              <Marker   key={index}
                        google={this.props.google}
                        map={this.map}
                        name={location.name}
                        type={location.type}
                        address={location.address}
                        position={location.location}
                        bounds={this.bounds}
                        largeInfowindow={this.largeInfowindow}
                        addMarker={addMarker}
              />
          ) }
      </div>
    )
  }
}

export default Map

