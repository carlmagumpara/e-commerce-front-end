export const truncate = (string, number) => {
  if (checkIfNullOrEmpty(string)) {
    return null;
  }
  
  if (string.length > number) {
    return string.substring(0,number)+'...';
  }
   
   return string;
};

export const checkIfNullOrEmpty = value => {
  if (typeof value === 'string') {
    value = value.replace(/\s+/g, '');
  }
  return value === '' || value === null || value === 'null' || value === undefined || typeof value === 'undefined';
};

export const numberWithCommas = integer => {
    return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}