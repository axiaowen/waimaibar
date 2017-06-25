import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

import './index.css'
import CartItem from './Section/CartItem'
import AddressSection from './Section/AddressSection'
import TimeSection from './Section/TimeSection'
import NoteSection from './Section/NoteSection'
import PaymentSection from './Section/PaymentSection'
import 'COMPONENT/checkbox.css'

class CartPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paytype: 0,
			time: 0,
			note: '',
			uploading: false
		}
		this.submitOrder = this.submitOrder.bind(this)
	}

	componentWillMount() {
		document.title = '购物车'
	}

	submitOrder() {
		this.setState({uploading: true})

		const tel = localStorage.getItem('tel')
		const address = localStorage.getItem('address')
		const { time, paytype, note } = this.state
		const { shop, cart } = this.props

		if (!tel || !address) {
			alert('请填写送餐地址')
			this.setState({uploading: false})
			return
		}

		let order = {
			'openid': '',
			'phone': tel,
			'address': address,
			'id': shop.id,
			'cart': JSON.stringify(cart.ids.map(id => cart.items[id])),
			'book_time': time == 0 ? '' : time,
			'note': (time == 0 ? '' : `预约${time}送达，`) + note,
			'amount': cart.price,
			'quantity': cart.quantity,
			'paytype': paytype
		}

		let data = ''
		Object.keys(order).forEach(key => data += `${key}=${order[key]}&`)

		fetch(`api/order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data
		}).then(res => res.json())
			.then(data => {
			window.location.href = '#/confirm'
			localStorage.setItem("order", data.id)
		}).catch(error => {
			console.log(error)
			alert('无法提交订单')
			this.setState({uploading: false})
		})
	}

	setNote(note) {
		this.setState({note: note})
	}

	render() {
		const { uploading } = this.state
		const { shop, cart } = this.props
		return (
			<div>
				<div style={{marginBottom: '50px'}}>
					<CartItem cart={cart} />
					<AddressSection />
					<TimeSection timelist={shop.schedule} />
					<NoteSection setNote={this.setNote.bind(this)} />
					<PaymentSection payments={shop.payments} />
				</div>
				<div className="bar">
					<a href={`#shop/${shop.id}`} className="btn-back">
						返回
					</a>
					{uploading
						? <div className="btn-upload disable">订单提交中...</div>
						: (cart.ids.length == 0)
              ? <div className="btn-upload disable">
                  提交订单 <i className='arrow btn'></i>
                </div>
              : <div
									className="btn-upload"
									onClick={this.submitOrder}>
                  提交订单 <i className='arrow btn'></i>
                </div>}
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		shop: state.shop.shop,
		cart: state.shop.cart
	}),
	{ }
)(CartPage)
