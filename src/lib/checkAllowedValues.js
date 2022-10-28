export function checkAllowedValues(value, allowedValues) {
  const valueUpperCase = value.toUpperCase().trim();
  if (allowedValues.includes(valueUpperCase)) {
    return { allowed: true, value: valueUpperCase };
  } else {
    return {
      allowed: false,
      value: `Allowed values are only: ${this.allowedValues
        .join(", ")
        .slice(0, -2)}!`,
    };
  }
}
