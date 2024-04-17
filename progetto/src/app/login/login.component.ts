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
  reactiveForm: FormGroup;
  loginError: string = '';
  loginSuccess: string = '';
  isRegistering: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public webService: WebserviceService) {
    this.reactiveForm = this.formBuilder.group({
      nome: [''],
      cognome: [''],
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
      ],
    });
  }

  toggleRegistering() {
    this.isRegistering = !this.isRegistering;
    if (this.isRegistering) {
      this.reactiveForm.controls['nome'].setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
      this.reactiveForm.controls['cognome'].setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
    } else {
      this.reactiveForm.controls['nome'].clearValidators();
      this.reactiveForm.controls['cognome'].clearValidators();
    }
    this.reactiveForm.controls['nome'].updateValueAndValidity();
    this.reactiveForm.controls['cognome'].updateValueAndValidity();
  }

  loginOrRegister() {
    if (this.isRegistering) {
      this.webService.signup("api/sign_up", this.reactiveForm.value).then(
        data => {
          if (data) {
            this.loginSuccess = 'registrazione effettuata con successo';
            this.loginError = '';
            this.isRegistering = false;
          }
        },
        error => {
          this.loginError = 'errore di connessione al server';
        }
      );
    } else {
      this.webService.login("api/login", this.reactiveForm.value).then(
        data => {
          if (data && data.length > 0) {
            this.loginSuccess = 'login effettuato con successo';
            this.loginError = '';
            this.isRegistering = false;
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
}
