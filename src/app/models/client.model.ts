export interface Client {
  _id: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  isRegular: boolean;
}

export interface CreateClientDto {
  lastName: string;
  firstName: string;
  middleName?: string;
  phoneNumber: string;
  gender: 'male' | 'female';
}
