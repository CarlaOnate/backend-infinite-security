
export const validatePasswordStrength = (password) => {
  const regex = new RegExp(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}$/)
  return password.match(regex)
}