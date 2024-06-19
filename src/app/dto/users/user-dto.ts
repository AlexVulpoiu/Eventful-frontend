export class UserDto {
  public id: number;
  public fullName: string;
  public email: string;
  public active: boolean;

  constructor(id: number, fullName: string, email: string, active: boolean) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.active = active;
  }
}
