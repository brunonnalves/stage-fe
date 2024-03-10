// create-update patients validation
export const isDateValid = (date: string | '') => {
  return date.length == 10 ? true : false;
};

export const isPhoneValid = (phoneNumber: string) => {
  if (phoneNumber.substring(0, 2) == '55' || phoneNumber.substring(0, 3) == '+55') {
    return phoneNumber.length >= 13;
  } else if (phoneNumber.substring(0, 1) == '1' || phoneNumber.substring(0, 2) == '+1') {
    return phoneNumber.length >= 11;
  } else if (phoneNumber == '') {
    return true;
  } else {
    return false;
  }
};
