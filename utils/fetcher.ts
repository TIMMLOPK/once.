export const fetcher = (...args: [any, any]) =>
  fetch(...args).then((res) => res.json());
