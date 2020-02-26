import { Component, OnInit, TemplateRef } from '@angular/core';
import { Allergen } from 'src/app/models/allergen';
import { AllergensService } from 'src/app/services/allergens.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html'
})
export class AllergensComponent implements OnInit {
  allergens: Array<Allergen>;
  allergen: Allergen
  allergenForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string

  constructor(private allergensService: AllergensService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  ngOnInit() { this.getAllergens() }

  getAllergens(): void {
    this.allergensService.getAllergens().subscribe(allergens => {
      this.allergens = allergens
    })

    this.allergenForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  addAllergen(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir alergeno"
    this.buttonModal = "Añadir"

    this.form.name.setValue("")

    this.modalRef = this.modalService.show(template)
  }

  editAllergen(allergen: Allergen, template: TemplateRef<any>): void {
    this.type = "edit"
    this.titleModal = "Editar alergeno"
    this.buttonModal = "Editar"
    this.allergen = allergen

    this.form.name.setValue(allergen.name)
    
    this.modalRef = this.modalService.show(template)
  }

  deleteAllergen(allergen: Allergen): void {
    this.allergensService.deleteAllergen(allergen).subscribe(allergen => {
      this.allergens = this.allergens.filter(a => a.id !== allergen.id)
    })
  }

  onSubmit(type: string) {
    if (this.allergenForm.invalid) { return }

    switch (type) {
      case "add":
        this.allergensService.createAllergen(new Allergen(this.form.name.value)).subscribe(allergen => {
          this.allergens.push(allergen)
        })
        break;
      case "edit":
        this.allergen.name = this.form.name.value
        this.allergensService.updateAllergen(this.allergen).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.allergenForm.controls; }
}