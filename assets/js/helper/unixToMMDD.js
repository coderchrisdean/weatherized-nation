const unixToDate = {
    unixToMMDD: function (unix) {
      const date = new Date(unix * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}/${day}`;
    },
    getDayOfWeek: function (unix) {
      const date = new Date(unix * 1000);
      const day = date.getDay();
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return dayOfWeek[day];
    }
  };

  module.exports = unixToDate;
  