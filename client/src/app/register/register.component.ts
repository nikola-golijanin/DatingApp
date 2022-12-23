import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {}
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});


  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')]),
    })

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  matchValues(matchTo:string) : ValidatorFn {
    return (control:AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching : true}
    }
  }

  register(){
    console.table(this.registerForm?.value)

    // this.accountService.register(this.model).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   error: error => alert(error)
    // })
  }

  cancel(){
    this.cancelRegister.emit(false)
  }

}
