import instance from "./instance";

export const getAll = ()=> {
    const url = "/catePro";
    return instance.get(url);
}
export const get = (id)=> {
    const url = `/catePro/${id}`;
    return instance.get(url);
}
export const add = (product)=> {
    const url = `/catePro`;
    return instance.post(url, product);
}