import Icon from "./Icon";
import React from "react";

const ScheduleTable = ({ services, renderDayOfWeek }) => {
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
        {services.map(({ _id, icon, type = "", collectionDays }) => (
          <tr key={_id}>
            <td align="center">
              {icon && (
                <Icon aria-hidden="true" iconClass={icon.toLowerCase()} />
              )}
              {type}
            </td>
            <td>{collectionDays}</td>
            <td>{renderDayOfWeek(type.toLowerCase())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
