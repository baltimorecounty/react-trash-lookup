import Icon from "./Icon";
import React from "react";

const ScheduleTable = ({ services, renderDayOfWeek }) => {
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
              <Icon iconClass={service.type.toLowerCase()} />
              {service.type}
            </td>
            <td>{service.collectionDays}</td>
            <td>{renderDayOfWeek(service.type.toLowerCase())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
