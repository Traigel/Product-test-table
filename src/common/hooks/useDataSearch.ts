export const useDataSearch = <T>(data: T[] | null, columnSearch: string, search: string) => {
  // @ts-ignore
  return data && data.filter(el => (el[columnSearch] + '').toLowerCase().indexOf(search.toLowerCase()) > -1)
}
