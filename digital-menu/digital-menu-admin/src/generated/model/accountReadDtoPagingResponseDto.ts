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
import { AccountReadDto } from './accountReadDto';


export interface AccountReadDtoPagingResponseDto { 
    result?: Array<AccountReadDto> | null;
    count?: number;
    nextPage?: string | null;
    previousPage?: string | null;
}

