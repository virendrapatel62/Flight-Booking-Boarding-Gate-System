const dateToYYYYMMDD = (inputDate = new Date(), sep = "-") => {
  const temp = new Date(inputDate);
  const [date, month, year] = temp
    .toLocaleDateString("US-en", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .split("/");

  return `${year}${sep}${month}${sep}${date}`;
};
export { dateToYYYYMMDD };
