/**
 * Created by vin on 2017/2/3.
 */
import React, { Component } from 'react'

import AddrModal from '../AddrModal'

export default class Address extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tel: '',
			address: '',
			showModal: false
		}
		this.setAddress = this.setAddress.bind(this)
	}

	componentDidMount() {
			const tel = localStorage.getItem('tel')
			const address = localStorage.getItem('address')
			this.setState({tel: tel, address: address})
	}

	setAddress(tel, address) {
		localStorage.setItem('tel', tel)
		localStorage.setItem('address', address)
		this.setState({
			showModal: false,
			tel: tel,
			address: address})
	}

	render() {
		const { tel, address, showModal } = this.state
		const region = JSON.parse(localStorage.getItem('region'))
		return (
			<div className="section">
				<div className="section-title">送餐地址</div>
				<div className='arrow'></div>
				<div
					className="section-body"
					onClick={()=>this.setState({showModal: true})}>
					{(tel && address)
						? <div>
							<p style={{color: '#666'}}>{tel}</p>
							<p>
								<span className="section-school">{region.abbr}</span>
								<span style={{marginLeft: 60, color: '#888'}}>{address}</span>
							</p>
						</div>
						: <div className="section-text">
							<span style={{color: '#aaa'}}>请新增送餐地址</span>
						</div>}
				</div>
				<AddrModal
					show={showModal}
					onClick={() => this.setState({showModal: false})}
					setAddress={this.setAddress} />
			</div>
		)
	}

}
