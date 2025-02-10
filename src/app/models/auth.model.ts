export interface User {
  name: string;
  access_token: string;
  role: string;
  branchId: string;
}

export interface Login {
  email: string;
  password: string;
}
