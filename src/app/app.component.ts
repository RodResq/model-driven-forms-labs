import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup

  langs: string[] = [
    'English',
    'French',
    'German'
  ]

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
      }),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
      ], this.forbiddenEmail.bind(this)),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      language: new FormControl(null, Validators.required)
    });
  }

  forbiddenEmail(controls: FormControl): Promise<any> | Observable<any> {
    const promisse = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (controls.value === 'test@test.com') {
          resolve({'emailIsFOrbidden': true});
        } else {
          resolve(null)
        }
      }, 1500)
    });
    return promisse;
  }

  onSubmit() {
    console.log(this.myForm);
  }

}
