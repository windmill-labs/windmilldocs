import React from 'react';
import { Fade } from 'react-slideshow-image';

const images = ["scripts", "editor2", "result", "script_detail", "add_resource", "audit_logs", "runs", "workspace_settings"]
const Slideshow = () => {
	const style = {
		textAlign: 'center'
	};

	return (
		<div className="flex p-4 lg:-ml-4 sm:pr-6 lg:px-0  lg:h-full">

		<Fade className="h-full w-full lg:mt-40" autoplay={true} duration={5000}>
			{images.map((x) => 
				<div className="h-full w-full">

				<img
					src={`/img/${x}.png`}
					alt="animated overview of Windmill"
					className=" w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5  lg:w-auto m-auto"
				/>
				</div>

			)}	
		</Fade>
		</div>
	);
};

export default Slideshow;
