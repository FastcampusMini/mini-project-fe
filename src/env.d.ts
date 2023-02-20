interface IProduct {
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: number;
  rate: number;
}

interface IUserEditPayload {
  oldPassword: string;
  newPassword: string;
  phone: string;
  salary: number;
  job: string;
}
