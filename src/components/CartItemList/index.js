/**
 * Created by vin on 2017/3/2.
 */

import React, {Component} from 'react'

export default class CartItemList extends Component {
	render() {
		const { items, quantity, amount } = this.props
		console.log(quantity)
		return (
			<div>
				<div className="section-items">
					{items.map(item =>
						<div className="section-item">
							<span className="section-name">{item.name}</span>
							<span className="section-quantity">×{item.quantity}</span>
							<span className="section-price">¥{item.price}</span>
						</div>
					)}
				</div>
				<div className="section-foot">
					<div className="section-total">小计</div>
					<div className="section-amount">
						总计：
						<span style={{color: '#cf2d28'}}>¥{amount}</span>
					</div>
				</div>
			</div>
		)
	}
}
