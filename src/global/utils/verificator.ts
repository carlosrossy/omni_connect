export function removeSpecialCharacters(value: string | undefined | null) {
  if (!value) {
    return "";
  }
  return value.replace(/[^\d]+/g, "");
}
