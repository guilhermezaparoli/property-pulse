interface Sender {
    _id: string;
    username: string;
  }
  
export  interface MessageTypes {
    read: boolean;
    _id: string;
    sender: Sender;
    recipient: string;
    property: {
      name: string;
    }
    name: string;
    email: string;
    phone: string;
    body: string;
    red: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }