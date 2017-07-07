import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    TestBed,
    getTestBed,
    async,
    fakeAsync,
    ComponentFixture
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { FormValidationComponent } from './app.formvalidation';
import { AppService } from './app.service';

// validUsers
const validUser1 = {
    userName: "admin",
    passWord: "123passWord"
}

const validUser2 = {
    userName: "admi1",
    passWord: "123passWord"
}

const validUser3 = {
    userName: "12345",
    passWord: "123passWord"
}

//invalidUsers
const invalidUser1 = {
    userName: "admi",
    passWord: "123passWord"
}

const invalidUser2 = {
    userName: "admin",
    passWord: "123GMZ"
}

const invalidUser3 = {
    userName: "admin!",
    passWord: "123passWord"
}

const invalidUser4 = {
    userName: "admin",
    passWord: "123password"
}

const invalidUser5 = {
    userName: "admin",
    passWord: "passWord"
}

const invalidUser6 = {
    userName: "admin",
    passWord: "123PASSWORD"
}

describe('FormValidationComponent', () => {

    let comp: FormValidationComponent;
    let fixture: ComponentFixture<FormValidationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormValidationComponent],
            imports: [ReactiveFormsModule, FormsModule], 
            providers: [
                FormBuilder
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .overrideComponent(FormValidationComponent, {
            set: {
                providers: [
                    { provide: AppService, useClass: MockAppService },
                ]
            }
        })
        .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(FormValidationComponent);
                comp = fixture.componentInstance;
            });
    }));
    
    // create reusable function for a dry spec.
    function updateForm(userEmail, userPassword) {
        comp.registerForm.controls['userName'].setValue(userEmail);
        comp.registerForm.controls['passWord'].setValue(userPassword);
    }

    it('form invalid when empty', () => {
        expect(comp.registerForm.valid).toBeFalsy();
    });

    it('form value should update from form changes', fakeAsync(() => {
        updateForm(validUser1.userName, validUser1.passWord);
        expect(comp.registerForm.value).toEqual(validUser1);
    }));

    it('isValid should be true when username is alpha value(>= 5)', fakeAsync(() => {
        updateForm(validUser1.userName, validUser1.passWord);
        expect(comp.registerForm.valid).toBeTruthy();
    }));

    it('isValid should be true when username is alpha-numeric value(>= 5)', fakeAsync(() => {
        updateForm(validUser2.userName, validUser2.passWord);
        expect(comp.registerForm.valid).toBeTruthy();
    }));

    it('isValid should be true when username is numeric value(>= 5)', fakeAsync(() => {
        updateForm(validUser3.userName, validUser3.passWord);
        expect(comp.registerForm.valid).toBeTruthy();
    }));

    it('isValid should be false when username is less than 5', fakeAsync(() => {
        updateForm(invalidUser1.userName, invalidUser1.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));

    it('isValid should be false when password is less than 8', fakeAsync(() => {
        updateForm(invalidUser2.userName, invalidUser2.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));

    it('isValid should be false when password is not alpha-numeric', fakeAsync(() => {
        updateForm(invalidUser3.userName, invalidUser3.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));

    it('isValid should be false when password does not contain uppercase character', fakeAsync(() => {
        updateForm(invalidUser4.userName, invalidUser4.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));

    it('isValid should be false when password does not contain number', fakeAsync(() => {
        updateForm(invalidUser5.userName, invalidUser5.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));

    it('isValid should be false when password does not contain lowercase character', fakeAsync(() => {
        updateForm(invalidUser6.userName, invalidUser6.passWord);
        expect(comp.registerForm.valid).toBeFalsy();
    }));
  
});

class MockAppService {

    register(form){}
    openSnackBar(message:string){}

}
