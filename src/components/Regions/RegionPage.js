import React, { Component } from 'react'
import 'whatwg-fetch'

// import Loading from '../Loading'
import 'COMPONENT/arrow.css'

export default class HomePage extends Component {
	constructor(props) { 
		super(props) 
		this.state = {
			regions: []
		}
    this.fetchRegion = this.fetchRegion.bind(this)
	}
	componentWillMount() {
    document.title = '请选择地址'
		this.fetchRegion()
	}
	fetchRegion() {
		let url = 'api/regions'
		fetch(url).then(res => res.json())
			.then(data => this.setState({regions: data}))
	}
	render() {
		const { regions } = this.state
		var style = {
			bar: {
				zIndex: '999',
				position: 'fixed',
				top: '0',
				width: '100%',
				padding: '2px',
				height: '47px',
        borderBottom: '1px solid #ccc',
				backgroundColor: '#373b3e'
			},
      title: {
        textAlign: 'center',
				color: '#ccdad9'
      },
      areas: {
        marginTop: '50px'
      },
      area: {
				padding: '15px 10px',
        color: '#555',
				backgroundColor: '#fefefe',
        borderBottom: '1px solid #e5ecec'
      },
      footer: {
        margin: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#b7c4c3'
      },
      img: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        float: 'left',
        marginRight: '10px',
        marginTop: '-5px'
      }
		}
		return (
			<div>
				<div style={style.bar}>
					<div style={style.title}>
						<strong>请选择地址</strong>
            <div style={{fontSize: '12px'}}>
              请选择你所在的学校校区
            </div>
					</div>
				</div>
				<div style={style.areas}>
          {regions.length != 0
						? <div>
								{regions.map((region) => 
									<a href='#/' onClick={()=>localStorage.setItem('region', JSON.stringify(region))}>
										<div style={style.area}>
											<img src={'http://7xta4i.com1.z0.glb.clouddn.com/' + region.logo} style={style.img}></img>
											<div className='arrow'></div>
											<div>{region.name}</div>
										</div>
									</a>)}
								<div style={style.footer}>
									其他校区敬请期待
								</div>
							</div>
						: ''}
				</div>
			</div>
		)
	}
}
