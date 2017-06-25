import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

import Loading from 'COMPONENT/Loading'
import ItemList from './ItemList'
import Cart from './Cart'
import CartModal from './CartModal'
import './index.css'

class ShopPage extends Component {
	componentWillMount() {
		this.props.requestShop()

		fetch(`api/shop?id=${this.props.params.id}`)
			.then(res => res.json())
			.then(data => {
				this.props.receiveShop(data)
				document.title = data.shop.name
			})
	}
	render() {
		const { fetching, cart, shop, ids, items } = this.props
		return (
			fetching
				? <Loading content='加载中' />
				: <div>
						<div className='shop-head' id='head'>
							<div className='shop-notice'>公告</div>
							<div>
								{shop.notice ? shop.notice : '餐厅暂无公告'}
							</div>
						</div>
						<ItemList
							ids={ids}
							items={items} />
						<div className='bar' style={{zIndex: 9999}}>
							<a href='#' className='btn-back'>返回</a>
							{(shop.status == '正在营业' || shop.status == '接受预定')
								? <Cart cart={cart} limit={shop.minimum}/>
								: <div className='btn-cart'>{shop.status}</div>}
						</div>
						<CartModal />
					</div>
		)
	}
}

export default connect(
	(state) => ({
		shop: state.shop.shop,
		ids: state.shop.ids,
		items: state.shop.items,
		cart: state.shop.cart,
		fetching: state.shop.fetching}),
	require('ACTION/shop').default,
)(ShopPage)
