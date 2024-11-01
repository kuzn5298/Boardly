export class UserDTO {
  id: string;
  email!: string;

  constructor(data: UserDTO) {
    this.id = data.id;
    this.email = data.email;
  }
}
