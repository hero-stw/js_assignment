import instance from "./instance";

export const filters = (name, value) => {
  const url = `/products?_${name}=${value}`;
  return instance.get(url);
};
export const pagination = (page, limit) => {
  const url = `/products?_page=${page}&_limit=${limit}`;
  return instance.get(url);
};
export const search = (name, value) => {
  const url = `/products?_${name}_like=${value}`;
  return instance.get(url);
};
export const sort = (name, order) => {
  const url = `/products?_sort=${name}&_order=${order}`;
  return instance.get(url);
};
