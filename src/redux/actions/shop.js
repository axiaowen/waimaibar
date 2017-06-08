
export const REQUEST_SHOP = 'REQUEST_SHOP'
export const RECEIVE_SHOP = 'RECEIVE_SHOP'

const requestShop = () => ({
	type: REQUEST_SHOP
})

const receiveShop = (data) => ({
	type: RECEIVE_SHOP,
	data
})

const fetchShop = () => {
	receiveShop()
}

export default {
	requestShop, receiveShop, fetchShop
}
