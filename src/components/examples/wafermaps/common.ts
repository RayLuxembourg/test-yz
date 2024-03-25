import { type Cell, type QueryResultData } from '@sisense/sdk-data'

export const sortOptions = [
  { value: 'wafer number', text: 'by wafer number' },
  { value: 'yield', text: 'lowest to highest yield' }
]

export type ColumnIndexMap = Record<string, number>
export type CellData = { columns: ColumnIndexMap; cells: Cell[] }

export const sortCells = (
  dataColumns: ColumnIndexMap,
  data: QueryResultData,
  sortBy: string
): Cell[][] => {
  return sortBy === 'wafer number'
    ? data.rows.sort((row1, row2) => row1[dataColumns.WAFER].data - row2[dataColumns.WAFER].data)
    : data.rows.sort((row1, row2) => row1[dataColumns.YIELD].data - row2[dataColumns.YIELD].data)
}

export function getColumnIndexMap(data: QueryResultData): ColumnIndexMap {
  return data.columns.reduce<Record<string, number>>((map, el, index) => {
    map[el.name] = index
    return map
  }, {})
}

export type WaferBinData = {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  xCoords: number[]
  yCoords: string[]
  data: number[][]
}

// Create Wafermap Data Object and populate all values
export const processResult = (queryResult: QueryResultData): WaferBinData => {
  const columnIndexMap = getColumnIndexMap(queryResult)

  const xValues = queryResult.rows.map((row) => row[columnIndexMap.X_COORD].data)
  const yValues = queryResult.rows.map((row) => row[columnIndexMap.Y_COORD].data)
  const xMin = Math.min(...xValues)
  const xMax = Math.max(...xValues)
  const yMin = Math.min(...yValues)
  const yMax = Math.max(...yValues)
  const xCoords: number[] = []
  const yCoords: string[] = []
  for (let i = xMin; i <= xMax; i++) {
    xCoords.push(i)
  }
  for (let i = yMin; i <= yMax; i++) {
    yCoords.push(i.toString())
  }
  const data = queryResult.rows
    .filter((row) => row.length >= 3)
    .map((row) => [
      row[columnIndexMap.X_COORD].data - xMin,
      row[columnIndexMap.Y_COORD].data - yMin,
      row[columnIndexMap.BIN_NUMBER].data
    ])
  return { xMin, yMin, xMax, yMax, xCoords, yCoords, data }
}
