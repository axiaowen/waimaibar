/**
 * Created by vin on 2017/2/4.
 */

export const REQUEST_REGIONS = 'REQUEST_REGIONS'
export const RECEIVE_REGIONS = 'RECEIVE_REGIONS'
export const FETCH_SUGGEST_REGION = 'FETCH_SUGGEST_REGION'

const requestRegions = () => ({
	type: REQUEST_REGIONS
})

const receiveRegions = (data) => ({
	type: RECEIVE_REGIONS,
	data
})

const fetchSuggestRegion = (data) => ({
	type: FETCH_SUGGEST_REGION,
	data
})

export default {
	requestRegions, receiveRegions, fetchSuggestRegion
}
