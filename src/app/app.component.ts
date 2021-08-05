import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instahyre-assignment';
  isLogin: boolean
  constructor(
    private router: Router,
  ){

  }

  ngOnInit() {
  }

  logout(){
    localStorage.clear()
    window.location.reload()
  }


}
