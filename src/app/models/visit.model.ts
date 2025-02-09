interface ClientInfo {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  isRegular: boolean;
}

interface HaircutInfo {
  name: string;
  price: number;
}

export interface VisitInfo {
  _id: string;
  client: ClientInfo;
  haircut: HaircutInfo;
  finalPrice: number;
  date: string;
  branchId: string;
}

export interface Visit {
  _id: string;
  client: string;
  haircut: string;
  branch: string;
  finalPrice: number;
  date: Date;
}

export interface VisitDTO {
  client: string;
  haircut: string;
  date: Date;
}

export interface VisitForm {
  clientSearch: string;
  clientId: string;
  haircutSearch: string;
  haircutId: string;
  date: Date;
}
