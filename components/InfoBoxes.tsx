import Link from 'next/link';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="Para inquilinos"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Encontre imóveis',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Encontre o aluguel perfeito. Favorite imóveis e entre em contato com os proprietários.
          </InfoBox>

          <InfoBox
            heading="Para donos de imóveis"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Adicione imóveis',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
          >
            Divulgue suas propriedades e alcance potenciais inquilinos. Alugue como um Airbnb ou a longo prazo.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
