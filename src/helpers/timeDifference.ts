export const timeDifference = (date1: Date, date2: Date): string => {
  let difference = date1.getTime() - date2.getTime();

  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  let secondsDifference = Math.floor(difference / 1000);

  if (daysDifference >= 1) {
    return daysDifference + "days ago";
  } else if (hoursDifference >= 1) {
    return hoursDifference + "hours ago";
  } else if (minutesDifference >= 1) {
    return minutesDifference + "minutes ago";
  } else if (secondsDifference >= 1) {
    return secondsDifference + "seconds ago";
  } else {
    return "now";
  }
};
