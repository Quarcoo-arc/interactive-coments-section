export const timeDifference = (date1: Date, date2: Date): string => {
  let difference = date1.getTime() - date2.getTime();

  let yearsDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
  difference -= yearsDifference * 1000 * 60 * 60 * 24 * 365;

  let monthsDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
  difference -= monthsDifference * 1000 * 60 * 60 * 24 * 30;

  let weeksDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);
  difference -= weeksDifference * 1000 * 60 * 60 * 24 * 7;

  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  let secondsDifference = Math.floor(difference / 1000);
  if (yearsDifference >= 1) {
    return yearsDifference + ` year${yearsDifference > 1 ? "s" : ""} ago`;
  } else if (monthsDifference >= 1) {
    return monthsDifference + ` month${monthsDifference > 1 ? "s" : ""} ago`;
  } else if (weeksDifference >= 1) {
    return weeksDifference + ` week${weeksDifference > 1 ? "s" : ""} ago`;
  } else if (daysDifference >= 1) {
    return daysDifference + ` day${daysDifference > 1 ? "s" : ""} ago`;
  } else if (hoursDifference >= 1) {
    return hoursDifference + ` hour${hoursDifference > 1 ? "s" : ""} ago`;
  } else if (minutesDifference >= 1) {
    return minutesDifference + ` minute${minutesDifference > 1 ? "s" : ""} ago`;
  } else if (secondsDifference >= 4) {
    return secondsDifference + " seconds ago";
  } else {
    return "just now";
  }
};
