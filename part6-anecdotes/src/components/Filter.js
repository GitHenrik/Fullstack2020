import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = ({ filter, updateFilter }) => {

  //const filterValue = useSelector(state => state.filter)
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    //dispatch(updateFilter(event.target.value))
    updateFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }



  return (
    <div style={style}>
      Filter<input onChange={handleChange} value={filter} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  updateFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
//export default Filter
export default connectedFilter