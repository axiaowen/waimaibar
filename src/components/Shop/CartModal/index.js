/**
 * Created by vin on 2017/2/5.
 */

import React, {Component} from 'react'

import ActionSheet from 'COMPONENT/ActionSheet'

import './index.css'
import 'COMPONENT/icons.css'

export default class CartModal extends Component {
	render() {
		return (
			<ActionSheet show={false}>
				<div className="cart-title">购物车</div>
				<ul className="cart-items">
					<li className="cart-item">
						<div className="minus-circle cart-dec">-</div>
						<div className="cart-num">1</div>
						<div className="add-circle cart-inc">+</div>
						<div className="ellipsis" style={{marginRight: 80}}>
							特指咖喱土豆饼汤套餐（中碗） - 中碗
						</div>
					</li>
					<li className="cart-item">
						<div className="minus-circle cart-dec">-</div>
						<div className="cart-num">1</div>
						<div className="add-circle cart-inc">+</div>
						<div className="ellipsis" style={{marginRight: 80}}>
							特指咖喱土豆饼汤套餐（中碗） - 中碗
						</div>
					</li>
				</ul>
			</ActionSheet>
		)
	}
}
