import React from "react";
import ScheduleTable from "./scheduleTable";

const TrashSchedule = ({ services, renderDayOfWeek }) => {
  return (
    <div className="row">
      <div className="col-5">
        <ScheduleTable services={services} renderDayOfWeek={renderDayOfWeek} />
        <h6>Download</h6>
        {/*  TODO: This feature will be enable in future
                <a href="/test">{dowloadMessage}</a> */}
      </div>
    </div>
  );
};

export default TrashSchedule;
