import React from 'react'

import { connect } from 'react-redux'
import { toggleTodo, VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}



export default connect(
    state => ({
        list: getVisibleTodos(state.todos, state.visibilityFilter)
    }),
    dispatch => ({
        changeId: id => dispatch(toggleTodo(id))
    })
)(({ list, changeId }) => (

    <ul>
        {list.map(({id, completed, text}) =>

            <li
                key={id}
                onClick={() => changeId(id)}
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
            >{text}</li>
          
        )}
    </ul>
))
