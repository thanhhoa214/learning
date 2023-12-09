export function toSlug({
  str,
  separator,
  isCleanSpace = false,
  isOnlyCharactersAndNumbers = false,
  isOnlyNumbers = false,
}: {
  str: string;
  separator?: string;
  isCleanSpace?: boolean;
  isOnlyCharactersAndNumbers?: boolean;
  isOnlyNumbers?: boolean;
}) {
  let result = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd');
  if (isCleanSpace) {
    result = result.replace(/\s+/g, '-');
  }
  if (isOnlyCharactersAndNumbers) {
    result = result.replace(/[^A-Za-z0-9_-]/g, '');
  }
  if (isOnlyNumbers) {
    result = result.replace(/[^0-9]/g, '');
  }
  if (separator) {
    return result.replace(/-/g, separator);
  }
  return result;
}
