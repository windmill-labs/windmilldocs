import React, { useState } from 'react';
import { Fade } from 'react-slideshow-image';

const Slideshow = () => {
	const style = {
		textAlign: 'center'
	};

	return (
		<Fade autoplay={true} duration={2000}>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl1.png').default}
					alt="animated overview of Windmill"
					className=" rounded-md"
				/>
			</div>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl2.png').default}
					alt="animated overview of Windmill"
					className=" rounded-md"
				/>{' '}
			</div>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl3.png').default}
					alt="animated overview of Windmill"
					className=" rounded-md"
				/>{' '}
			</div>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl4.png').default}
					alt="animated overview of Windmill"
					className="rounded-md"
				/>{' '}
			</div>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl5.png').default}
					alt="animated overview of Windmill"
					className="rounded-md"
				/>{' '}
			</div>
			<div className="each-fade rounded-md" style={style}>
				<img
					src={require('../../static/img/sl6.png').default}
					alt="animated overview of Windmill"
					className="rounded-md"
				/>{' '}
			</div>
		</Fade>
	);
};

export default Slideshow;
