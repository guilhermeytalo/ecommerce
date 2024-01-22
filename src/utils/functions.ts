export const convertDateFormat = (dateStr: string): string => {
  const inputDate = new Date(dateStr);

  if (isNaN(inputDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const year = inputDate.getFullYear();

  const outputDateStr = `${day}/${month}/${year}`;

  return outputDateStr;
};

export const formatCommonName = (commonName: string): string => {
  const formattedName = commonName.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());

  return formattedName;
}