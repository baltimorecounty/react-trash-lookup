import Icon from "./Icon";
import PropTypes from "prop-types";
import React from "react";
import { format } from "date-fns";

const ScheduleTableRow = ({
  label,
  iconClass,
  dayOfWeek,
  nextCollectionDate
}) => (
  <tr>
    <td align="center">
      {iconClass && <Icon aria-hidden="true" iconClass={iconClass} />} {label}
    </td>
    <td>{dayOfWeek}</td>
    <td>{format(nextCollectionDate, "M/d/yyyy")}</td>
  </tr>
);

ScheduleTableRow.propTypes = {
  /** Label to describe the type of collection */
  label: PropTypes.string.isRequired,
  /** Visual icon to describe the type of collection */
  iconClass: PropTypes.string,
  /** Day of week that the collection occurs */
  dayOfWeek: PropTypes.string.isRequired,
  /** Date of next collection */
  nextCollectionDate: PropTypes.object.isRequired
};

export default ScheduleTableRow;
