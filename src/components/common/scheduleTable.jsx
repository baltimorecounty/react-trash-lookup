import React from "react";
import ScheduleTableRow from "./ScheduleTableRow";

const ScheduleTable = ({ schedule = {} }) => {
  const {
    trashDay,
    recycleDay,
    yardWasteDay,
    trashDayOfWeek,
    recycleDayOfWeek,
    yardWasteDayOfWeek
  } = schedule;

  return (
    <table id="trash-schedule" className="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Type</th>
          <th>Collection Days</th>
          <th>Next Collection</th>
        </tr>
      </thead>
      <tbody>
        <ScheduleTableRow
          dayOfWeek={trashDayOfWeek}
          iconClass="trash"
          label="Trash"
          nextPickUpDate={trashDay}
        />
        <ScheduleTableRow
          dayOfWeek={recycleDayOfWeek}
          iconClass="recycle"
          label="Recycling"
          nextPickUpDate={recycleDay}
        />
        <ScheduleTableRow
          dayOfWeek={yardWasteDayOfWeek}
          iconClass="leaf"
          label="Yard Waste"
          nextPickUpDate={yardWasteDay}
        />
      </tbody>
    </table>
  );
};
export default ScheduleTable;
