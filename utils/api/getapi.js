import axios from "axios";
export const getCatePro = (catelist) => {
  axios({
    url: "http://localhost:3500/catePros",
    method: "GET",
    responseType: "json",
  })
    .then((res) => {
      document.querySelector(catelist).innerHTML = res.data
        .map((item) => {
          return /*html*/ `
                <option value="${item.id}">${item.name}</option>
            `;
        })
        .join("");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const filterByCate = async (catename) => {
  await axios({
    url: "http://localhost:3500/products?_expand=catePro",
    method: "GET",
    responseType: "json",
  })
    .then((res) => {
      console.log(res);
      let result = res.filter((item) => item.catePro.name == catename);
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
