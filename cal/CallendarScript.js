const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



const eventsArr = [];
getEvents();
console.log(eventsArr);


// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];



//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

const addBulkEventsBtn = document.querySelector(".add-bulk-events");

addBulkEventsBtn.addEventListener("click", () => {
    const bulkEvents = [
    // August 2023
    { day: 7, month: 8, year: 2023, events: [{ title: "Start of Reporting of Faculty\nGeneral Registration for 1st Semester", time: "00:00 AM - 23:59 PM" }] },
    { day: 7, month: 8, year: 2023, events: [{ title: "First Year", time: "00:00 AM - 23:59 PM" }] },
    { day: 9, month: 8, year: 2023, events: [{ title: "Fourth Year and Fifth Year (without Middle Term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 8, year: 2023, events: [{ title: "Third year(w/o Middle term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 11, month: 8, year: 2023, events: [{ title: "Second year (without Middle Term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 14, month: 8, year: 2023, events: [{ title: "Fourth and Fifth year (with Middle Term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 15, month: 8, year: 2023, events: [{ title: "Third year(w/ Middle Term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 16, month: 8, year: 2023, events: [{ title: "Second year (with Middle term)", time: "00:00 AM - 23:59 PM" }] },
    { day: 17, month: 8, year: 2023, events: [{ title: "Irregular Students", time: "00:00 AM - 23:59 PM" }] },

    // September 2023
    { day: 5, month: 9, year: 2023, events: [{ title: "Last day of adding/Changing of subjects", time: "00:00 AM - 23:59 PM" }] },

    // October 2023
    { day: 2, month: 10, year: 2023, events: [{ title: "Deadline for Filing the Application for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 9, month: 10, year: 2023, events: [{ title: "Deadline for Submission of the Tentative list for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 10, year: 2023, events: [{ title: "Deadline for Dropping Subjects", time: "00:00 AM - 23:59 PM" }] },
    { day: 17, month: 10, year: 2023, events: [{ title: "Midterm Examination", time: "00:00 AM - 23:59 PM" }] },

    // December 2023
    { day: 11, month: 12, year: 2023, events: [{ title: "Last Day of Thesis Final Defense", time: "00:00 AM - 23:59 PM" }] },
    { day: 14, month: 12, year: 2023, events: [{ title: "Final Examination (Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 19, month: 12, year: 2023, events: [{ title: "Final Examination (Non-Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 22, month: 12, year: 2023, events: [{ title: "End of Semester", time: "00:00 AM - 23:59 PM" }] },

    // January 2024
    { day: 8, month: 1, year: 2024, events: [{ title: "Start of Reporting of Faculty\nGeneral Registration for 2nd Semester", time: "00:00 AM - 23:59 PM" }] },
    { day: 11, month: 1, year: 2024, events: [{ title: "Deadline for Submission of First Semester Grades (Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 12, month: 1, year: 2024, events: [{ title: "Deadline for Submission of First Semester Grades (Non Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 15, month: 1, year: 2024, events: [{ title: "Fourth Year and Fifth Year Enrollment", time: "00:00 AM - 23:59 PM" }] },
    { day: 16, month: 1, year: 2024, events: [{ title: "Third year Enrollment", time: "00:00 AM - 23:59 PM" }] },
    { day: 17, month: 1, year: 2024, events: [{ title: "Second year Enrollment", time: "00:00 AM - 23:59 PM" }] },
    { day: 18, month: 1, year: 2024, events: [{ title: "First year Enrollment", time: "00:00 AM - 23:59 PM" }] },
    { day: 19, month: 1, year: 2024, events: [{ title: "Irregular students Enrollment", time: "00:00 AM - 23:59 PM" }] },
    { day: 22, month: 1, year: 2024, events: [{ title: "Start of Classes", time: "00:00 AM - 23:59 PM" }] },

    // February 2024
    { day: 5, month: 2, year: 2024, events: [{ title: "Last. Day of Adding/Changing Subjects", time: "00:00 AM - 23:59 PM" }] },

    // March 2024
    { day: 4, month: 3, year: 2024, events: [{ title: "Deadline for Filing the Application for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 11, month: 3, year: 2024, events: [{ title: "Deadline for Submission of the Tentative List for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 12, month: 3, year: 2024, events: [{ title: "Deadline for Dropping Subjects", time: "00:00 AM - 23:59 PM" }] },
    { day: 19, month: 3, year: 2024, events: [{ title: "Midterm Examination", time: "00:00 AM - 23:59 PM" }] },

    // May 2024
    { day: 13, month: 5, year: 2024, events: [{ title: "Last Day of Thesis Final Defense", time: "00:00 AM - 23:59 PM" }] },
    { day: 16, month: 5, year: 2024, events: [{ title: "Final Examination (Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 21, month: 5, year: 2024, events: [{ title: "Final Examination (Non-Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 24, month: 5, year: 2024, events: [{ title: "End of Semester", time: "00:00 AM - 23:59 PM" }] },

    // June 2024
    { day: 7, month: 6, year: 2024, events: [{ title: "Deadline for Submission of Second Semester Grades (Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 6, year: 2024, events: [{ title: "Deadline for Submission of Second Semester Grades (Non-Graduating)", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 6, year: 2024, events: [{ title: "General Registration for Mid-year", time: "00:00 AM - 23:59 PM" }] },
    { day: 11, month: 6, year: 2024, events: [{ title: "Fourth Year and Fifth Year", time: "00:00 AM - 23:59 PM" }] },
    { day: 13, month: 6, year: 2024, events: [{ title: "Third Year", time: "00:00 AM - 23:59 PM" }] },
    { day: 14, month: 6, year: 2024, events: [{ title: "Second Year", time: "00:00 AM - 23:59 PM" }] },
    { day: 17, month: 6, year: 2024, events: [{ title: "Irregular Students", time: "00:00 AM - 23:59 PM" }] },
    { day: 25, month: 6, year: 2024, events: [{ title: "Start of Classes", time: "00:00 AM - 23:59 PM" }] },

    // July 2024
    { day: 4, month: 7, year: 2024, events: [{ title: "Midterm Examination", time: "00:00 AM - 23:59 PM" }] },
    { day: 9, month: 7, year: 2024, events: [{ title: "Deadline for Filing the Application for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 12, month: 7, year: 2024, events: [{ title: "Deadline for Submission of the Tentative List for Graduation", time: "00:00 AM - 23:59 PM" }] },
    { day: 25, month: 7, year: 2024, events: [{ title: "Final Examination(Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 26, month: 7, year: 2024, events: [{ title: "Final Examination (Non- Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 26, month: 7, year: 2024, events: [{ title: "End of Semester", time: "00:00 AM - 23:59 PM" }] },

    // August 2024
    { day: 9, month: 8, year: 2024, events: [{ title: "Deadline for Submission of Mid-year Class Grades (Graduating and Non-Graduating Students)", time: "00:00 AM - 23:59 PM" }] },

    // Holidays
    { day: 9, month: 8, year: 2023, events: [{ title: "Holiday", time: "00:00 AM - 23:59 PM" }] },
    { day: 21, month: 8, year: 2023, events: [{ title: "Ninoy Aquino Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 28, month: 8, year: 2023, events: [{ title: "National Heroes Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 1, month: 11, year: 2023, events: [{ title: "All Saints Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 2, month: 11, year: 202, events: [{ title: "All Souls Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 27, month: 11, year: 2023, events: [{ title: "Bonifacio Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 8, month: 12, year: 2023, events: [{ title: "Feast of the Immaculate Conception of Mary", time: "00:00 AM - 23:59 PM" }] },
    { day: 25, month: 12, year: 2023, events: [{ title: "Christmas Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 30, month: 12, year: 2023, events: [{ title: "Rizal Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 31, month: 12, year: 2023, events: [{ title: "New Year's Eve", time: "00:00 AM - 23:59 PM" }] },
    { day: 1, month: 1, year: 2024, events: [{ title: "New Year Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 2, year: 2024, events: [{ title: "Lunar New Year's Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 25, month: 2, year: 2024, events: [{ title: "EDSA People Power Anniversary", time: "00:00 AM - 23:59 PM" }] },
    { day: 28, month: 3, year: 2024, events: [{ title: "Maundy Thursday", time: "00:00 AM - 23:59 PM" }] },
    { day: 29, month: 3, year: 2024, events: [{ title: "Good Friday", time: "00:00 AM - 23:59 PM" }] },
    { day: 30, month: 3, year: 2024, events: [{ title: "Black Saturday", time: "00:00 AM - 23:59 PM" }] },
    { day: 5, month: 4, year: 2024, events: [{ title: "Pangasinan Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 9, month: 4, year: 2024, events: [{ title: "The Day of Valor", time: "00:00 AM - 23:59 PM" }] },
    { day: 10, month: 4, year: 2024, events: [{ title: "Eidul-Fitar", time: "00:00 AM - 23:59 PM" }] },
    { day: 1, month: 5, year: 2024, events: [{ title: "Labor Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 12, month: 6, year: 2024, events: [{ title: "Independence Day", time: "00:00 AM - 23:59 PM" }] },
    { day: 22, month: 8, year: 2024, events: [{ title: "Deadline for Submission of Mid-year Class Grades (Graduating and Non-Graduating Students)", time: "00:00 AM - 23:59 PM" }] },
    { day: 9, month: 8, year: 2024, events: [{ title: "Holiday", time: "00:00 AM - 23:59 PM" }] },

    ];

    addBulkEvents(bulkEvents);
});



const deleteAllEventsBtn = document.querySelector(".delete-all-events");

deleteAllEventsBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all events?")) {
        deleteAllEvents();
    }
});



//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});


//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

function addBulkEvents(bulkEvents) {
  bulkEvents.forEach((event) => {
      let eventExist = false;
      eventsArr.forEach((existingEvent) => {
          if (
              event.day === existingEvent.day &&
              event.month === existingEvent.month &&
              event.year === existingEvent.year
          ) {
              eventExist = true;
              existingEvent.events.push(...event.events);
          }
      });

      if (!eventExist) {
          eventsArr.push(event);
      }
  });

  saveEvents();
  initCalendar(); // Update the calendar to reflect the new events
}



function deleteAllEvents() {
  eventsArr.splice(0, eventsArr.length); // Clear the eventsArr array
  saveEvents();
  initCalendar(); // Update the calendar to reflect the removal of all events
}


