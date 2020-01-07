import React from "react";
import ResetForm from "./ResetForm";
import ScheduleTable from "./scheduleTable";

const TrashSchedule = ({
  services,
  renderDayOfWeek,
  address,
  fullAddress,
  resetForm,
  schedule = {}
}) => {
  return (
    <div>
      {fullAddress ? (
        <ScheduleTable
          schedule={schedule}
          services={services}
          renderDayOfWeek={renderDayOfWeek}
        />
      ) : (
        <div className="alert alert--danger" role="alert">
          <p>We were unable to find a schedule for {address}.</p>
          <ResetForm resetForm={resetForm} />
        </div>
      )}
      {/*  <h6>Download</h6>
        TODO: This feature will be enable in future
                <a href="/test">{dowloadMessage}</a> */}
    </div>
  );
};

export default TrashSchedule;
