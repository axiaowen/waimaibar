/**
 * Created by vin on 2017/2/5.
 */

import React, {Component} from 'react'

import ActionSheet from 'COMPONENT/ActionSheet'

import './index.css'
import 'COMPONENT/icons.css'
import Opt from '../ItemList/Opt'

export default class SpecModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedSKU: {}
		}
	}

	render() {
		const { isDisplay, item, onClose, incToCart, decFromCart } = this.props
		const { selectedSKU } = this.state
		return (
			<ActionSheet show={isDisplay} onClose={onClose}>
				<div className="title">{item.name}</div>
				{item.specs.map(spec =>
					<div className="spec">
						<div className="spec-title">{spec.title}：</div>
						{spec.values.map(val => {
							let isSelected = selectedSKU.id == val.id ? ' selected' : ''
							return (
								<span
									className={'spec-item' + isSelected}
									onClick={() => this.setState({selectedSKU: val})}
								>{val.value}</span>
							)})}
					</div>
				)}
				<div className="spec-bottom">
					{selectedSKU.id
						? <div>
								<Opt
									showPrice={true}
									item={selectedSKU}
									incToCart={incToCart}
									decFromCart={decFromCart} />
								<div>{item.name} - {selectedSKU.value}</div>
							</div>
						: <div>请选择</div>}
				</div>
			</ActionSheet>
		)
	}
}
