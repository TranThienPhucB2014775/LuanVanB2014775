"use client";

import { useAppContext } from "@/app/app-provider";
import { isClient } from "@/lib/http";
import { useEffect } from "react";
import authApiRequest from "../apiRequests/auth";
import { infoResponse, loginResponse } from "@/dto/response";
import { ApiResponse } from "@/dto/ApiResponse";

const SlideSession = ({
	isAuth,
	token,
}: {
	isAuth: Boolean;
	token: string;
}) => {
	const { setUser } = useAppContext();
	const jwt = require("jsonwebtoken");
	console.log(token);

	useEffect(() => {
		async function introspect() {
			if (token === "") return;
			console.log("introspect");

			if (isAuth) {
				const decoded = jwt.decode(token);
				setUser(decoded.sub);
			} else {
				await authApiRequest.logoutFromNextClientToNextServer(token);
				console.log("error");
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
							console.log(res);
							if (res.code !== 0) {
								handleLogout();
								localStorage.removeItem("token");
							}
							console.log(res);
						});
				});
			}
		}, 1000 * 30);

		introspect();

		return () => clearInterval(interval);
	});

	async function handleLogout() {
		await authApiRequest.logoutFromNextClientToNextServer(token);
		setUser("");
	}

	return null;
};

export default SlideSession;
