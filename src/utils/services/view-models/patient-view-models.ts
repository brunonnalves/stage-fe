import _ from 'lodash';
import { StringHelper } from '../helpers/string-helper';
import { IAddress, IPatient } from '../../../types/patient';

export class PatientViewModel {
  static toHTTP(patient: IPatient) {
    return {
      id: StringHelper.toVerifyValue(patient.id),
      name: StringHelper.toVerifyValue(patient.name),
      birthDate: StringHelper.toVerifyAndFormatDate(patient.birthDate),
      address: AddressViewModel.toHTTP(patient.address!),
    };
  }

  static toDomain(patient: IPatient) {
    return {
      id: patient.id ?? undefined,
      name: StringHelper.toSetEmptyString(patient.name),
      birthDate: StringHelper.toSetEmptyString(patient.birthDate),
      address: AddressViewModel.toDomain(patient.address),
    };
  }
}

export class AddressViewModel {
  static toHTTP(address: IAddress) {
    const defaultAddress: IAddress = {
      id: undefined,
      postalCode: '',
      street: '',
      number: '',
      complement: '',
    };

    if (_.isEqual(address, defaultAddress)) {
      return undefined;
    }
    return {
      id: StringHelper.toVerifyValue(address!.id),
      postalCode: StringHelper.toVerifyValue(address!.postalCode),
      street: StringHelper.toVerifyValue(address!.street),
      number: StringHelper.toVerifyValue(address!.number),
      complement: StringHelper.toVerifyValue(address!.complement),
    };
  }

  static toDomain(address: IAddress | undefined) {
    const defaultAddress: IAddress = {
      id: undefined,
      postalCode: '',
      street: '',
      number: '',
      complement: '',
    };

    if (!address) {
      return defaultAddress;
    }
    return {
      id: address.id ?? undefined,
      postalCode: StringHelper.toSetEmptyString(address.postalCode),
      street: StringHelper.toSetEmptyString(address.street),
      number: StringHelper.toSetEmptyString(address.number),
      complement: StringHelper.toSetEmptyString(address.complement),
    };
  }
}
