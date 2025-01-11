/**
 *
 * When fetching data this expects:
 *
 * @param {string} path
 * @param {Array<[string, string]>} [params] - key, value tuple pairs for query params (optional)
 *
 */
export function get_data(path: string, params?: Array<[string, string]>) {
  const domain = window.location.hostname;
  let query_params: null | string = null;

  if (params) {
    query_params = "?";
    for (const [key, value] of params) {
      query_params.concat("" + key + "=" + value);
    }
  }

  return fetch(domain + path + query_params, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
