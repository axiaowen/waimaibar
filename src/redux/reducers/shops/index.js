/**
 * Created by vin on 2017/2/4.
 */
import assign from 'UTIL/assign'
import { REQUEST_SHOPS, RECEIVE_SHOPS } from 'ACTION/shops'

var initialState = {
	fetching: false,
	data: [],
	region: {
		id: 0
	}
}

export default function shops(state = initialState, action) {
	switch (action.type) {
		case REQUEST_SHOPS:
			return assign({}, state, { fetching: true })
		case RECEIVE_SHOPS:
			return assign({}, state,
				{ fetching: false, data: action.data })
		default:
			return state
	}
}
