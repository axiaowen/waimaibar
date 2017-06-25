import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

import './home.css'
import ShopNode from 'COMPONENT/Home/ShopNode'
import ActionSheet from 'COMPONENT/ActionSheet'

const HomeBar = ({ region, categories, selectedCate }) => (
	<div className='home-bar'>
		<a href='#/region' className='region-area'>
			{ region.id == 0
				? '选择学校'
				: region.abbr }
		</a>
		<div className='home-divider'></div>
		{categories.map((category) =>
			<div className='shops-category'>
				{selectedCate == category.id
					? <div className='shops-selected-category'>
						{category.name}
					</div>
					: <div onClick={() => {
						this.setState({category: category.id})
						this.fetchShops(category.id, region)
					}}>
						{category.name}
					</div>}
			</div>)}
	</div>
)

export class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			region: {id: 0, abbr: ''},
			showRegModal: false,
			categories: [{id: 0, name: '美食'}, {id: 0, name: ''}],
			category: 0
		}
		this.fetchShops = this.fetchShops.bind(this)
		this.fetchRegion = this.fetchRegion.bind(this)
		this.closeRegNotify = this.closeRegNotify.bind(this)
	}

	componentWillMount() {
		document.title = '外卖吧'
		let storage = localStorage.getItem('region')
		if (storage && storage.id != 0 && storage != 'undefined') {
			let region = JSON.parse(storage)
			this.setState({region: region})
			this.fetchRegion(region)
		} else {
			window.location.href = '#/region'
		}
		// 	if (navigator.geolocation) {
		// 		navigator.geolocation.getCurrentPosition((position) => {
		// 			const { latitude, longitude } = position.coords
		// 			var url = `api/pois?latitude=${latitude}&longitude=${longitude}`
		// 			reqwest({
		//  	    url: url,
		// 				method: 'get',
		// 				success: function(res) {
		// 					if (res.id != 0) {
		// 						if (!region || region.id == 0) {
		// 							this.setState({region: res})
		// 							this.fetchRegion(res)
		// 							this.requestShops(this.state.category, res)
		// 						} else if (res.id != region.id) {
		// 								this.setState({regionMatch: res,
		// 															 showRegModal: true})
		// 						}
		// 					}
		// 				}.bind(this)
		// 			})
		// 		})
		// 	} else if (!region && region.id == 0) {
		// 		window.location.href = '#/region'
		// 	}
		// }
	}

	fetchRegion(region) {
		fetch(`api/region?id=${region.id}`)
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('region', JSON.stringify(data.region))
				// if (data.category.length == 1) {
				// 	data.category.push({id:0, name:''})
				// }
				this.setState({region: data.region})
				this.fetchShops(this.state.category, data.region.id)
			})
	}

	componentDidMount() {
		this.fetchShops()
	}

	closeRegNotify() {
		this.setState({showRegModal: false})
	}

	autoLocate() {
		if (navigator.geolocation) {
			let coords = { latitude: 0, longitude: 0 }
			navigator.geolocation.getCurrentPosition((position) => {
				coords = position.coords
			})
			return coords
		} else {
			window.location.href = '#/region'
		}
	}

	fetchShops(category, regionid) {
		// if (this.props.shops.length == 0) {
			this.props.requestShops()
			fetch(`/api/shops?region=${regionid}`)
				.then(res => res.json())
				.then(data => this.props.receiveShops(data))

			// const shops = [{'status': '\u6b63\u5728\u8425\u4e1a', 'name': '\u5c0f\u53a8\u623f\u7f8e\u98df', 'tags': ['\u6bcf\u65e5\u7279\u4ef7'], 'minAmount': 0, 'freight': 0, 'id': 1008, 'logo': 'shop/cover/maoji.jpg'}, {'status': '\u6b63\u5728\u8425\u4e1a', 'name': '\u51b0\u706b\u7f18', 'tags': ['\u6c49\u5821', '\u5bb5\u591c'], 'minAmount': 0, 'freight': 0, 'id': 1006, 'logo': 'shop/cover/maoji.jpg'}, {'status': '\u6b63\u5728\u8425\u4e1a', 'name': '\u5982\u5bb6\u5feb\u9910\u5385', 'tags': ['\u5bb5\u591c', '\u5feb\u9910'], 'minAmount': 0, 'freight': 0, 'id': 1001, 'logo': 'shop/cover/maoji.jpg'}, {'status': '\u6b63\u5728\u8425\u4e1a', 'name': '\u8c37\u5c4b', 'tags': ['\u9001\u4e0a\u5bbf\u820d'], 'minAmount': 0, 'freight': 0, 'id': 1007, 'logo': 'shop/cover/maoji.jpg'}, {'status': '\u6b63\u5728\u8425\u4e1a', 'name': '\u83b2\u9999\u9910\u5385', 'tags': ['\u5bb5\u591c'], 'minAmount': 0, 'freight': 0, 'id': 1002, 'logo': 'shop/cover/maoji.jpg'}]
			// this.props.receiveShops(shops)
		// }
	}

	render() {
		const {region, showRegModal} = this.state
		const { fetching, shops, suggestRegion } = this.props
		return (
			<div>
				<HomeBar
					region={region}
					selectedCate={this.state.category}
					categories={this.state.categories} />
				{/* <div style={{margin: '0 4px -7px 4px'}}> */}
					{/* <img className='home-banner' src='' /> */}
				{/* </div> */}
				{fetching
					? ''
					: <div>
							<div className='shops-area'>
								{shops.map((shop, index) =>
									<ShopNode
										key={shop.id}
										index={index}
										shop={shop} />)}
							</div>
							{/* <div className="icp-bottom">- 粤ICP备17011195号 -</div> */}
						</div>}
				<ActionSheet show={showRegModal}>
					<div className='region-panel'>
						<div className='region-panel-close' onClick={this.closeRegNotify}>
							关闭
						</div>
						<div className='region-panel-detail'>
							你现在浏览的是<strong>{region.abbr}</strong>
							，与你的现在位置不一致，是否切换到你的位置
							<strong>({suggestRegion.abbr})</strong>
						</div>
						<div className='region-panel-buttons'>
							<div className='region-panel-btn-stay' onClick={this.closeRegNotify}>
								留在{region.abbr}
							</div>
							<div className='region-panel-btn-redirect'
								onClick={() => {
									this.setState({
										region: suggestRegion,
										showRegModal: false
									})
									this.fetchRegion(suggestRegion)
									this.fetchShops(this.state.category, suggestRegion)
								}}>
								去{suggestRegion.abbr}
							</div>
						</div>
					</div>
				</ActionSheet>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		suggestRegion: state.region.suggestion,
		fetching: state.shops.fetching,
		shops: state.shops.data
	}),
	require('ACTION/shops').default,
)(HomePage)
