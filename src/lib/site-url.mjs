/** Validate the canonical origin shared by the website and resume builder. */
export function siteUrl(value) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username || url.password || url.pathname !== "/" || url.search || url.hash
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, credentials, query, or fragment.");
  }
  return url.origin;
}
