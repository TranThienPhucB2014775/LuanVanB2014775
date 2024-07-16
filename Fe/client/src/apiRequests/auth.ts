import {
	loginRequest,
	refreshTokenRequest,
	registerRequest,
} from "@/dto/request";
import { infoResponse, loginResponse, registerResponse } from "@/dto/response";
import { http } from "@/lib";

const authApiRequest = {
	login: (body: typeof loginRequest) =>
		http.post<loginResponse>("/identity/auth/token", body),

	register: (body: typeof registerRequest) =>
		http.post<registerResponse>("/identity/users/registration", body),

	auth: (body: { sessionToken: string; expiresAt: string }) =>
		http.post("/api/auth", body, {
			baseUrl: "",
		}),

	introspect: (sessionToken: string, email: string) =>
		http.get<infoResponse>("identity/users/introspect", {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		}),

	info: (sessionToken: string) =>
		http.get<infoResponse>(`/identity/users/me`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		}),

	refresh: (body: refreshTokenRequest) =>
		http.post<loginResponse>("identity/auth/refresh", body),

	logoutFromNextServerToServer: (sessionToken: string) =>
		http.post(
			"/identity/auth/logout",
			{ token: sessionToken },
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		),
	logoutFromNextClientToNextServer: (sessionToken: string) =>
		http.post(
			"/api/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
				baseUrl: "",
			}
		),
	outbound: (authCode: string) =>
		http.post<loginResponse>(
			`/identity/auth/outbound/authentication?code=${authCode}`,
			{}
		),
};

export default authApiRequest;
