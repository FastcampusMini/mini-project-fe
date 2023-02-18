export function joinNames(...classnames: string[]): string {
  return classnames.join(' ');
}

export const regex = {
  pw: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
  phone: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
};
