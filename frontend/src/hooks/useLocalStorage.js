import { useState, useEffect } from 'react';

// Hook to help with local storage
function useLocalStorage(key, firstValue = null) {
	// Checks for a current value
	const initialValue = localStorage.getItem(key) || firstValue;

	// Create a piece of state initialized to the initial value, or null
	const [ item, setItem ] = useState(initialValue);

	useEffect(
		() => {
			if (!item) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, item);
			}
		},
		[ key, item ]
	);

	return [ item, setItem ];
}

export default useLocalStorage;
