const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api/v1";

type ApiOptions = RequestInit & {
  auth?: boolean;
  skipRefresh?: boolean;
};

export type AuthUser = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  role: "student" | "parent" | "teacher" | "admin";
  status: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: ApiOptions = {},
  ): Promise<T> {
    const {
      auth = false,
      skipRefresh = false,
      headers,
      ...fetchOptions
    } = options;

    const requestHeaders = new Headers(headers);

    requestHeaders.set(
      "Content-Type",
      "application/json",
    );

    if (
      auth &&
      typeof window !== "undefined"
    ) {
      const token = this.getAccessToken();

      if (token) {
        requestHeaders.set(
          "Authorization",
          `Bearer ${token}`,
        );
      }
    }

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...fetchOptions,
        headers: requestHeaders,
      },
    );

    /*
     * Access token expired.
     *
     * Try the refresh token once, then retry
     * the original authenticated request.
     */
    if (
      response.status === 401 &&
      auth &&
      !skipRefresh &&
      typeof window !== "undefined"
    ) {
      const refreshToken =
        this.getRefreshToken();

      if (refreshToken) {
        try {
          await this.refresh(refreshToken);

          return await this.request<T>(
            endpoint,
            {
              ...options,
              skipRefresh: true,
            },
          );
        } catch {
          this.clearTokens();

          throw new Error(
            "Your session has expired. Please log in again.",
          );
        }
      }

      this.clearTokens();

      throw new Error(
        "Your session has expired. Please log in again.",
      );
    }

    const contentType =
      response.headers.get("content-type");

    let data: unknown;

    if (
      contentType?.includes(
        "application/json",
      )
    ) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "detail" in data &&
        typeof data.detail === "string"
          ? data.detail
          : `Request failed with status ${response.status}`;

      throw new Error(message);
    }

    return data as T;
  }

  async register(payload: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role:
      | "student"
      | "parent"
      | "teacher";
  }) {
    const response =
      await this.request<AuthResponse>(
        "/auth/register",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

    this.storeTokens(response);

    return response;
  }

  async login(payload: {
    email: string;
    password: string;
  }) {
    const response =
      await this.request<AuthResponse>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

    this.storeTokens(response);

    return response;
  }

  async getCurrentUser() {
    return this.request<AuthUser>(
      "/auth/me",
      {
        method: "GET",
        auth: true,
      },
    );
  }

  async refresh(
    refreshToken: string,
  ) {
    const response =
      await this.request<RefreshResponse>(
        "/auth/refresh",
        {
          method: "POST",
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
          skipRefresh: true,
        },
      );

    if (
      typeof window !== "undefined"
    ) {
      localStorage.setItem(
        "tutorsque_access_token",
        response.access_token,
      );

      localStorage.setItem(
        "tutorsque_refresh_token",
        response.refresh_token,
      );
    }

    return response;
  }

  async logout() {
    try {
      const token =
        this.getAccessToken();

      if (token) {
        await this.request(
          "/auth/logout",
          {
            method: "POST",
            auth: true,
          },
        );
      }
    } finally {
      this.clearTokens();
    }
  }

  getAccessToken() {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      "tutorsque_access_token",
    );
  }

  getRefreshToken() {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      "tutorsque_refresh_token",
    );
  }

  isAuthenticated() {
    return Boolean(
      this.getAccessToken(),
    );
  }

  private storeTokens(response: {
    access_token: string;
    refresh_token: string;
  }) {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    localStorage.setItem(
      "tutorsque_access_token",
      response.access_token,
    );

    localStorage.setItem(
      "tutorsque_refresh_token",
      response.refresh_token,
    );
  }

  private clearTokens() {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    localStorage.removeItem(
      "tutorsque_access_token",
    );

    localStorage.removeItem(
      "tutorsque_refresh_token",
    );
  }
}

export const api = new ApiClient();