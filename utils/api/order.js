import instance from "./instance";

export const get = (id)=> {
    const url = `/orders/${id}`;
    return instance.get(url);
}
export const add = (order)=> {
    const url = `/orders`;
    return instance.post(url, order);
}
export const addOrderDetail = (order)=> {
    const url = `/orderDetails`;
    return instance.post(url, order);
}
export const update = (order) => {
    const url = `/orders/${order.id}`;
    return instance.patch(url, order);
}
