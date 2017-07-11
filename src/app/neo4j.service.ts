import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { findIndex } from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Neo4jService {
  private neoUrl = 'http://138.197.83.65:8080/getglad/interview/1.0.0/getDepth';

  constructor(private http: Http) { }

  /**
   * Reach out to Swagger API, get Neo4J data
   * @param type1 - the dominate node type
   * @param type2 - the linked node type
   * @param limitCount - the limit in the query
   * @param limitDepth - the depth of the query
   */
  getNodes(type1: string, type2: string, limitCount: string, limitDepth: string): Observable<Http> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.neoUrl, {
                            'limitCount': parseInt(limitCount, null) || 25,
                            'limitDepth': parseInt(limitDepth, null) || 5,
                            'type1': type1 || 'Domain',
                            'type2': type2 || 'Domain'
                          },
                          options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
