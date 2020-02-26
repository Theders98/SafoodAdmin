import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: Array<User>;
  user: User
  userForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string
  editMode: boolean = true

  constructor(private usersService: UsersService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  ngOnInit() { this.getUsers() }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users
    })

    this.userForm = this.formBuilder.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.nullValidator],
      address: ['', Validators.required]
    })
  }

  addUser(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir usuario"
    this.buttonModal = "Añadir"

    this.form.role.setValue(0)
    this.form.name.setValue("")
    this.form.address.setValue("")
    this.form.email.setValue("")
    this.form.password.setValue("")
    this.form.email.enable()

    this.modalRef = this.modalService.show(template)
  }

  editUser(user: User, template: TemplateRef<any>): void {
    this.type = "edit"
    this.titleModal = "Editar usuario"
    this.buttonModal = "Editar"
    this.user = user

    this.form.role.setValue(user.role)
    this.form.name.setValue(user.name)
    this.form.address.setValue(user.address)
    this.form.password.setValue("")
    this.form.email.setValue(user.email)
    this.form.email.disable()
    
    this.modalRef = this.modalService.show(template)
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user).subscribe(user => {
      this.users = this.users.filter(u => u.id !== user.id)
    })
  }

  onSubmit(type: string) {
    if (this.userForm.invalid) { return }

    switch (type) {
      case "add":
        this.usersService.createUser(new User(this.form.role.value, this.form.name.value, this.form.email.value, this.form.password.value, this.form.address.value)).subscribe(user => {
          this.users.push(user)
        })
        break;
      case "edit":
        this.user.role = this.form.role.value
        this.user.name = this.form.name.value
        this.user.email = this.form.email.value
        this.user.password = (this.form.password.value != "") ? this.form.password.value : this.user.password
        this.user.address = this.form.address.value

        console.log(this.user.password)

        this.usersService.updateUser(this.user).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.userForm.controls; }
}
