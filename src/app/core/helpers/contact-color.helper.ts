const colors = [
  '#FF5050',
  '#5079FF',
  '#50FF59',
  '#D950FF',
  '#FFAD50',
  '#50FFD5',
  '#FF505A',
  '#FF7850',
  '#78FF50',
  '#505CFF',
  '#FF50C1',
  '#50D9FF',
  '#C1FF50',
  '#B050FF',
  '#FFA450',
  '#50FFB0',
  '#FF508C',
  '#508CFF',
  '#50FF78',
  '#FF5078',
];

export function assignColorBasedOnId(id: number): string {
  return colors[id % colors.length];
}
