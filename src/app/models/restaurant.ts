export class Restaurant {
    id: number
    name: string
    image: string
    description: string

    constructor(name: string, description: string) {
      this.name = name
      this.description = description
    }
}