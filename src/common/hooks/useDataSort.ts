export const useDataSort = <T>(data: T[] | null, order: OrderType, orderBy: keyof T): T[] | null => {
  if (data) {
    const dataSort = [...data]
    dataSort.sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] > b[orderBy] ? 1 : -1
      } else return a[orderBy] < b[orderBy] ? 1 : -1
    })
    return dataSort
  } else return null
}

// Types
export type OrderType = 'asc' | 'desc';