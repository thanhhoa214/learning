/**
 * AVC System
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Configuration } from '../configuration';

export interface CheckServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   *
   *
   */
  apiCheckGet(extraHttpRequestParams?: any): Observable<{}>;

  /**
   *
   *
   */
  apiCheckLogGet(extraHttpRequestParams?: any): Observable<{}>;
}
