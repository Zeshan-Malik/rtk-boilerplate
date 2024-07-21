import { useState } from "react";
import Calendar from "react-calendar";
import "./style.css";

const DSADateRange = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div class="scheduler-calendar">
        <Calendar
          next2Label={false}
          prev2Label={false}
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
    </>
  );
};

export default DSADateRange;
