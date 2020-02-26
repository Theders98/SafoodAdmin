export class User {
    id: number
    role: boolean
    name: string
    email: string
    password: string
    avatar?: string
    address?: string

    constructor(role: boolean, name: string, email: string, password: string, address: string) {
      this.role = role
      this.name = name
      this.email = email
      this.password = password
      this.address = address
    }
}