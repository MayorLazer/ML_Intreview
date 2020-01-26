import React from 'react';
import { Container, Row, Col, Hidden } from 'react-grid-system';

import './BreadCrumb.scss'

export default function BreadCrumb(props) {
	let pages = ['Electronica Audio y Video', 'Ipod', 'Reproductores', 'IPod touch', '32 GB']
	return (
		<div className="breadCrumb">
			<Container fluid style={{display:'flex'}}>
						<Col sm={12} offSet={{xs:1}}>
								{ props.breadCrumb.map( x => <span>{x.name} </span>) }    
						</Col>
				
			</Container>
		</div>
	);
}