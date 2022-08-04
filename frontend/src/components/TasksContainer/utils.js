export function compareDueDate(a, b) {
  if (a.dueDate < b.dueDate) return -1
  if (a.dueDate > b.dueDate) return 1
  if (a.priority < b.priority) return -1
  if (a.priority > b.priority) return 1
  return 0
}

export function comparePriority(a, b) {
  if (a.priority < b.priority) return -1
  if (a.priority > b.priority) return 1
  if (a.dueDate < b.dueDate) return -1
  if (a.dueDate > b.dueDate) return 1
  return 0
}