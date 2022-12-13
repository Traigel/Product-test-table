import {dataTableReducer, DataType, setAllChecked, setCheckedItem, setError, setServerMessages, WeatherInitialStateType} from './dataTable-reducer';
import {getDocuments, submitItemsIds} from './dataTable-actions';
import {RootDocumentsType} from '../../api';

let state: WeatherInitialStateType
let data: DataType
let rootDocuments: RootDocumentsType

beforeEach(() => {
  state = {
    isInitialized: false,
    status: 'idle',
    error: undefined,
    serverMessages: null,
    data: [data],
    allChecked: false
  }
  data = {
    id: '1',
    checked: false,
    name: 'Milk',
    status: 'active',
    volume: 2,
    sum: 5,
    qty: 3,
    deliveryDate: '2022-12-19',
    currency: 'byn',
    total: 15
  }
  rootDocuments = ['123', 'active', 5, 3, 2, 'Crisps', '2022-12-19', 'byn']
})

test('set all checked', () => {
  const dataTableReducerTest = dataTableReducer(state, setAllChecked({checked: true}))
  expect(dataTableReducerTest.allChecked).toBe(true)
})

test('set server messages', () => {
  const dataTableReducerTest = dataTableReducer(state, setServerMessages({ serverMessages: 'serverMessages' }))
  expect(dataTableReducerTest.serverMessages).toBe('serverMessages')
})

test('set error', () => {
  const dataTableReducerTest = dataTableReducer(state, setError({ error: 'serverError' }))
  expect(dataTableReducerTest.error).toBe('serverError')
})

test('get documents', () => {
  const action = getDocuments.fulfilled([rootDocuments, rootDocuments], 'requestId')
  const dataTableReducerTest = dataTableReducer(state, action)
  expect(dataTableReducerTest.data?.length).toBe(2)
  expect(dataTableReducerTest.data![0].name).toBe('Crisps')
})

test('get documents', () => {
  const action = submitItemsIds.fulfilled({messages: 'serverMessagesText'}, 'requestId', ['1','2','3'])
  const dataTableReducerTest = dataTableReducer(state, action)
  expect(dataTableReducerTest.serverMessages).toBe('serverMessagesText')
})