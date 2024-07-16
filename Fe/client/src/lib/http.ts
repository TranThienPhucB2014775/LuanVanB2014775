import envConfig from "@/config";
import {redirect} from "next/navigation";
import {ApiResponse} from "@/dto/ApiResponse";

const AUTHENTICATION_ERROR_STATUS = 401;

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};

export function isClient(): boolean {
    return typeof window !== "undefined";
}

let clientLogoutRequest: null | Promise<any> = null;

async function request<Response>(
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    url: string,
    options?: CustomOptions | undefined
) {
    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    const baseHeaders: {
        [key: string]: string;
    } =
        body instanceof FormData
            ? {}
            : {
                "Content-Type": "application/json",
            };
    if (isClient()) {
        const sessionToken = localStorage.getItem("sessionToken");
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }

    const baseUrl =
        options?.baseUrl === undefined
            ? envConfig.NEXT_PUBLIC_API_ENDPOINT
            : options.baseUrl;

    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;
    let res;
    try {
        res = await fetch(fullUrl, {
            ...options,
            headers: {
                ...baseHeaders,
                ...options?.headers,
            } as any,
            body,
            method,
        });

        const payload: Response = await res.json();
        let data: ApiResponse<Response>;

        if (isClient() && url !== "/api/auth/token") {
            if (res.status === AUTHENTICATION_ERROR_STATUS) {
                localStorage.removeItem("token");
                redirect("/login");
            }
        }

        // @ts-ignore
        if (payload.code === 0) {
            data = {
                // @ts-ignore
                code: payload.code,
                payload: payload,
                error: null
            };
        } else {
            data = {
                // @ts-ignore
                code: res.code,
                payload: null,
                // @ts-ignore
                error: {message: payload.result},
            };
        }
        return data;
    } catch (e) {
        return {
            code: 500,
            payload: null,
            error: {message: "Error Unknown"},
        }
    }


}

export const http = {
    get<Response>(
        url: string,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("GET", url, options);
    },
    post<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("POST", url, {...options, body});
    },
    put<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("PUT", url, {...options, body});
    },
    delete<Response>(
        url: string,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("DELETE", url, {...options});
    },
};
