'use client';

import { fetchProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PropertiesIdPage = () => {
  const id = useParams<{id: string}>();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(id)
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (e) {
        console.error(' Error fetching propery', e);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  return <div>PropertiesIdPage</div>;
};

export default PropertiesIdPage;
