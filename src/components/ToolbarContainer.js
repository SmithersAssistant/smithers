// Dependencies
import { connect } from 'react-redux'

// Actions
import {
    removeCard
} from '../actions/index'

// Component
import Toolbar from './Toolbar'

const mapStateToProps = (state) => ({
    /* Nothing here :) */
})

const mapDispatchToProps = (dispatch) => ({
    // removeCard: (id) => dispatch(removeCard(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)
