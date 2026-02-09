const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    cases: "/cases",
    cdrFiles: "/cdr-files",
    cdrAnalysis: "/cdr-analysis",
  },
};

export default api;
