let counter = 0;

export default function generateId() {
  return `form-ujs-${++counter}`;
}
