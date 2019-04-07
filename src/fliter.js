import React,{Component} from 'react';

class Fliter extends Component {
  showInfowindow(place) {
    place.populateInfoWindow(place.marker, place.props.largeInfowindow)
}

  render() {
    let places;this.props.places.length!==0?places=this.props.places:places=this.props.locationMarkers;
        if(this.props.showing){
            return (
                <div id='cloumn1'>
                  <header className="App-header">Street Map</header>
                  <div className='fliter-container'>
                    <select role='menu' aria-label='dropdowncategory' className='fliter' id='fliter' value={this.props.currentCate} onChange={(event)=>{this.props.updateCurrentCata(event)}} >
                    {this.props.catagra.map((item)=><option key={item} id={item.index} value={item}>{item}</option>)}
                    </select>
                    <button className='fliter-button' onClick={this.props.updateplace}>Fliter</button>
                    <ul role='listbox' className='place-list'>
                      {places.map((place)=><li id={place.props.name} key={place.props.name} value={place.props.name} onClick={(e)=>this.showInfowindow(place)}>{place.props.name}</li>)}
                    </ul>
                  </div>
                </div>
                )
        }else{
            return <div className='hiden'></div>
        }
        
    }
}

export default Fliter