
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-widget">
      <h3>📆 Calendar</h3>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default CalendarWidget;
