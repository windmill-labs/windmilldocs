import React from 'react';
import { Fade } from 'react-slideshow-image';

const images = ["scripts", "editor2", "result", "script_detail", "add_resource", "audit_logs", "runs", "workspace_settings"]
const Slideshow = () =>
{
	const style = {
		textAlign: 'center'
	};

	return (
		<div className="flex p-4">

			<Fade className=" w-full  shadow-xl ring-1 ring-black ring-opacity-5 " autoplay={true} duration={5000}>
				{images.map((x, i) =>
					<div className="h-full w-full" key={`slide-${i}`}>

						<img
							src={`/img/${x}.png`}
							alt="animated overview of Windmill"
							className=" w-full lg:w-auto m-auto"
						/>
					</div>

				)}
			</Fade>
		</div>
	);
};

export default Slideshow;
