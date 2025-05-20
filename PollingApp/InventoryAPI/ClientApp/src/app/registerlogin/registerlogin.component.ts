import { Component } from '@angular/core';

@Component({
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.css']
})
export class RegisterloginComponent {

  showRegister: boolean = true;

  user = {
    username: '',
    email: '',
    password: ''
  };

  register() {
    console.log('User Registration Data:', this.user);
    // TODO: Send to API
    
     // This will control which component is shown
    
  }

}
