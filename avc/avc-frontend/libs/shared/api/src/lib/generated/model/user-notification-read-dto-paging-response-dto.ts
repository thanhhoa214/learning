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
import { UserNotificationReadDto } from './user-notification-read-dto';

export interface UserNotificationReadDtoPagingResponseDto {
  result?: Array<UserNotificationReadDto> | null;
  count?: number;
  nextPage?: string | null;
  previousPage?: string | null;
  nextPageNumber?: number | null;
  previousPageNumber?: number | null;
  totalPage?: number | null;
}
