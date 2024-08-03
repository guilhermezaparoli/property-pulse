import formatBRL from '@/utils/formatBRL';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarked,
} from 'react-icons/fa';

interface Property {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PropertyCardProps {
  property: Property;
  key?: string;
}

const PropertyCard = ({ property }: PropertyCardProps) => {

  function getRateDisplay() {
    const { rates } = property;

    if (rates.monthly) {
      return `${formatBRL(rates.monthly)}/mês`;
    } else if (rates.weekly) {
      return `${formatBRL(rates.weekly)}/semana`;
    } else if (rates.nightly) {
      return `${formatBRL(rates.nightly)}/noite`;
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <Image
        src={property.images[0]}
        alt=""
        width={500}
        height={400}
        className="object-cover rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
     
          <p>
            <FaBed className="inline mr-2" /> {property.beds}{' '}
            <span className="md:hidden lg:inline">{
            property.beds == 1 ? "Cama" : "Camas"
            }</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}{' '}
            <span className="md:hidden lg:inline">{property.baths == 1 ?"Banheiro" : "Banheiros"}</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}{' '}
            <span className="md:hidden lg:inline">m²</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              Diária
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              Semanal
            </p>
          )}
          {property.rates.monthly && (
            <p>
             <FaMoneyBill className="inline mr-2" /> Mensal
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
           <FaMapMarked className='text-orange-700 mt-1'/>
            <span className="text-orange-700">
              {' '}
              {property.location.city}/{property.location.state}{' '}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
