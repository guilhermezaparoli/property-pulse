import { fetchProperties } from '@/utils/requests';
import FeaturePropertyCard from './FeaturePropertyCard';
import { Property } from '@/@types/PropertyTypes';

const FeaturedProperties = async () => {
  const properties: Property[] = await fetchProperties({ showFeatured: true });
  
  return (
    properties.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Imóveis em destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <FeaturePropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
