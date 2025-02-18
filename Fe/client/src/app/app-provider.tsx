"use client";
import React, {
	createContext,
	useCallback,
	useContext,
	useState
} from "react";

const AppContext = createContext<{
	user: string | null;
	setUser: (user: string | null, role: string | null) => void;
	isAuthenticated: boolean;
	role: string | null;
	avatarUrl: string | null;
	setAvatar: (avatar: string | null) => void;
}>({
	user: null,
	setUser: () => {
	},
	isAuthenticated: false,
	role: "",
	avatarUrl: "",
	setAvatar: () => {

	}
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};

export default function AppProvider({
										children
									}: {
	children: React.ReactNode;
}) {
	const [user, setUserState] = useState<string | null>(() => {
		return null;
	});

	const [role, setRole] = useState<string | null>(() => {
		return null;
	});

	const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
		return null;
	});

	const setAvatar = useCallback(
		(avatar: string | null) => {
			setAvatarUrl(avatar);
		},
		[avatarUrl]
	);

	const isAuthenticated = Boolean(user);
	const setUser = useCallback(
		(user: string | null, role: string | null) => {
			setUserState(user);
			// localStorage.setItem("token", JSON.stringify(token));
			setRole(role);
			// !isAuthenticated
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
				role,
				avatarUrl,
				setAvatar
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
