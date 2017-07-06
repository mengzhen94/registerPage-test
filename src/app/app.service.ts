import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/map';


@Injectable()
export class AppService {

    constructor(
        private http: Http,
        private mdSnackBar: MdSnackBar,
    ) { }

    register(form){
        let url = `/`,
            body = JSON.stringify(form),
            headers = new Headers({'Content-Type':'application/json'}),
            reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url, body, reqOptions).map(res => res);
    }

    openSnackBar(message:string){
        let config = new MdSnackBarConfig();
        config.duration = 4000;
        this.mdSnackBar.open(message,'OK', config);
        
    }


}