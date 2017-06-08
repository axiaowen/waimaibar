/**
 * Created by vin on 2017/2/3.
 */
import React, { Component } from 'react'

export default class Address extends Component {
	render() {
		const cart = this.props.cart
		return (
			<div className="section">
				<div className="section-head">
					<span>购物车</span>
				</div>
				{cart.ids.length == 0
					? <div style={{color: '#777', padding: '10px 0'}}>
							购物车空空的...
						</div>
					: <div>
							<div className="section-items">
							{cart.ids.map((id) => {
								const item = cart.items[id]
								return (
									<div className="section-item">
										<span className="section-name">{item.name}</span>
										<span className="section-quantity">×{item.quantity}</span>
										<span className="section-price">¥{item.price * item.quantity}</span>
									</div>)})}
						</div>
						<div className="section-foot">
							<div className="section-total">小计</div>
							<div className="section-amount">
								总计：
								<span style={{color: '#cf2d28'}}>¥{cart.price}</span>
							</div>
						</div>
					</div>}
			</div>
		)
	}
}
