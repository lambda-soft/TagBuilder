import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready( () =>{
      $(document).click(event =>{
        let isOpened = $('.navbar-collapse').hasClass('collapse in');
        if(isOpened)
          $('button.navbar-toggle').click();
      })
    })
  }

}
