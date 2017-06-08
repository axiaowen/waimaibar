/**
 * Created by vin on 2017/2/3.
 */

import React, {Component} from 'react'
import 'whatwg-fetch'

import CartItemList from 'COMPONENT/CartItemList'
import './index.css'

export default class Name extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFetching: true,
			order: {}
		}
		this.fetchOrder = this.fetchOrder.bind(this)
		this.cancelOrder = this.cancelOrder.bind(this)
	}

	componentDidMount() {
		document.title = '订单详情'
		this.fetchOrder(this.props.params.id)
	}

	fetchOrder(id) {
		this.setState({isFetching: true})
		let user = '0'
		fetch(`api/user/${user}/order/${id}`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					order: data,
					isFetching: false
				})
			})
	}

	updateOrderStatus(id, move) {
		let user = 0
		fetch(`api/user/${user}/order/${id}/${move}`)
			.then(res => res.json())
	}

	cancelOrder() {
		this.updateOrderStatus(this.props.params.id, 'cancel')
	}

	getPredictTime(order) {
		let duration = 30
		let ctime = new Date(order.create_time)
		ctime.setMinutes(ctime.getMinutes() + duration)
		console.log(ctime.toTimeString())
		return ctime.toTimeString().substr(0, 5)
	}

	render() {
		const { isFetching, order } = this.state
		if (isFetching) {
			return <div></div>
		}
		return (
			<div>
				<div className="order-section">
					<div className="order-status">等待商家接单</div>
					<div className="order-btn-area">
						<a
							onClick={this.cancelOrder}
							className="order-btn"
						>取消订单</a>
					</div>
				</div>
				<div className="order-section">
						<a href={`#/shop/${order.shop_id}`}>
							<div className="order-section-title">
								{order.shop_name} <i className="arrow"></i>
							</div>
						</a>
					<div style={{padding: '0px 10px 10px 10px'}}>
						<CartItemList
							items={order.items}
							quantity={order.quantity}
							amount={order.amount}
						/>
					</div>
				</div>
				<div className="order-section">
					<div className="order-section-title">
						配送信息
					</div>
					<div>
						<div className="order-item">
							送达时间：
							{order.book_time
								? order.book_time
								: `尽快送达 | 预计${this.getPredictTime(order)}送达`}
						</div>
						<div className="order-item">
							<p>订餐地址：{order.phone}</p>
							<p>&nbsp;
								<span className="order-content">{order.address}</span>
							</p>
						</div>
						{order.note
							?	<div className="order-item">
									订餐备注：{order.note}
								</div>
							: ''}
					</div>
				</div>
				<div className="order-section">
					<div className="order-section-title">
						订单信息
					</div>
					<div className="order-item">
						支付方式：{order.paytype == 0 ? '货到付款' : '微信支付'}
					</div>
					<div className="order-item">
						下单时间：{order.create_time}
					</div>
				</div>
				<div>
				</div>
			</div>
		)
	}
}
