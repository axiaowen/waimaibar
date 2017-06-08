/**
 * Created by vin on 2017/2/4.
 */

export const REQUEST_SHOPS = 'REQUEST_SHOPS'
export const RECEIVE_SHOPS = 'RECEIVE_SHOPS'

const requestShops = () => ({
	type: REQUEST_SHOPS
})

const receiveShops = (data) => ({
	type: RECEIVE_SHOPS,
	data
})

const fetchShops = () => {
	receiveShops()
}

export default {
	requestShops, receiveShops, fetchShops
}
