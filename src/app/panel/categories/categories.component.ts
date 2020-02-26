import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;
  category: Category
  categoryForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string

  constructor(private categoriesService: CategoriesService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  ngOnInit() { this.getCategories() }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories
    })

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  addCategory(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir categoria"
    this.buttonModal = "Añadir"

    this.form.name.setValue("")

    this.modalRef = this.modalService.show(template)
  }

  editCategory(category: Category, template: TemplateRef<any>): void {
    this.type = "edit"
    this.titleModal = "Editar categoria"
    this.buttonModal = "Editar"
    this.category = category

    this.form.name.setValue(category.name)
    
    this.modalRef = this.modalService.show(template)
  }

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category).subscribe(category => {
      this.categories = this.categories.filter(c => c.id !== category.id)
    })
  }

  onSubmit(type: string) {
    if (this.categoryForm.invalid) { return }

    switch (type) {
      case "add":
        this.categoriesService.createCategory(new Category(this.form.name.value)).subscribe(category => {
          this.categories.push(category)
        })
        break;
      case "edit":
        this.category.name = this.form.name.value
        this.categoriesService.updateCategory(this.category).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.categoryForm.controls; }
}