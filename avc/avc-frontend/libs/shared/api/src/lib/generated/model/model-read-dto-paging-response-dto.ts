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
import { ModelReadDto } from './model-read-dto';

export interface ModelReadDtoPagingResponseDto {
  result?: Array<ModelReadDto> | null;
  count?: number;
  nextPage?: string | null;
  previousPage?: string | null;
  nextPageNumber?: number | null;
  previousPageNumber?: number | null;
  totalPage?: number | null;
}