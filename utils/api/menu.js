import instance from "./instance";

export const getAll = ()=> {
    const url = "/menus";
    return instance.get(url);
}
export const get = (id)=> {
    const url = `/menus/${id}`;
    return instance.get(url);
}
export const add = (menu)=> {
    const url = `/menus`;
    return instance.post(url, menu);
}
export const remove = (id) => {
    const url = `/menus/${id}`;
    return instance.delete(url);
}
export const update = (menu) => {
    const url = `/menus/${menu.id}`;
    return instance.put(url, menu);
}