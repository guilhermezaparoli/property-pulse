'use client';
import { Autocomplete, styled, TextField } from '@mui/material';
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import Spinner from './Spinner';

interface Location {
  street: string;
  city?: string;
  state: string;
  zipcode: string;
  neighborhood: string;
  number: number | string;
}

interface Rates {
  weekly: string;
  monthly: string;
  nightly: string;
}

interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

interface Fields {
  type: string;
  name: string;
  description: string;
  location: Location;
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: File[];
}

function updateNestedFields<T>(obj: T, path: string, value: any): T {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((acc, key) => {
    acc[key] = acc[key] || {};
    return acc[key];
  }, obj as any);

  if (lastKey) {
    lastObj[lastKey] = value;
  }

  return { ...obj };
}

interface CitiesData {
  nome: string;
}
interface StatesData {
  sigla: string;
}
const PropertyAddForm = () => {
  const [cities, setCities] = useState<CitiesData[] | []>([]);
  const [states, setStates] = useState<StatesData[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<Fields>({
    type: '',
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      neighborhood: '',
      zipcode: '',
      number: '',
    },
    beds: '',
    baths: '',
    square_feet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      nightly: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    },
    images: [],
  });

  useEffect(() => {
    setMounted(true);
    getCitiesByState("SP");
    getStates();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

    setFields((prevFields) => updateNestedFields(prevFields, name, value));
  };

  const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    let uptadedAmenities = [...fields.amenities];

    if (checked) {
      uptadedAmenities.push(value);
    } else {
      uptadedAmenities = uptadedAmenities.filter(
        (amenitie) => amenitie !== value
      );
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: uptadedAmenities,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const updatedImages = [...fields.images];

    for (const file of files) {
      updatedImages.push(file);
    }

    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  async function getCitiesByState(acronym: string) {
    if (!acronym) {
      return;
    }
    try {
      const res = await fetch(
        `https://brasilapi.com.br/api/ibge/municipios/v1/${acronym}?providers=dados-abertos-br,gov,wikipedia`
      );

      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getStates() {
    try {
      const res = await fetch(`https://brasilapi.com.br/api/ibge/uf/v1`);

      const data = await res.json();
      setStates(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    mounted && (
      <form
        action="/api/properties"
        method="POST"
        encType="multipart/form-data"
        onSubmit={() => setLoading(true)}
      >
        <h2 className="text-3xl text-center font-semibold mb-6">
          Adicionar imóvel
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Tipo do imóvel *
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartamento">Apartamento</option>
            <option value="Condomínio">Condomínio</option>
            <option value="Casa">Casa</option>
            <option value="Cabana ou chalé">Cabana ou chalé</option>
            <option value="Sala">Sala</option>
            <option value="Studio">Studio</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nome *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Ex: Um lindo apartamento em São José"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows={4}
            placeholder="Adicione uma descrição do seu imóvel"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Localização
          </label>
          <TextField
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Rua *"
            sx={{ width: '100%', marginBottom: '8px' }}
            value={fields.location.street}
            onChange={handleChange}
            required
          />
          <TextField
            type="number"
            id="number"
            name="location.number"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Número *"
            sx={{ width: '100%', marginBottom: '8px' }}
            value={fields.location.number}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            id="neighborhood"
            name="location.neighborhood"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Bairro *"
            sx={{ width: '100%', marginBottom: '8px' }}
            value={fields.location.neighborhood}
            onChange={handleChange}
            required
          />

          <Autocomplete
            disablePortal
            id="state"
            options={states.map((item) => item.sigla)}
            sx={{ width: '100%', marginBottom: '8px' }}
            value={fields.location.state}
            onChange={(
              event: SyntheticEvent<Element, Event>,
              newValue: string | null
            ) => {
              const newFields = {
                ...fields,
                location: {
                  ...fields.location,
                  state: newValue ?? '',
                  city: '',
                },
              };
              if (newValue) {
                getCitiesByState(newValue);
              }
              setFields(newFields);
            }}
            renderInput={(params) => (
              <TextField
                name="location.state"
                placeholder="Estado *"
                required
                {...params}
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="city"
            options={cities.map((item) => item.nome)}
            sx={{ width: '100%', marginBottom: '8px' }}
            value={fields.location.city}
            disabled={!fields.location.state}
            onChange={(
              event: SyntheticEvent<Element, Event>,
              newValue: string | null
            ) => {
              const newFields = {
                ...fields,
                location: { ...fields.location, city: newValue ?? '' },
              };
              setFields(newFields);
            }}
            renderInput={(params) => (
              <TextField
                name="location.city"
                placeholder="Cidade *"
                required
                {...params}
              />
            )}
          />
          <TextField
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="CEP *"
            value={fields.location.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2"
            >
              Quartos *
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.beds}
              onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
            />
          </div>
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Banheiros *
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.baths}
              onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
            />
          </div>
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="square_feet"
              className="block text-gray-700 font-bold mb-2"
            >
              m² *
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.square_feet}
              onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Comodidades
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                checked={fields.amenities.includes('Wifi')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Cozinha completa"
                className="mr-2"
                checked={fields.amenities.includes('Cozinha completa')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_kitchen">Cozinha completa</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Lavanderia"
                className="mr-2"
                checked={fields.amenities.includes('Lavanderia')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Lavanderia</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Estacionamento Gratuito"
                className="mr-2"
                checked={fields.amenities.includes('Estacionamento Gratuito')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_free_parking">
                Estacionamento Gratuito
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Piscina"
                className="mr-2"
                checked={fields.amenities.includes('Piscina')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_pool">Piscina</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Jacuzzi"
                className="mr-2"
                checked={fields.amenities.includes('Jacuzzi')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_hot_tub">Jacuzzi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="Segurança 24/7"
                className="mr-2"
                checked={fields.amenities.includes('Segurança 24/7')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_24_7_security">Segurança 24/7</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Acessível a cadeiras de rodas"
                className="mr-2"
                checked={fields.amenities.includes(
                  'Acessível a cadeiras de rodas'
                )}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Acessível a cadeiras de rodas
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevador"
                className="mr-2"
                checked={fields.amenities.includes('Elevador')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_elevator_access">Elevador</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Lava-louças"
                className="mr-2"
                checked={fields.amenities.includes('Lava-louças')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_dishwasher">Lava-louças</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Academia"
                className="mr-2"
                checked={fields.amenities.includes('Academia')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_gym_fitness_center">Academia</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Ar-condicionado"
                className="mr-2"
                checked={fields.amenities.includes('Ar-condicionado')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_air_conditioning">Ar-condicionado</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Área de lazer"
                className="mr-2"
                checked={fields.amenities.includes('Área de lazer')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_balcony_patio">Área de lazer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
                checked={fields.amenities.includes('Smart TV')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Cafeteira"
                className="mr-2"
                checked={fields.amenities.includes('Cafeteira')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_coffee_maker">Cafeteira</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Valores (Caso não aplicável, deixe o campo em branco)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2 min-w-20">
                Semanal
              </label>
              <input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.weekly}
                   onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2 min-w-20">
                Mensal
              </label>
              <input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.monthly}
                   onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2 min-w-20">
                Diária
              </label>
              <input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.nightly}
                   onChange={(e) => {
                if(Number(e.target.value) > 0){
                  handleChange(e)
                } else {
                  e.target.value = ''
                }
                handleChange(e)
              }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome do proprietário
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Nome"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            E-mail do proprietário
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Endereço de e-mail"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Celular do proprietário
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Celular"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Imagens (Selecione até 4 imagens)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border rounded w-full py-2 px-3"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? <Spinner loading={loading} size={20} style={{}} color={'#d3d3d3'} /> : 'Adicionar Imóvel'}
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyAddForm;
