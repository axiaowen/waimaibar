/**
 * Created by vin on 2017/2/2.
 */

import React, { Component } from 'react'

import Item from './Item'
import './index.css'

export default class ItemList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: 0
		}
	}

	componentDidMount() {
		var height = document.getElementById('head').offsetHeight
		var categories = document.getElementById('categories')
		if (categories) {
			categories.style.top = `${height}px`
		}
		var items = document.getElementById('items')
		if (items) {
			items.style.top = `${height}px`
		}
	}

	render() {
		const { ids, items } = this.props
		const selectedCate = this.state.category
		return (
			<div className='container' id='container'>
				<div>
					<div className='categories' id='categories'>
						{ids.map((category) => {
							const selected = (selectedCate == category.id - 1 ? 'selected' : '')
							return (
								<div className={'category ' + selected}
									onClick={()=> this.setState({category: category.id - 1})}>
									{category.name}
								</div>)})}
					</div>
					<div className='items' id='items'>
						{ids[selectedCate].items.map((id) =>
							<Item
								key={id}
								item={items[id]}
								category={ids[selectedCate]}
								style={{
									padding: '8px',
									borderBottom: '1px solid #eee'}}
							/>)}
					</div>
				</div>
			</div>
		)
	}
}
