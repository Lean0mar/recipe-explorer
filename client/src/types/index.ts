export interface Recipe {
  _id?: string;
  id?: string;
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string;
  sourceUrl?: string;
  createdBy?: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}