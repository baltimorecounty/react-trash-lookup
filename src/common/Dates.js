const DefaultDateFormat = "D/M/YYYY";
const DayOfWeekDictionary = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

const GetNextDayOfTheWeek = (
  dayName,
  refDate = new Date(),
  excludeToday = true
) => {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate() +
      !!excludeToday +
      ((dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7)
  );
  return refDate;
};

export { DefaultDateFormat, DayOfWeekDictionary, GetNextDayOfTheWeek };
