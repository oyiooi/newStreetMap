import { Component } from 'react';
import PropTypes from 'prop-types'
import * as config from './mapConfig';

class Marker extends Component {

    state = {
        client: {
        id: 'PUTYA3KH5B0OR45VDRI0GAEIRM3ZXA0XS2LA5KX5JGJLUDSD',
        secret: 'HJTMOUI2R5QGQUZYLJJXPZDZYFKA1PRXSFSD35DQCG4WD4JF'
        }
}
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }
    renderMarker() {
        if (this.marker) {
            this.marker.setMap(null);
        }

        let { map,type, google, position, bounds, largeInfowindow,addMarker } = this.props;
        position = new google.maps.LatLng(position.lat, position.lng);

        const markerConfig = {
            map: map,
            type:type,
            animation: google.maps.Animation.DROP,
            draggable:false,
            position: position
        };
        this.marker = new google.maps.Marker(markerConfig);
        const marker = this.marker;

        // Create an onclick event to open the large infowindow at each marker.
        let self = this;
        marker.addListener('click', function() {
            self.populateInfoWindow(this, largeInfowindow);
        });

        addMarker(this);

        bounds.extend(marker.position);
        map.fitBounds(bounds);

    }


    populateInfoWindow(marker, infowindow) {
        let { client } = this.state;
        let { map, google, bounds, name, address} = this.props;

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            //set some Animation when MArker has cliked
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 700);

            infowindow.setContent('Loading...');
            let venueID = null;
            let tips = null;
            let photos = null;
            fetch(`https://api.foursquare.com/v2/venues/search?ll=${config.center.lat},${config.center.lng}&v=20180323&query=${name}&limit=1&client_id=${client.id}&client_secret=${client.secret}`)
                .then(response => response.json())
                .then(data => {
                    venueID = data.response.venues[0].id;
                    return fetch(`https://api.foursquare.com/v2/venues/${venueID}/tips?v=20180323&limit=4&client_id=${client.id}&client_secret=${client.secret}`);
                })
                .then(response => response.json())
                .then(data => {
                    tips = data;
                    return fetch(`https://api.foursquare.com/v2/venues/${venueID}/photos?v=20180323&limit=2&client_id=${client.id}&client_secret=${client.secret}`);
                })
                .then(response => response.json())
                .then(data => {
                    photos = data;
                    return fetch(`https://api.foursquare.com/v2/venues/${venueID}/similar?v=20180323&limit=2&client_id=${client.id}&client_secret=${client.secret}`);
                })
                .then(response => response.json())
                .then(data =>  createWindow(tips, photos,data))
                .catch(err => requestError(err, 'Foursquare'));

            //if sucess in Request
            function createWindow(tips, photos) {
                let description = '';

                if (tips && tips.response.tips.items) {
                    const tipsData = tips.response.tips.items;
                    const photosData = photos.response.photos.items;

                    description = `<div id="marker__body"><h1 style="background:white">${name}</h1>
                    <p><span><strong>Address:</strong>${address}</span></p>
                    <h2>Photos</h2>`
                    for(let photo of photosData) {
                        description += `<img alt="${name}" style="padding:5px;" src="${photo.prefix}64x64${photo.suffix}" />`;
                    }
                    description += '<h2>Tips </h2> <ul id="tips__list">';
                    tipsData.forEach( tip => {
                        description += `<li style="border:0;display:inline-block;margin:0;line-height:50%">${tip.text}</li>`;
                    })
                    description += `<p style="margin-top:40px"><em><small>Informations from <img alt="Forusquare logo" src="../img/foursquare.png" style="height:16px" /></small></em></p> </div>`;
                } else {
                    description = `<p>There is no TIP's <i class="fas fa-frown"></i></p>`;
                }
                infowindow.setContent(description);
            }
            //if Error in Request
            function requestError(err, part) {
                console.log(err);
                infowindow.setContent(`<p>Oh no! There was an error making a request for the ${part}.</p>`);
            }
            infowindow.marker = marker;

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });

            infowindow.open(map, marker);
            map.fitBounds(bounds);
            map.panTo(marker.getPosition());
        }
    }

    render(){
        return null;
    }
}

export default Marker;

Marker.propTypes = {
    map: PropTypes.object
}