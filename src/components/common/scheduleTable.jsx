import React from 'react';
import Icon from './Icon';
const ScheduleTable = ({ services, renderWeekOfDay }) => {

  return (
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Type</th>
          <th>Collection Days</th>
          <th>Next Collection</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service._id}>
            <td align="center">
              {service.type.toLowerCase() === "trash" ? (
                <Icon iconClass="trash" />
              ) : service.type.toLowerCase() === "leaf" ? (
                <Icon iconClass="leaf" />
              ) : (
                    <Icon iconClass="recycle" />
                  )}
              {service.type}
            </td>
            <td>{service.collectionDays}</td>
            <td>
              {service.type.toLowerCase() === "trash"
                ? renderWeekOfDay("trash")
                : service.type.toLowerCase() === "leaf"
                  ? renderWeekOfDay("leaf")
                  : renderWeekOfDay("recycle")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
