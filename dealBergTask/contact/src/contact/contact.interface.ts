export interface DataInterface {
  email: string;
  phoneNumber: string;
  linkedId: number | null;
  linkPrecedence?: 'primary' | 'secondary';
}

export interface ResponseData {
  contact: {
    primaryContatctId?: number;
    emails?: string[];
    phoneNumbers?: string[];
    secondaryContactIds?: number[];
  };
}
