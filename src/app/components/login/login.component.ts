import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Login , Session} from '../../interfaces/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  items: Array<any>;
  loginModel : Login = {};
  session : Session = {};

  constructor
  (
    public Login:LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.loginModel);
    this.Login.validateUser(this.loginModel)
    .then(result => {
      this.items = result;
      
      this.session.nombreCompleto     = this.items[0].payload.doc.data().Nombres + " " + this.items[0].payload.doc.data().Apellidos;
      this.session.alias              = this.items[0].payload.doc.data().Alias;
      this.session.fechaInicioSession = new Date();

      localStorage.setItem('objUsuario', JSON.stringify(this.session));

      this.router.navigate(['/lista-proyectos']);
    })
  }

  

}
