"use client";

import { useAppContext } from "@/app/app-provider";
import { isClient } from "@/lib/http";
import { useEffect } from "react";
import authApiRequest from "../apiRequests/auth";
import { infoResponse, loginResponse } from "@/dto/response";

const SlideSession = ({
	isAuth,
	token,
}: {
	isAuth: {
		isAuth: boolean;
		avatarUrl: string;
	};
	token: string;
}) => {
	const { setUser, setAvatar } = useAppContext();
	const jwt = require("jsonwebtoken");

	useEffect(() => {
		async function introspect() {
			if (token === "") return;

			const decoded = jwt.decode(token);

			if (isAuth.isAuth) {
				setUser(decoded.sub,decoded.scope);
				setAvatar(isAuth.avatarUrl);
			} else {
				await authApiRequest.logoutFromNextClientToNextServer(token);
			}
		}

		const interval = setInterval(async () => {
			if (!token) return;
			const decoded = jwt.decode(token);

			const diffTime = decoded.exp * 1000 - new Date().getTime();
			if (diffTime / 86400000 < 1) {
				authApiRequest.refresh({ token }).then((res) => {
					token = (res.payload as loginResponse).result.token;
					localStorage.setItem("token", token);
					authApiRequest
						.auth({
							sessionToken: (res.payload as loginResponse).result
								.token,
							expiresAt: "",
						})
						.then((res) => {

							if (res.code !== 0) {
								handleLogout();
								localStorage.removeItem("token");
							}
						});
				});
			}
		}, 1000 * 30);

		introspect();

		return () => clearInterval(interval);
	},[]);

	async function handleLogout() {
		await authApiRequest.logoutFromNextClientToNextServer(token);
		setUser("","");
	}

	return null;
};

export default SlideSession;
