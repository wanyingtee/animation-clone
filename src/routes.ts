/** Keep links valid both in Vite and under the GitHub Pages repository path. */
export const siteBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/`;
export const localHref = (path: string) => siteBase + path.replace(/^\//, "");
export const currentPage = () => {
  const path = window.location.pathname;
  const relative = path.startsWith(siteBase) ? path.slice(siteBase.length) : path.replace(/^\//, "");
  return "/" + relative.replace(/\/$/, "");
};
