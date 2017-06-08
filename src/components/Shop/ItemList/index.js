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
		const category = ids[this.state.category]
		return (
			<div className='container2' id='container'>
				{true
					? <div>
							<div className='categories2' id='categories'>
								{ids.map((category) => {
									const selected = this.state.category == category.id - 1
										? 'selected2' : ''
									return (
										<div className={'category2 ' + selected}
											onClick={()=>
												this.setState({category: category.id - 1})}>
											{category.name}
										</div>)})}
							</div>
							<div className='items2' id='items'>
								{category.items.map((id) =>
									<Item
										key={id}
										item={items[id]}
										style={{
											padding: '8px',
											borderBottom: '1px solid #eee'}}
										category={category} />)}
							</div>
						</div>
					: <div id='items' className='items-big'>
							{category.items.map((id) =>
								<Item
									key={id}
									item={items[id]}
									style={{
										backgroundColor: '#fff',
										padding: 8,
										margin: 5}}
									category={category} />)}
						</div>}
			</div>
		)
	}
}
