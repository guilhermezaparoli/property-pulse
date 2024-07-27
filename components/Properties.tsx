'use client';
import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/@types/PropertyTypes';
import { fetchProperties } from '@/utils/requests';
import Spinner from './Spinner';
import Pagination from './Pagination';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  // const properties = await fetchProperties();
  // console.log(properties);
  // properties.sort(
  //   (a: Property, b: Property) =>
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  useEffect(() => {
    const fetchProp = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        const data = await res.json();
        data.properties.sort(
          (a: Property, b: Property) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProp();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto mt-6">
        {properties.length === 0 ? (
          <p>Nenhum imóvel encontrado</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: Property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Properties;
