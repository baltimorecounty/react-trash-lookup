import React from 'react';
import ScheduleTable from './scheduleTable';
const TrashSchedule = ({ services, renderDayofWeek }) => {

    return (
        <div className="row">
            <div className="col-5">
                <ScheduleTable
                    services={services}
                    renderDayofWeek={renderDayofWeek}
                />
                <h6>Download</h6>
                {/* <a href="/test">{dowloadMessage}</a> */}
            </div>
        </div>
    )
};


export default TrashSchedule;
