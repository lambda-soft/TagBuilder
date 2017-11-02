import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit(f: NgForm){
    //var formData = f.form.controls;
    console.log(f.value);
    console.log("Form Submtited!");
    //console.log("UserName: " + formData['loginUserName'].value);
    //console.log("UserName: " + formData['loginPassword'].value);
   //console.log(f.form.controls);
  }
}
