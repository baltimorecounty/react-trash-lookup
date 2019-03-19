import React from 'react';
import Icon from './Icon';
const ScheduleTable = ({ services, renderDayofWeek }) => {

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
                <Icon iconClass={service.type.toLowerCase()} />
              ) : service.type.toLowerCase() === "leaf" ? (
                <Icon iconClass={service.type.toLowerCase()} />
              ) : (
                    <Icon iconClass={service.type.toLowerCase()} />
                  )}
              {service.type}
            </td>
            <td>{service.collectionDays}</td>
            <td>
              {service.type.toLowerCase() === "trash"
                ? renderDayofWeek(service.type.toLowerCase())
                : service.type.toLowerCase() === "leaf"
                  ? renderDayofWeek(service.type.toLowerCase())
                  : renderDayofWeek(service.type.toLowerCase())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
