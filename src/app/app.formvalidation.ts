/**
 * @name app.formvalidation
 * @description 
 *  create formvalidation module, import dependencies and AppService
 */

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions} from '@angular/http';

// import app.service module
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
        // Build form and add form validator
        this.registerForm = fb.group({
            'userName' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]*$/)])],
            'passWord': [null,  Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)])],
        })
    }

    /**
     * @memberof __app.formvalidation
     * @description Submit form value and call register function of appService to send HTTP request
     * @function submitForm
     * @param form the value of the form {userMame:xxx, passWord:xxx}
     */
    submitForm(form: any){
        this.appService.register(form)
                .subscribe(result => {
                    this.appService.openSnackBar(`Successfully Registered!`);
                }, error => {
                    if(error.status == 304) {
                        // If the username is already registered, return response 304 status
                        this.appService.openSnackBar('The usename has been registered!');
                    }else{
                        this.appService.openSnackBar(`${error.statusText}. Please Try Again`);
                    }
                });
    }
  
}
