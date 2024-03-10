export class StringHelper {
  static toVerifyValue(property: string | undefined) {
    if (!property) {
      return undefined;
    }
    return property !== '' ? property : undefined;
  }

  static toVerifyAndFormatDate(date: string | undefined) {
    if (!date) {
      return undefined;
    }
    if (date.length < 10) {
      return undefined;
    }

    let dateFormatted = new Date(
      parseInt(date.replaceAll('/', '').slice(4)),
      parseInt(date.replaceAll('/', '').slice(2, 4)) - 1,
      parseInt(date.replaceAll('/', '').slice(0, 2))
    ).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    console.log(dateFormatted);
    if (!StringHelper.toVerifyValue(dateFormatted)) {
      return undefined;
    }
    return dateFormatted;
  }

  static toVerifyAndFormatPhoneNumber(phoneNumber: string | undefined) {
    if (!phoneNumber) {
      return undefined;
    }
    if (!StringHelper.toVerifyValue(phoneNumber)) {
      return undefined;
    }
    if (phoneNumber.slice(0, 1) !== '+') {
      return '+' + phoneNumber;
    }
    return phoneNumber;
  }

  static toSetEmptyString(property: string | undefined) {
    return property ?? '';
  }

  static toCleanFormatDate(date: string | undefined) {
    if (!date) {
      return '';
    }
    let dateClean = date.slice(0, 10);
    dateClean = dateClean.slice(8) + '.' + dateClean.slice(5, 7) + '.' + dateClean.slice(0, 4);
    return dateClean;
  }
}
