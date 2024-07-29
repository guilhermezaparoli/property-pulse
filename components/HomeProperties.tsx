import { Property } from '@/@types/PropertyTypes';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/requests';

const HomeProperties = async () => {
  const properties = await fetchProperties();
  const recentProperties = properties
    ?.sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Imóveis recém adicionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
              <p>Nenhuma imóvel encontrado</p>
            ) : (
              recentProperties.map((property: Property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          Veja todos os imóveis
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
