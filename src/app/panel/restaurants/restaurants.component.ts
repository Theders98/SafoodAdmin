import { Component, OnInit, TemplateRef } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {
  restaurants: Array<Restaurant>;
  restaurant: Restaurant
  restaurantForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string

  constructor(private restaurantsService: RestaurantsService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  ngOnInit() { this.getRestaurants() }

  getRestaurants(): void {
    this.restaurantsService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants
    })

    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addRestaurant(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir restaurante"
    this.buttonModal = "Añadir"

    this.form.name.setValue("")
    this.form.description.setValue("")

    this.modalRef = this.modalService.show(template)
  }

  editRestaurant(restaurant: Restaurant, template: TemplateRef<any>): void {
    this.type = "edit"
    this.titleModal = "Editar restaurante"
    this.buttonModal = "Editar"
    this.restaurant = restaurant

    this.form.name.setValue(restaurant.name)
    this.form.description.setValue(restaurant.description)
    
    this.modalRef = this.modalService.show(template)
  }

  deleteRestaurant(restaurant: Restaurant): void {
    this.restaurantsService.deleteRestaurant(restaurant).subscribe(restaurant => {
      this.restaurants = this.restaurants.filter(r => r.id !== restaurant.id)
    })
  }

  onSubmit(type: string) {
    if (this.restaurantForm.invalid) { return }

    switch (type) {
      case "add":
        this.restaurantsService.createRestaurant(new Restaurant(this.form.name.value, this.form.description.value)).subscribe(restaurant => {
          this.restaurants.push(restaurant)
        })
        break;
      case "edit":
        this.restaurant.name = this.form.name.value
        this.restaurant.description = this.form.description.value
        this.restaurantsService.updateRestaurant(this.restaurant).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.restaurantForm.controls; }
}
