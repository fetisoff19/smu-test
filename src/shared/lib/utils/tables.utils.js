export function sortingTable (rowA, rowB, columnId) {
  const [a, b] = [rowA.getValue(columnId), rowB.getValue(columnId)]
  if (a && b) return a.toString().localeCompare(b)
  if (a && !b) return -1
  if (!a && b) return 1
  return 0
}

export function toFixed2Cell (value) {
  value = value.getValue() ? +value.getValue() : 0
  return +value.toFixed(2)
}

export function getLabelsForInputs (obj) {
  const labels = []
  for (const key in obj) {
    if (obj[key].formElement && !obj[key].readOnly && !obj[key].rolesId && !obj[key].formElement.includes('-')) {
      labels.push(key)
    }
  } return labels
}
