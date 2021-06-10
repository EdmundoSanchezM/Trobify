import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { GoogleMapsAPI } from '../credentials';
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class MapPropiedades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infodir_string: localStorage.getItem('direcciones_data') ? JSON.parse(localStorage.getItem('direcciones_data')) : [],
            coor_string: localStorage.getItem('coordenadas_data') ? JSON.parse(localStorage.getItem('coordenadas_data')) : [],
            busqueda: localStorage.getItem('dato') ? localStorage.getItem("dato") : "laquetecuento",
            markers: [{
                id: 0,
                lat: 0,
                lng: 0,
                info: "laquetecuento"
            }]
        };
    }

    componentDidMount() {
        var markers = []
        var coor = this.state.coor_string
        var infodir = this.state.infodir_string
        for (var i = 0; i < infodir.length; i += 1) {
            var dic = {
                id: i,
                lat: parseFloat(coor[i][0]),
                lng: parseFloat(coor[i][1]),
                info: infodir[i]
            }
            markers.push(dic)
        }
        this.setState({ markers: markers })
    }
    render() {

        const AsyncMap =
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: 19.432777, lng: -99.133217 }}
                    >
                        {this.state.markers.map(marker => {
                            return (<div>
                                <InfoWindow
                                    position={{ lat: (marker.lat + 0.0018), lng: marker.lng }}>
                                    <div>
                                        <span style={{ padding: 0, margin: 0 }}>{marker.info}</span>
                                    </div>
                                </InfoWindow>
                                <Marker
                                    google={this.props.google}
                                    draggable={false}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                ></Marker>
                            </div>

                            )
                        })}
                    </GoogleMap>
                )
            )
        let map;
        if (0 !== undefined) {
            map =
                <AsyncMap
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height}} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
        } else {
            map = <div style={{ height: this.props.height }} />
        }

        return (map)
    }
}
export default MapPropiedades