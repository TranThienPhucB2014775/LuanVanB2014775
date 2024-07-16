"use client";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

const AppContext = createContext<{
	user: string | null;
	setUser: (user: string | null) => void;
	isAuthenticated: boolean;
}>({
	user: null,
	setUser: () => {},
	isAuthenticated: false,
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUserState] = useState<string | null>(() => {
		return null;
	});

	const isAuthenticated = Boolean(user);
	const setUser = useCallback(
		(user: string | null) => {
			setUserState(user);
			// localStorage.setItem("token", JSON.stringify(token));
		},
		[setUserState]
	);

	// useEffect(() => {
	// 	const _token = localStorage.getItem("token");
	// 	_token && setUserState(_token);
	// }, [setUserState]);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
