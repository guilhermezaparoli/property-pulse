interface Location {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    number: string;
    neighborhood:string;
  }
  
  interface Rates {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  }
  
  interface SellerInfo {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Property {
    _id: string;
    owner: string;
    name: string;
    type: string;
    description: string;
    location: Location;
    beds: number;
    baths: number;
    square_feet: number;
    amenities: string[];
    rates: Rates;
    seller_info: SellerInfo;
    images: string[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
  }