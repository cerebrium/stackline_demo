/**
 *
 * When fetching data this expects:
 *
 * @param {string} path
 * @param {{ [key: string]: unknown }} body
 * @returns Error from attempting to json stringify the body, or request
 *
 */
export async function post_data(
  path: string,
  body?: { [key: string]: unknown },
) {
  const domain = window.location.hostname;

  let json_body;
  try {
    json_body = JSON.stringify(body);
  } catch (e) {
    return e;
  }

  return fetch(domain + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json_body,
  });
}
