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

export interface IssueReadDto {
  id?: number;
  type?: string | null;
  carId?: number;
  createdAt?: string;
  image?: string | null;
  description?: string | null;
  isAvailable?: boolean | null;
  location?: string | null;
}
