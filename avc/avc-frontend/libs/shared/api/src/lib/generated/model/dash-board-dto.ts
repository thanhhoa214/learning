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
import { CarNumber } from './car-number';
import { ManagerNumber } from './manager-number';
import { PieChartCar } from './pie-chart-car';
import { StaffNumber } from './staff-number';
import { TopFiveCarIssue } from './top-five-car-issue';
import { IssueNumber } from './issue-number';

export interface DashBoardDto {
  car?: CarNumber;
  manager?: ManagerNumber;
  staff?: StaffNumber;
  issue?: IssueNumber;
  topFiveCarIssue?: Array<TopFiveCarIssue> | null;
  pieChartCar?: PieChartCar;
}
