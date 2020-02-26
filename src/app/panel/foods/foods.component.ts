import { Component, OnInit, TemplateRef } from '@angular/core';
import { FoodsService } from 'src/app/services/foods.service';
import { Food } from 'src/app/models/food';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html'
})
export class FoodsComponent implements OnInit {
  foods: Array<Food>;
  food: Food
  foodForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string

  categories: Array<Category>
  restaurants: Array<Restaurant>

  constructor(private foodsService: FoodsService, private modalService: BsModalService, private formBuilder: FormBuilder,
              private categoriesService: CategoriesService, private restaurantsService: RestaurantsService) { }
  ngOnInit() { this.getFoods() }

  getFoods(): void {
    this.foodsService.getFoods().subscribe(foods => {
      this.foods = foods
    })

    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      restaurant: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })

    this.categoriesService.getCategories().subscribe(categories => this.categories = categories)
    this.restaurantsService.getRestaurants().subscribe(restaurants => this.restaurants = restaurants)
  }

  addFood(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir comida"
    this.buttonModal = "Añadir"

    this.form.name.setValue("")
    this.form.category.setValue(1)
    this.form.restaurant.setValue(1)
    this.form.description.setValue("")
    this.form.price.setValue("")

    this.modalRef = this.modalService.show(template)
  }

  editFood(food: Food, template: TemplateRef<any>): void {
    this.type = "edit"
    this.titleModal = "Editar comida"
    this.buttonModal = "Editar"
    this.food = food

    this.form.name.setValue(food.name)
    this.form.category.setValue(food.category_id)
    this.form.restaurant.setValue(food.restaurant_id)
    this.form.description.setValue(food.description)
    this.form.price.setValue(food.price)
    
    this.modalRef = this.modalService.show(template)
  }

  deleteFood(food: Food): void {
    this.foodsService.deleteFood(food).subscribe(food => {
      this.foods = this.foods.filter(f => f.id !== food.id)
    })
  }

  onSubmit(type: string) {
    if (this.foodForm.invalid) { return }

    switch (type) {
      case "add":
        this.foodsService.createFood(new Food(this.form.name.value, this.form.category.value, this.form.restaurant.value, this.form.description.value, this.form.price.value)).subscribe(allergen => {
          this.foods.push(allergen)
        })
        break;
      case "edit":
        this.food.name = this.form.name.value
        this.food.category_id = this.form.category.value
        this.food.restaurant_id = this.form.restaurant.value
        this.food.description = this.form.description.value
        this.food.price = this.form.price.value
        this.foodsService.updateFood(this.food).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.foodForm.controls; }
}