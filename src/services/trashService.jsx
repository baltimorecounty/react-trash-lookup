const trashservices = [
  {
    _id: '1',
    type: 'Trash',
    collectionDays: 'Monday and Saturday',
    nextCollection: 'January 11th',
  },
  {
    _id: '2',
    type: 'Recycle',
    collectionDays: 'Friday',
    nextCollection: 'January 10th',
  },
  {
    _id: '3',
    type: 'Leaf',
    collectionDays: 'Every other Friday',
    nextCollection: 'April 9th',
  },
];
export function getTrashService() {
  return trashservices;
}
