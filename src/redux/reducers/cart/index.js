/**
 * Created by vin on 2017/2/4.
 */
import assign from 'UTIL/assign'

import { INC_TO_CART, DEC_FROM_CART } from 'ACTION/cart'
import { REQUEST_SHOP, RECEIVE_SHOP } from 'ACTION/shop'

var initialState = {
	fetching: true,
	shop: {
		tags: []
	},
	selectedCate: 0,
	categories: [],
	ids: [],
	items: {},
	cart: {
		quantity: 0,
		price: 0,
		ids: [],
		items: {}
	}
}

export default function shop(state = initialState, action) {
	var id = action.id
	var item = state.items[id]
	var cart = state.cart
	var data = action.data

	switch (action.type) {
		case REQUEST_SHOP:
			return assign({}, state, { fetching: true })

		case RECEIVE_SHOP:
			if (data.shop.id != state.shop.id) {
				cart = { quantity: 0, price: 0, ids: [], items: {} }
			}
			var ids = []
			var items = {}
			for (var cid in data.products) {
				var category = data.products[cid]
				var itemIds = []
				for (var i in category['products']) {
					var product = category['products'][i]
					var fid = product.id
					itemIds.push(fid)
					items[fid] = product
					if (cart.items[fid] != undefined) {
						items[fid]['quantity'] = cart.items[fid].quantity
					}
				}
				category.items = itemIds
				ids.push(category)
			}
			return assign({}, state, {
				fetching: false,
				shop: data.shop,
				ids: ids,
				items: items,
				cart: cart})

		case INC_TO_CART:
			if (!state.items[id]) return state
			if (item['inventory'] && item['inventory'] != 0)
				item.inventory -= 1
			item.quantity = item.quantity ? item.quantity + 1 : 1
			cart.quantity += 1
			cart.price += item.price
			if (cart.items[id]) {
				var quantity = cart.items[id].quantity + 1
			} else {
				quantity = 1
				cart.ids.push(id)
			}
			cart.items = assign({}, cart.items, {
				[id]: assign({}, state.items[id], {
					quantity: quantity})})
			return assign({}, state, {
				items: assign({}, state.items, {[id]: item}),
				cart: cart})

		case DEC_FROM_CART:
			if (!state.items[id]) return state
			if (item['inventory'] && item['inventory'] != 0)
				item.inventory += 1
			if (item.quantity == 1) {
				delete item.quantity
			} else {
				item.quantity -= 1
			}
			cart.quantity -= 1
			cart.price -= item.price
			if (cart.items[id].quantity == 1) {
				delete cart.items[id]
				cart.ids.splice([cart.ids.indexOf(id)], 1)
			} else {
				cart.items[id].quantity -= 1
			}
			return assign({}, state, {
				items: assign({}, state.items, {[id]: item}),
				cart: cart })
		default:
			return state

	}
}
