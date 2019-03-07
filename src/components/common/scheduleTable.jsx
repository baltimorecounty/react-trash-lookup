import React from "react";
import Icon from "./Icon";
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
              {service.type === "Trash" ? (
                <Icon iconClass="trash" />
              ) : service.type === "Leaf" ? (
                <Icon iconClass="leaf" />
              ) : (
                <Icon iconClass="recycle" />
              )}{service.type}
            </td>
            <td>{service.collectionDays}</td>
            <td>
              {service.type === "Trash"
                ? renderWeekOfDay(1)
                : service.type === "Leaf"
                ? renderWeekOfDay(3)
                : renderWeekOfDay(2)}
            </td>
          </tr>
        ))}
      </tbody> 
    </table>
  );
};
export default ScheduleTable;
