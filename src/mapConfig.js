export const center = {

    lat: 50.066313,
    lng: 19.953629

};

export const locations =
    [
        {name: 'Costa Coffee', address:'Rynek Główny 41',location: {lat: 50.062553, lng: 19.9378547},type:'stop'},
        {name: 'Starbucks', address:'Szewska 9, 31-009 Kraków', location: {lat: 50.0624954,  lng: 19.935167 } ,type:'bar'},
        {name: 'Café Camelot', address:'Świętego Tomasza 17, 33-332 Kraków',  location: {lat: 50.0630605,  lng: 19.9391214 },type:'memium'},
        {name: 'Cafe Magia', address:'plac Mariacki 3, 31-000 Kraków',location: {lat: 50.0633158,  lng: 19.9400609 } ,type:'hotel'},
        {name: 'Hard Rock Cafe Kraków', address:'Rynek Główny, plac Mariacki 9, 31-042 Kraków', location: {lat: 50.0614424,  lng: 19.9387331 },type:'stop'}
    ]

export const map = {
        zoom: 11,
        mapTypeControl: false
    }  

export default {center, locations, map};