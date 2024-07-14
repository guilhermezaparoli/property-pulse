'use client';
import { Property } from '@/@types/PropertyTypes';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import Pin from '@/assets/images/pin.svg';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PropertyMapProps {
  property: Property | null;
}
const PropertyMap = ({ property }: PropertyMapProps) => {
  const [lat, setLat] = useState(undefined);
  const [lng, setLng] = useState(undefined);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false)

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

useEffect(() => {
    const fetchCoords = async ( ) => {
      try {
        const res = await fromAddress(`${property?.location.street} ${property?.location.city} ${property?.location.state} ${property?.location.zipcode}`)
console.log(res.results)
        if(res.results.length == 0) {
            setGeocodeError(true)
            setLoading(false)
            return
        }
        const {lat, lng} = res.results[0].geometry.location

        setLat(lat)
        setLng(lng)
        setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng,
        })
      } catch (error) {
        console.error(error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCoords()
}, [])

if(loading) return <Spinner loading={loading}/>

if(geocodeError){
    return <div className='text-xl'>Localização não encontrada no mapa</div>
}

  return !loading && (<Map mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
  mapLib={import("mapbox-gl")}
  initialViewState={
   { longitude: lng,
    latitude: lat,
    zoom: 15
   }
  }
  style={{width: "100%", height: 500}}
  mapStyle='mapbox://styles/mapbox/streets-v9'
  >
    <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image src={Pin} alt='location' width={40} height={40}/>
    </Marker>
  </Map>);
};

export default PropertyMap;
