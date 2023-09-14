export const sortOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: JSON.stringify({ release_date: -1 }),
    label: "Latest",
  },
  {
    value: JSON.stringify({ release_date: 1 }),
    label: "Oldest",
  },
  {
    value: JSON.stringify({ vote_average: -1 }),
    label: "Rating",
  },
  {
    value: JSON.stringify({ vote_count: -1 }),
    label: "Likes",
  },
  {
    value: JSON.stringify({ title: 1 }),
    label: "Alphabetical",
  },
];

export const ratingOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "9",
    label: "9+",
  },
  {
    value: "8",
    label: "8+",
  },
  {
    value: "7",
    label: "7+",
  },
  {
    value: "6",
    label: "6+",
  },
  {
    value: "5",
    label: "5+",
  },
  {
    value: "4",
    label: "4+",
  },
  {
    value: "3",
    label: "3+",
  },
  {
    value: "2",
    label: "2+",
  },
  {
    value: "1",
    label: "1+",
  },
];

export const yearOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2019",
    label: "2019",
  },
  {
    value: "2015-2018",
    label: "2015-2018",
  },
  {
    value: "2010-2014",
    label: "2010-2014",
  },
  {
    value: "2000-2009",
    label: "2000-2009",
  },
  {
    value: "1990-1999",
    label: "1990-1999",
  },
  {
    value: "1980-1989",
    label: "1980-1989",
  },
  {
    value: "1970-1979",
    label: "1970-1979",
  },
  {
    value: "1950-1969",
    label: "1950-1969",
  },
  {
    value: "1900-1949",
    label: "1900-1949",
  },
];
