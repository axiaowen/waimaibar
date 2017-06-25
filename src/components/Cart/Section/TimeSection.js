/**
 * Created by vin on 2017/2/3.
 */
import React, { Component } from 'react'

import TimeModal from '../TimeModal'

export default class TimeSection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: '',
			showModal: false
		}

	}
	render() {
		const { time, showModal } = this.state
		const { timelist } = this.props
		return (
		<div className="section">
			<div className="section-title">送餐时间</div>
			<div className='arrow'></div>
			<div
				className="section-body"
				onClick={() => {
					if (timelist.length > 1) {
						this.setState({showModal: true})
					}}}>
				<div className="section-text">
					<span style={{color: '#198774'}}>
						{time
							? `预约 ${time} 送到`
							: status == '接受预定'
								? `预订 ${timelist[0]} 送到`
								: `尽快送达`}
					</span>
				</div>
			</div>
			<TimeModal
				show={showModal}
				schedule={timelist}
				onClick={() => this.setState({showModal: false})}
				setTime={(time) => this.setState({showModal: false, time: time})}/>
		</div>
		)
	}
}
