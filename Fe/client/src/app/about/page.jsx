"use client"

import React, {useState} from 'react'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import Link from "next/link";

const mapStyle = {
    position: 'relative',
    zIndex: 1,
    height: '500px',
    with: '500px'
};

export default function Page() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    useState(() => {
        getLocation();
    });

    return (
        <div style={mapStyle}>
            <div>
                <h1>Get GPS Coordinates</h1>
                <button onClick={getLocation}>Get Location</button>
                {latitude && longitude && (
                    <div>
                        <h2>Your Coordinates</h2>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                    </div>
                )}
                {error && <p>Error: {error}</p>}
            </div>
            {latitude === 0 && longitude === 0
                ? <p>Loading...</p>
                : <MapContainer center={[10.045162, 105.746857]} zoom={13} scrollWheelZoom={false} className={"h-full"}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[10.045162, 105.746857]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                            <Link href="/" >hahahaha</Link>
                        </Popup>
                    </Marker>
                    <Marker position={[10.029796, 105.771389]}>
                        <Popup>
                            Đại học Cần Thơ
                            <Link href="/" >hahahaha</Link>
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
}
