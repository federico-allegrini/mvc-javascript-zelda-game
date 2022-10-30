export function checkAllowedValues(value, allowedValues) {
  const valueUpperCase = value.toUpperCase().trim();
  const allowedValuesList = Object.values(allowedValues);
  if (allowedValuesList.includes(valueUpperCase)) {
    return { allowed: true, value: valueUpperCase };
  } else {
    return {
      allowed: false,
      value: `Allowed values are only: ${allowedValuesList
        .join(", ")
        .slice(0, -2)}!`,
    };
  }
}
