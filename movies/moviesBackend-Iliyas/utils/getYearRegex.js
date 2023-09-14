const getYearRegex = (movieYear) => {
  const [startDate, endDate] = movieYear.split("-");
  return {
    $gte: `${startDate}-01-01`,
    $lte: `${endDate}-12-12`,
  };
};

export default getYearRegex;
