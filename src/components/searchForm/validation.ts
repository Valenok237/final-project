export const isValidINN = (value: string) : boolean => {
    const valueToString = value ? value.toString() : ''
    const getN = (index: number) : number => (parseInt(valueToString[index]))
    if(valueToString.length === 10){
      const dgt10 = ((
        2 * getN(0) + 4 * getN(1) + 10 * getN(2) +
        3 * getN(3) + 5 * getN(4) + 9 * getN(5) +
        4 * getN(6) + 6 * getN(7) + 8 * getN(8)
      ) % 11) % 10
      return (getN(9) === dgt10)
    }
    return false
}

export const isValidDate = (date: string):boolean => {

  if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(date)){
    return false;
  }
        
  const parts = date.split(".");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if(year < 1000 || year > 2023 || month === 0 || month > 12) {
    return false;
  }
      
  const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }
      
  return day > 0 && day <= monthLength[month - 1];
};