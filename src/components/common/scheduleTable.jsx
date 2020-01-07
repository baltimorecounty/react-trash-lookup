import { DefaultDateFormat } from "../../common/Dates";
import Icon from "./Icon";
import React from "react";
import { format } from "date-fns";

const ScheduleTable = ({ schedule = {}, services, renderDayOfWeek }) => {
  const {
    trashDay,
    recycleDay,
    yardWasteDay,
    trashDayOfWeek,
    recycleDayOfWeek,
    yardWasteDayOfWeek
  } = schedule;
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
        <tr>
          <td align="center">
            <Icon aria-hidden="true" iconClass="trash" /> Trash
          </td>
          <td>{trashDayOfWeek}</td>
          <td>{format(trashDay, "M/dd/yyyy")}</td>
        </tr>
        <tr>
          <td align="center">
            <Icon aria-hidden="true" iconClass="recycle" /> Recycling
          </td>
          <td>{recycleDayOfWeek}</td>
          <td>{format(recycleDay, "M/dd/yyyy")}</td>
        </tr>
        <tr>
          <td align="center">
            <Icon aria-hidden="true" iconClass="leaf" /> Yard Waste
          </td>
          <td>{yardWasteDayOfWeek}</td>
          <td>{format(yardWasteDay, "M/dd/yyyy")}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default ScheduleTable;
