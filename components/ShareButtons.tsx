import { Property } from '@/@types/PropertyTypes';
import { FaShare } from 'react-icons/fa';

interface ShareButtonsProps {
  property: Property;
}
const ShareButtons = ({ property }: ShareButtonsProps) => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
};

export default ShareButtons;
