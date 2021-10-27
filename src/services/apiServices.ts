import { Response } from "./notes/type";

const URL = "firebase url";

export const fetchData = (data: any, method = "GET"): Promise<Response> => {
  return fetch(URL, {
    method,
    body: method === "GET" ? undefined : data,
  })
    .then(res => res.json())
    .then(data => ({ success: true, data } as Response));
};
