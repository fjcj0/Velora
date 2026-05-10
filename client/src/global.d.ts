declare type User = {
  name: string;
  username: string;
  profilePhoto: string | null;
  isAdmin: boolean;
  isVerified: boolean;
  bio: string | null;
} | null;
declare interface UserStore {
  user: User;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  createAccount: (
    name: string,
    email: string,
    username: string,
    password: string,
    confirmation_password: string,
    bio: string,
  ) => Promise<void>;
  checkPage: (verificationToken: string) => Promise<void>;
  checkCode: (verificationToken: string, code: string) => Promise<void>;
  resendCode: (verificationToken: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string, username: string, bio: string) => Promise<void>;
  updateProfilePhoto: (file: File) => Promise<void>;
  checkResetPasswordPage: (token: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resetPasswordConfirm: (token: string, password: string) => Promise<void>;
}
/*FINISH DECLARE USERS STORE*/
type Car = {
  _id: string;
  image: string;
  public_id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  category: string;
  fuel: string;
  capacity: string;
  location: string;
  description: string;
  transmission: string;
};
declare interface CarStore {
  cars: Car[] | null;
  car: Car | null;
  isLoading: boolean;
  getAllCars: () => Promise<void>;
  getSingleCar: (id: string) => Promise<void>;
  createCar: (data: {
    brand: string;
    model: string;
    year: string;
    price: string;
    category: string;
    fuel: string;
    capacity: string;
    location: string;
    description: string;
    transmission: string;
    image: File;
  }) => Promise<void>;
  updateCar: (
    id: string,
    data: Partial<{
      brand: string;
      model: string;
      year: string;
      price: string;
      category: string;
      fuel: string;
      capacity: string;
      location: string;
      description: string;
      transmission: string;
      image: File;
    }>,
  ) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
}
/*Finish Car Declare*/
