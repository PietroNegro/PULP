import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router';
import {WebserviceService} from "../service/webservice.service";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reactiveFormSignUp: FormGroup;
  reactiveFormLogin: FormGroup;
  loginError: string = '';
  loginSuccess: string = '';
  signupError: string = '';
  signupSuccess: string = '';
  constructor(private formBuilder: FormBuilder, private router: Router, public webService: WebserviceService) {
    this.reactiveFormSignUp = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      cognome: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+\\.[a-z]{2,}$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });

    this.reactiveFormLogin = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+\\.[a-z]{2,}$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  signup() {
    this.webService.signup("api/sign_up", this.reactiveFormSignUp.value).then(
      data => {
        if (data) {
          this.signupSuccess = 'registrazione effettuata con successo';
          this.signupError = '';
          alert("Registrazione effettuata con successo")
        }
      },
      error => {
        this.signupError = 'errore di connessione al server';
      }
    );
  }

  login() {
    this.webService.login("api/login", this.reactiveFormLogin.value).then(
      data => {
        if (data && data.length > 0) {
          this.loginSuccess = 'login effettuato con successo';
          this.loginError = '';
        } else {
          this.loginError = 'credenziali non valide';
          this.loginSuccess = '';
        }
      },
      error => {
        this.loginError = 'errore di connessione al server';
      }
    );
  }
}
