class Helper {
  static isEmptyObject(obj) {
    return this.isNullOrUndefined(obj)
      || (obj.constructor === Object && Object.keys(obj).length === 0);
  }

  static isNullOrUndefined(data) {
    return typeof data === 'undefined' || data === null;
  }

  static isString(data) {
    return typeof data === 'string';
  }

  static isNonEmptyString(data) {
    return Helper.isString(data) && data.trim().length > 0;
  }

  static isError(data) {
    return data instanceof Error;
  }

  static isNonEmptyArray(data) {
    return !Helper.isNullOrUndefined(data) && data.constructor === Array && data.length > 0;
  }

  static isKeywordInMessage(message, keywords) {
    return keywords.some(keyword => message.indexOf(keyword.toLowerCase()) >= 0);
  }

  static isImageFileName(fileName) {
    return fileName.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  }

  static isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  static isSameArray(oldArray, newArray) {
    if (oldArray.length !== newArray.length) {
      return false;
    }
    for (let i = 0; i < oldArray.length; i += 1) {
      if (oldArray[i] !== newArray[i]) {
        return false;
      }
    }
    return true;
  }
}

export default Helper;
