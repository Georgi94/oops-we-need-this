/** Parse a client-supplied id (string or number) into a positive integer, or null. */
export function toPositiveInt(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
