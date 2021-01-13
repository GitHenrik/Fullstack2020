const filterAtStart = ''

export const updateFilter = value => {
  return {
    type: 'UPDATE_FILTER',
    data: value
  }
}


//template for course task 6.12
const filterReducer = (filter = filterAtStart, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.data
    default:
      return filter
  }
}

export default filterReducer