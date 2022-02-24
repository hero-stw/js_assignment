import instance from "./instance";

export const getAll = () => {
    const url = "/catePros";
    return instance.get(url);
};
export const get = (id) => {
    const url = `/catePros/${id}`;
    return instance.get(url);
};
export const add = (product) => {
    const url = "/catePros";
    return instance.post(url, product);
};
export const remove = (id) => {
    const url = `/catePros/${id}`;
    return instance.delete(url);
};
export const update = (cate) => {
    const url = `/catePros/${cate.id}`;
    return instance.patch(url, cate);
};