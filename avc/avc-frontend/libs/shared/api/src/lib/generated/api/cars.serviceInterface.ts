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

import { CarActivationDto } from '../model/models';
import { CarListReadDtoPagingResponseDto } from '../model/models';
import { CarManagedByUpdateDto } from '../model/models';
import { CarReadDto } from '../model/models';
import { CarUpdateDto } from '../model/models';
import { DefaultCarConfigDto } from '../model/models';

import { Configuration } from '../configuration';

export interface ApiCarsDefaultconfigPutRequestParams {
  configFile?: Blob;
}

export interface ApiCarsGetRequestParams {
  isAvailable?: boolean;
  isApproved?: boolean;
  page?: number;
  limit?: number;
  searchValue?: string;
}

export interface ApiCarsIdActivationPutRequestParams {
  id: number;
  carActivationDto?: CarActivationDto;
}

export interface ApiCarsIdApprovementPutRequestParams {
  id: number;
  isApproved: boolean;
  imageFile?: Blob;
  name?: string;
  managedBy?: number;
}

export interface ApiCarsIdAssignPutRequestParams {
  id: number;
  staffId?: number;
}

export interface ApiCarsIdConfigurationPutRequestParams {
  id: number;
  configFile?: Blob;
}

export interface ApiCarsIdGetRequestParams {
  id: number;
}

export interface ApiCarsIdImagePutRequestParams {
  id: number;
  imageFile?: Blob;
}

export interface ApiCarsIdPutRequestParams {
  id: number;
  carUpdateDto?: CarUpdateDto;
}

export interface ApiCarsManagedbyPutRequestParams {
  carManagedByUpdateDto?: CarManagedByUpdateDto;
}

export interface ApiCarsPostRequestParams {
  deviceId?: string;
}

export interface CarsServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   * Get Default Config
   *
   */
  apiCarsDefaultconfigGet(extraHttpRequestParams?: any): Observable<DefaultCarConfigDto>;

  /**
   * Edit ConfigFile
   *
   * @param requestParameters
   */
  apiCarsDefaultconfigPut(
    requestParameters: ApiCarsDefaultconfigPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    extraHttpRequestParams?: any
  ): Observable<CarListReadDtoPagingResponseDto>;

  /**
   * Set Car Activation
   *
   * @param requestParameters
   */
  apiCarsIdActivationPut(
    requestParameters: ApiCarsIdActivationPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   * Approve or reject New Car
   *
   * @param requestParameters
   */
  apiCarsIdApprovementPut(
    requestParameters: ApiCarsIdApprovementPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   * Assign Car for Staff
   *
   * @param requestParameters
   */
  apiCarsIdAssignPut(
    requestParameters: ApiCarsIdAssignPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   * Update Car Configuration
   *
   * @param requestParameters
   */
  apiCarsIdConfigurationPut(
    requestParameters: ApiCarsIdConfigurationPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    extraHttpRequestParams?: any
  ): Observable<CarReadDto>;

  /**
   * Update Car Image
   *
   * @param requestParameters
   */
  apiCarsIdImagePut(
    requestParameters: ApiCarsIdImagePutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   * Update Car Name
   *
   * @param requestParameters
   */
  apiCarsIdPut(
    requestParameters: ApiCarsIdPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   * Update Car ManagedBy
   *
   * @param requestParameters
   */
  apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;
}