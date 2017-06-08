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
		let s = {'products': [{'id': 1, 'shop_id': 1001, 'name': '煲仔饭', 'is_valid': 1, 'products': [{'id': 100101001, 'shop_id': 1001, 'cate_id': 1, 'name': '蜜汁叉烧饭', 'specs': [{'title': '口味', 'values': [{'id': 10010100101, 'product_id': 100101001, '_': '口味', 'value': '不辣', 'price': 12, 'stock': 999}, {'id': 10010100102, 'product_id': 100101001, '_': '口味', 'value': '微辣', 'price': 12, 'stock': 999}, {'id': 10010100103, 'product_id': 100101001, '_': '口味', 'value': '中辣', 'price': 12, 'stock': 999}, {'id': 10010100104, 'product_id': 100101001, '_': '口味', 'value': '超辣', 'price': 12, 'stock': 999}]}], 'labels': ['新', '招牌'], 'price': 15, 'packing_fee': 1, 'description': '每个饭都配有青菜，卤蛋，加5元送王老吉', 'stock': 999}, {'id': 100101002, 'shop_id': 1001, 'cate_id': 1, 'name': '蜜汁叉烧饭', 'labels': ['辣'], 'price': 15, 'stock': 999}]}], 'shop': {'id': 1001, 'name': '如家快餐厅', 'status': '正在营业', 'tags': ['煲仔饭', '粥粉'], 'booktime': '10: 00-13: 30,  16: 00-19: 30', 'delivertime': '10: 30-16: 30,  16: 30-24: 30', 'logo': 'shop/cover/rujiakuaican.png', 'notice': '提前预定的同学请备注一下送的时间，谢谢。', 'duration': 30}}
		this.props.receiveShop(s)

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
			<div>
				{fetching
					? ''
					: <div className='shop-head' id='head'>
							<div className='shop-notice'>公告</div>
							<div>
								{shop.notice ? shop.notice : '餐厅暂无公告'}
							</div>
						</div>}
				{fetching
					? <Loading content='加载中' />
					: <div>
							<ItemList
									ids={ids}
									items={items} />
						<div className='bar' style={{zIndex: 9999}}>
							<a href='#' className='btn-back'>返回</a>
							{(shop.status == '正在营业' || shop.status == '接受预定')
								? <Cart cart={cart} limit={shop.minimum}/>
								: <div className='btn-cart'>{shop.status}</div>
							}
						</div>
						<CartModal />
					</div>}
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
