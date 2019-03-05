import React from "react";
import Trash from "./trash";
import Leaf from "./leaf";
import Recycle from "./recycle";
const ScheduleTable = ({ services, renderWeekOfDay }) => {
  // const {services,renderWeekOfDay} = props;

   return (
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Type</th>
          <th>Image</th>
          <th>Collection Days</th>
          <th>Next Collection</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service._id}>
            <td>{service.type}</td>
            <td align="center">
              {service.type === "Trash" ? (
                <Trash />
              ) : service.type === "Leaf" ? (
                <Leaf />
              ) : (
                <Recycle />
              )}
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