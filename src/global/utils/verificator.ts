import { format } from 'date-fns';

export function removeSpecialCharacters(value: string | undefined | null) {
  if (!value) {
    return "";
  }
  return value.replace(/[^\d]+/g, "");
}

export function formatCPF(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value.replace(/\D/g, "");
}

export function formatBirthDate(date: Date) {
  return format(date, 'yyyy-MM-dd');
};
