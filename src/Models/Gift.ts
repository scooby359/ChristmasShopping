import { v4 as uuidv4 } from 'uuid';


export interface Gift {
  id: string;
  name: string;
  source: string;
  url?: string;
  price: number;
  bought: boolean;
}

export const getDefaultGift = (): Gift => {
  return {
    id: uuidv4(),
    name: '',
    source: '',
    url: '',
    price: 0,
    bought: false
  }
}

export const getGiftTotalPrice = (gifts: Gift[]): number => {
  return gifts.reduce((total, gift) => total + gift.price, 0);
}