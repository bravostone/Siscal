import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  items: Array<any>;

  constructor(public fire:FirebaseService) { }

  ngOnInit() {
    this.fire.getUsers()
    .then(result => {
      this.items = result;
    })
  }

  

}
