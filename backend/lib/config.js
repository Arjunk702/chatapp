const parseCommaList = (value) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const isProduction = process.env.NODE_ENV === "production";

export const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECERET;

export const corsOrigins = parseCommaList(process.env.CORS_ORIGINS);

export const allowVercelWildcard =
  (process.env.CORS_ALLOW_VERCEL_WILDCARD || "").toLowerCase() === "true";

export const isOriginAllowed = (origin) => {
  if (!origin) return true; // non-browser requests
  if (corsOrigins.includes(origin)) return true;
  if (allowVercelWildcard) {
    try {
      const { hostname, protocol } = new URL(origin);
      if (protocol === "https:" && hostname.endsWith(".vercel.app")) return true;
    } catch {
      return false;
    }
  }
  return false;
};

