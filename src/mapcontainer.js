import React, {Component} from 'react'
import Map from './map'

class Mapcontainer extends Component {
    render() {

      const { google,addMarker,places }=this.props;

        return (
          <div className='map-container'>
            <div className='map-hearder-container'>
              <div role='button' aria-label='Toggle-Sidebar' className='buttonicon' onClick={this.props.showing}></div>
              <h1>Map</h1>
            </div>
            <div id='map'><Map google={google} places={places} addMarker={addMarker} markers={this.props.markers}/></div>
          </div>
        )
    }
}

export default Mapcontainer