/* © 2018 NauStud.io
 * @author Eric Tran
 */
/** @module utils */

import * as CryptoJS from "crypto-js";

/**
 * Equivalent to PHP's `hash_hmac` function.
 *
 * @param  {string} algorithm  hashing algorithm
 * @param  {*}      data       data string to be hashed
 * @param  {Buffer} secret     Secret key used to hash data, generated with `pack` method
 * @return {string}            digested hash
 */

export function to2DigitNumber(number: number) {
  if (isNaN(number)) {
    throw new Error("to2DigitNumber:param must be a number");
  }
  if (!number) {
    return "00";
  }

  return `0${number}`.substr(-2, 2);
}
export function vnPayDateFormat(date: Date) {
  if (date.constructor.name !== "Date") {
    throw new Error("vnPayDateFormat:param must be a date");
  }

  let result = "";
  result += date.getFullYear().toString();
  result += to2DigitNumber(date.getMonth() + 1);
  result += to2DigitNumber(date.getDate());
  result += to2DigitNumber(date.getHours());
  result += to2DigitNumber(date.getMinutes());
  result += to2DigitNumber(date.getSeconds());

  return result;
}

export function createMd5Hash(data: string) {
  return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);
}

export function createSHA256Hash(data: string) {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);;
}