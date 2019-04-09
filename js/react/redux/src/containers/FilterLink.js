import React from 'react'

import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'

const mapStateToProps = (state, ownProps) => {
	// console.log(state, ownProps)
	return {
	  active: ownProps.filter === state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ active, children, onClick }) => (
    <button
       onClick={onClick}
       disabled={active}
       style={{
           marginLeft: '4px',
       }}
    >
      {children}
    </button>
))
