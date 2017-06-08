/**
 * Created by vin on 2017/2/4.
 */

import assign from 'UTIL/assign'

import { REQUEST_REGIONS, RECEIVE_REGIONS,
	FETCH_SUGGEST_REGION } from 'ACTION/region'

var initialState = {
	fetching: false,
	suggestion: {},
	region: {},
	regions: []
}

export default function shops(state = initialState, action) {
	switch (action.type) {
		case REQUEST_REGIONS:
			return assign({}, state, { fetching: true })
		case RECEIVE_REGIONS:
			return assign({}, state,
				{ fetching: false, regions: action.data })
		case FETCH_SUGGEST_REGION:
			return assign({}, state, { suggestion: action.data })
		default:
			return state
	}
}
