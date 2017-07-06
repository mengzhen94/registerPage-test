import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions} from '@angular/http';

import { AppService } from './app.service';

@Component({
    selector: 'form-validation',
    templateUrl : './app.formvalidation.html',
    providers: [AppService]
})
export class FormValidationComponent {
    registerForm : FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private appService: AppService,
    ){
        this.registerForm = fb.group({
            'userName' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]*$/)])],
            'passWord': [null,  Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)])],
        })
    }

    submitForm(form: any){
        this.appService.register(form)
                .subscribe(result => {
                    this.appService.openSnackBar(`Successfully Registered!`);
                }, error => {
                    if(error.status == 304) {
                        this.appService.openSnackBar('The usename has been registered!');
                    }else{
                        this.appService.openSnackBar(`${error.statusText}. Please Try Again`);
                    }
                });
    }
  
}
