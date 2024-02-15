import React, { useEffect, useContext, createContext, useState } from 'react';
const DeveloperModeContext = createContext();

export function useDeveloperMode() {
	return useContext(DeveloperModeContext);
}

export { DeveloperModeContext };

export default function GlobalContextProvider(props) {
	const [developerMode, setDeveloperMode] = useState(false);

	useEffect(() => {
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	});

	return (
		<DeveloperModeContext.Provider
			value={{
				developerMode: developerMode,
				setDeveloperMode: setDeveloperMode
			}}
		>
			{props.children}
		</DeveloperModeContext.Provider>
	);
}
