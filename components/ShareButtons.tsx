import { Property } from '@/@types/PropertyTypes';
import { FaShare } from 'react-icons/fa';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

interface ShareButtonsProps {
  property: Property;
}
const ShareButtons = ({ property }: ShareButtonsProps) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

  return (
   <>
   <h3 className="text-xl font-bold text-center pt-2">
    Share This Property
   </h3>
   <div className="flex gap-3 justify-center pb-5">
    <FacebookShareButton url={shareUrl} hashtag={`${property.type.replace(/\s/g, '')}ForRent`}>
<FacebookIcon size={40} round={true}/>
    </FacebookShareButton>
    <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}>
<TwitterIcon size={40} round={true}/>
    </TwitterShareButton>
    <WhatsappShareButton url={shareUrl} title={property.name} separator=':: '>
<WhatsappIcon size={40} round={true}/>
    </WhatsappShareButton>
    <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property listing ${shareUrl}`}>
<EmailIcon size={40} round={true}/>
    </EmailShareButton>
   </div>
   </>
  );
};

export default ShareButtons;
