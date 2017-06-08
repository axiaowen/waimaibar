/**
 * Created by vin on 2017/2/2.
 */

import React, { Component } from 'react'

import ActionSheet from 'COMPONENT/ActionSheet.js'

export default class AddrModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tip: 0
		}
	}
	componentDidMount() {
		const tel = localStorage.getItem('tel')
		const address = localStorage.getItem('address')
		if (tel && address) {
			this.refs.tel.value = tel
			this.refs.address.value = address
		}
	}
	saveAddress() {
		var tel = this.refs.tel.value
		var address = this.refs.address.value
		if (!tel) {
			this.setState({tip: '请输入送餐电话'})
		} else if ((/[^\d]/g).test(tel)) {
			this.setState({tip: '送餐电话请输入数字'})
		} else if (!address) {
			this.setState({tip: '请输入送餐地址'})
		} else {
			this.props.setAddress(tel, address)
			this.setState({tip: ''})
		}
	}

	render() {
		var style = {
			head: {
				position: 'absolute'
			},
			body: {
				margin: '0 10px 5px 60px'
			},
			school: {
				marginTop: 2,
				color: '#333',
				fontSize: 14,
				fontWeight: 'bold',
				position: 'absolute'
			},
			btn: {
				padding: '10px 0',
				color: '#666',
				fontSize: 18,
				backgroundColor: '#fff'
			}
		}
		var { show, onClick } = this.props
		const region = JSON.parse(localStorage.getItem('region'))
		return (
			<ActionSheet show={show} onClose={onClick}>
				<div className='actionsheet_title'>
					{this.state.tip
						? <div style={{backgroundColor: '#e76666', color: '#fff', fontSize: 16, padding: '5px 0'}}>
							{this.state.tip}
						</div>
						: <div style={{backgroundColor: '#eee', color: '#666', fontSize: 16, padding: '5px 0'}}>
							请填写送餐地址
						</div>}
				</div>
				<div style={{fontSize: '18px', padding: '20px'}}>
					<label>
						<div style={style.head}>电话：</div>
						<div style={style.body}>
							<input
								type='text'
								placeholder='手机或学校短号'
								ref='tel'
								style={{fontSize: 18, color: '#666'}} />
						</div>
					</label>
					<label>
						<div style={style.head}>地址：</div>
						<div style={style.body}>
							<div style={style.school}>{region.abbr}</div>
							<div style={{marginLeft: 60}}>
								<input
									type='text'
									placeholder='X区X栋XXX'
									ref='address'
									style={{fontSize: 18, color: '#666'}}
								/>
							</div>
						</div>
					</label>
				</div>
				<div style={{borderTop: '7px solid #eee'}}>
					<div
						className='actionsheet_cell'
						style={{fontSize: 18, color: '#666'}}
						onClick={() => this.saveAddress()} >确定</div>
				</div>
			</ActionSheet>
		)
	}
}
