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

export const formatCPFInApp = (cpf: string) => {
  if (!cpf) return "CPF não disponível";

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const getGenderLabel = (gender: String) => {
  if (gender === "M") {
    return "Masculino";
  } else if (gender === "F") {
    return "Feminino";
  } else {
    return "Não especificado";
  }
};

export function formatName(name: string) {
  if (!name) {
    return ''; 
  }

  const names = name.split(' ');

  if (names.length >= 2) {
    return names[0]; 
  }

  return name;
}

export function formatDateString(dateString: string) {
  const datePart = dateString.slice(0, 10);
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
}