import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
     private flashMessage:FlashMessagesService,
     private authService: AuthService,
     private router: Router
     ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // campos requiridos
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Preencher campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // validar email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Usar e-mail válido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //registar user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
              this.flashMessage.show('Registado com sucesso.', {cssClass: 'alert-success', timeout: 3000});
              this.router.navigate(['/login']);
    }else{
              this.flashMessage.show('Erro.', {cssClass: 'alert-danger', timeout: 3000});
              this.router.navigate(['/register']);
      }
    });
  }

}



