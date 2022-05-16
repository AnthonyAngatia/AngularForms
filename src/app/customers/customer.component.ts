import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from '@angular/forms';

import {Customer} from './customer';

//
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && isNaN(c.value) || c.value < min || c.value > max) {
      return {'range': true};
    }
    return null;
  }
}

// function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
//   if (c.value !== null && isNaN(c.value) || c.value < 1 || c.value > 5) {
//     return {'range': true};
//   }
//   return null;
//
// }
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.min(3)]],
      lastName: ['', Validators.max(50)],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    })
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl()
    // })
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData() {
    this.customerForm.patchValue({
      firstName: "Anthony",
      lastName: "Angatia",
      email: "and@gmail.com",
      sendCatalog: "false"
    });
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone')
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required)
    } else {
      phoneControl?.clearValidators()
    }
    phoneControl?.updateValueAndValidity()

  }

  // function myValidator(c: AbstractControl):{[key:string]: boolean} | null{
  //   if()
  // }
}
