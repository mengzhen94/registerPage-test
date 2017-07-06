/**
 * @name app.service
 * @description 
 *  Provide register and openSnackBar function
 */

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
// import MDSnackBar module of @angular/material
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/map';


@Injectable()
export class AppService {

    constructor(
        private http: Http,
        private mdSnackBar: MdSnackBar,
    ) { }

    /**
     * @memberof appService
     * @description send HTTP request and return response
     * @param form the value of the form {userMame:xxx, passWord:xxx}
     * @returns res HTTP response
     */
    register(form){
        // create http post header and body
        let url = `/`,
            body = JSON.stringify(form),
            headers = new Headers({'Content-Type':'application/json'}),
            reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url, body, reqOptions).map(res => res);
    }

    /**
     * @memberof appService
     * @description open SnackBar to send feedback to users
     * @param message String message
     */
    openSnackBar(message:string){
        let config = new MdSnackBarConfig();
        config.duration = 4000;
        this.mdSnackBar.open(message,'OK', config);       
    }

}