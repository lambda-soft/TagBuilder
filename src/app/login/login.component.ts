import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  form = new FormGroup({
    loginName: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    loginPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  get loginName(){
    return this.form.get('loginName');
  }

  get loginPassword(){
    return this.form.get('loginPassword');
  }
  submit() {
    //console.log("User: " + this.loginName.value + '\n' + "Pass: " + this.loginPassword.value);
  }
}
