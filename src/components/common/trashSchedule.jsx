import React from 'react';
import ScheduleTable from './scheduleTable';
const TrashSchedule = ({ services, renderWeekOfDay }) => {

    return (
        <div className="row">
            <div className="col-5">
                <ScheduleTable
                    services={services}
                    renderWeekOfDay={renderWeekOfDay}
                />
                <h6>Download</h6>
                {/* <a href="/test">{dowloadMessage}</a> */}
            </div>
        </div>
    )
};


export default TrashSchedule;
