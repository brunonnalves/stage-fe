import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

// To Domain
export function applyPhoneMask(phone: string | undefined) {
  if (!phone) return '';

  let phoneStr = phone;
  if (phoneStr.slice(0, 3) === '+55') {
    // let maskedPhone = '+' + phoneStr;
    let maskedPhone = phoneStr;
    maskedPhone = maskedPhone.slice(0, 3) + ' (' + maskedPhone.slice(3);
    maskedPhone = maskedPhone.slice(0, 7) + ') ' + maskedPhone.slice(7);
    maskedPhone = maskedPhone.slice(0, 14) + '-' + maskedPhone.slice(14);
    return maskedPhone;
  } else if (phoneStr.slice(0, 1) === '+1') {
    // let maskedPhone = '+' + phoneStr;
    let maskedPhone = phoneStr;
    maskedPhone = maskedPhone.slice(0, 2) + ' (' + maskedPhone.slice(2);
    maskedPhone = maskedPhone.slice(0, 7) + ') ' + maskedPhone.slice(7);
    maskedPhone = maskedPhone.slice(0, 12) + '-' + maskedPhone.slice(12);
    return maskedPhone;
  }
}

export function applyDateMask(date: string | undefined) {
  if (!date) return '';

  let dateStr = date;
  const dd = dateStr.slice(8, 10);
  const mm = dateStr.slice(5, 7);
  const yyyy = dateStr.slice(0, 4);
  const maskedDate = dd + '/' + mm + '/' + yyyy;

  return maskedDate;
}

export function applyCPFMask(cpf: string | undefined) {
  if (!cpf) return '';

  let maskedCPF = cpf;
  maskedCPF = [
    maskedCPF.slice(0, 3),
    '.',
    maskedCPF.slice(3, 6),
    '.',
    maskedCPF.slice(6, 9),
    '-',
    maskedCPF.slice(9),
  ].join('');

  return maskedCPF;
}

// React IMasks

/*
0 - any digit
a - any letter
* - any char

[] - make input optional
{} - include fixed part in unmasked value
` - prevent symbols shift back
*/

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneMask = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[
        {
          mask: '+0 (000) 000-0000',
          overwrite: false,
        },
        {
          mask: '+00 (00) 00000-0000',
          overwrite: false,
        },
      ]}
      unmask={true}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
    />
  );
});

export const CpfMask = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      unmask={true}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite={false}
    />
  );
});

export const CurrencyMask = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={'R$ num'}
      blocks={{
        num: {
          mask: Number,
          thousandsSeparator: ' ',
        },
      }}
      unmask={true}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite={false}
    />
  );
});

export const DateMask = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Date}
      pattern="d{/}`m{/}`Y0"
      placeholderChar=""
      min={new Date(1930, 0, 1)}
      max={new Date(new Date().getFullYear(), 11, 31)}
      lazy={true}
      unmask={true}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite={false}
    />
  );
});
