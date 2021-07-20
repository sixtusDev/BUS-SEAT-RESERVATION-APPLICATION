const moment = require("moment");
const start = moment("2021-07-21T06:30:00.000+00:00");
const end = moment("2021-07-21T10:00:00.000+00:00");
const timespan = end - start;
console.log(moment(timespan).format("HH:mm A"));
const duration = moment(timespan).toDate();
console.log(duration);
const output = moment();
