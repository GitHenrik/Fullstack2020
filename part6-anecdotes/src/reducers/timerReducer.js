/**
 * This reducer is used to prevent timeouts overlapping and affecting each other / course task 6.21.
 */
const defaultId = setTimeout(() => { }, 1)

export const updateTimerId = id => {
  return {
    type: 'UPDATE_TIMER',
    data: id
  }
}

const timerReducer = (id = defaultId, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return action.data
    default:
      return id
  }
}

export default timerReducer