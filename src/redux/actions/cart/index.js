/**
 * Created by vin on 2017/2/4.
 */

export const INC_TO_CART = 'INC_TO_CART'
export const DEC_FROM_CART = 'DEC_FROM_CART'


const incToCart = (id) => ({
	type: INC_TO_CART,
	id
})

const decFromCart = (id) => ({
	type: DEC_FROM_CART,
	id
})

export default {
	INC_TO_CART, DEC_FROM_CART,
	incToCart, decFromCart
}
