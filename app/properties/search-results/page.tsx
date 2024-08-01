'use client';
import { Property } from '@/@types/PropertyTypes';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const rest = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (rest.status == 200) {
          const data = await rest.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return <>
  <section className='bg-blue-700 py-4'>
    <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6: lg:px-8">
        <PropertySearchForm/>
    </div>
  </section>
{  loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
        <Link href={'/properties'} className='flex items-center text-blue-500 hover:underline mb-3'>
        <FaArrowAltCircleLeft className='mr-2 mb-1'/> Voltar para os imóveis
        </Link>
      <div className="container-xl lg:container m-auto mt-6">
      <h1 className="text-2xl mb-4">Resultados da pesquisa</h1>
        {properties.length === 0 ? (
          <p>Nenhum resultado encontrado</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: Property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )}
  </>
};

export default SearchResultsPage;
