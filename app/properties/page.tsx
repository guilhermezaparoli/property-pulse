import { Property } from '@/@types/PropertyTypes';
import PropertyCard from '../../components/PropertyCard';
import { fetchProperties } from '@/utils/requests';
import PropertySearchForm from '@/components/PropertySearchForm';

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  console.log(properties);
  properties.sort(
    (a: Property, b: Property) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6: lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto mt-6">
            {properties.length === 0 ? (
              <p>Nenhuma propriedade encotrada</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property: Property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      }
    </>
  );
};

export default PropertiesPage;
