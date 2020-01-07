const trashservices = [
  {
    _id: "1",
    type: "Trash",
    collectionDays: "Monday and Saturday",
    nextCollection: "January 11th",
    icon: "trash"
  },
  {
    _id: "2",
    type: "Recycle",
    collectionDays: "Friday",
    nextCollection: "January 10th",
    icon: "recycle"
  },
  {
    _id: "3",
    type: "Yard Waste",
    collectionDays: "Every other Friday",
    nextCollection: "April 9th",
    icon: "leaf"
  }
];
export function getTrashService() {
  return trashservices;
}
