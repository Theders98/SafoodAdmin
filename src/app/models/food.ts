export class Food {
    id: number
    name: string
    category_id: number
    restaurant_id: number
    image: string
    description: string
    price: number

    constructor(name: string, category_id: number, restaurantid: number, description: string, price: number) {
      this.name = name
      this.category_id = category_id
      this.restaurant_id = restaurantid
      this.description = description
      this.price = price
    }
}