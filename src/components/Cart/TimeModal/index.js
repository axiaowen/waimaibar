/**
 * Created by vin on 2017/2/2.
 */

import React, { Component } from 'react'

import ActionSheet from 'COMPONENT/ActionSheet.js'

export default class TimeModal extends Component {
	render() {
		const { show, schedule, onClick, setTime } = this.props
		return (
			<ActionSheet show={show} onClose={onClick}>
				<div className='actionsheet_title' style={{backgroundColor: '#eee', color: '#666', fontSize: 16, padding: '5px 0'}}>
					请预定送餐时间
				</div>
				{schedule.map((time)=>
					<div
						key={time}
						className='actionsheet_cell'
						style={{fontSize: 18}}
						onClick={()=>setTime(time)}>
						{time}
					</div>)}
			</ActionSheet>
		)
	}
}
