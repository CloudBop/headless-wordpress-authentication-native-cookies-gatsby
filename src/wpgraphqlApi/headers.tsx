// headers
export const headers: RequestInit = {
  headers: {
    // authorization: `Bearer token goes here ${token && token || 'demotoken'}`
  },
};
export const authHeaders: RequestInit = {
  headers: {
    // authorization: `Bearer token goes here ${token && token || 'demotoken'}`
  },
  // httpOnly headers
  credentials: "include",
  // cross origin resource sharing
  mode: "cors",
};
// static data (public) (could be ofucsated via cloud?)
export const endpoint = `${process.env.GATSBY_WORDPRESS_API_URL}`;
