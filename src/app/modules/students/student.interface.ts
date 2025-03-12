export interface IStudent {
  name: string;
  phone: string;
  email?: string;
  gender: "male" | "female";
  class: String;
  roll: Number;
  fathersName: String;
  mothersName: String;
  address: String;
  isDeleted: Boolean;
}
