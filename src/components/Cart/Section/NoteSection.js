/**
 * Created by vin on 2017/2/3.
 */
import React, { Component } from 'react'

export default class Address extends Component {
	render() {
		return (
			<div className="section">
				<div className="section-title">送餐备注</div>
				<i className='arrow'></i>
				<div className="section-body">
				<textarea
					className="section-note"
					rows='1'
					placeholder='想对店长说什么'
					ref='note'
					onBlur={() => this.props.setNote(this.refs.note.value)}
				/>
				</div>
			</div>
		)
	}
}
