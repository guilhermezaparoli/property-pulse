import { Property } from '@/@types/PropertyTypes';
import React from 'react';
import {
  FaBath,
  FaBed,
  FaCheck,
  FaMapMarked,
  FaRulerCombined,
  FaTimes,
} from 'react-icons/fa';
import PropertyMap from './PropertyMap';

interface PropertyDetailsProps {
  data: Property | null;
}

const PropertyDetails = ({ data }: PropertyDetailsProps) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{data?.type}</div>
        <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarked className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {data?.location.street}, {data?.location.city}{' '}
            {data?.location.state}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Preços e Opções
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Diária</div>
            <div className="text-2xl font-bold">
              <div className="text-2xl font-bold text-blue-500">
                {data?.rates.nightly ? (
                  `$${data.rates.nightly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Semanal</div>
            <div className="text-2xl font-bold text-blue-500">
              {data?.rates.weekly ? (
                `$${data.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Mensal</div>
            <div className="text-2xl font-bold text-blue-500">
              {data?.rates.monthly ? (
                `$${data.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Descrição e Detalhes</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {data?.beds}{' '}
            <span className="hidden sm:inline">
              {data?.beds == 1 ? 'Cama' : 'Camas'}
            </span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {data?.baths}{' '}
            <span className="hidden sm:inline">
              {data?.baths == 1 ? 'Banheiro' : 'Banheiros'}
            </span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {data?.square_feet} <span className="hidden sm:inline">m²</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{data?.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Comodidades</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {data?.amenities.map((amenity, index) => {
            return (
              <li key={index}>
                <FaCheck className="inline-block text-green-600 mr-2" />
                {amenity}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={data} />
      </div>
    </main>
  );
};

export default PropertyDetails;
