import axios from "axios";
export const baseUrl = "http://localhost:8000/";

export const getBillBoards = async () => {
  let data = [];
  try {
    let response = await axios.get(baseUrl + "bill/board/all");
    data = response.data;
    console.log("Response loaded" + response);
    console.log("Token loaded" + localStorage.getItem("token"));
  } catch (e) {
    console.log(e);
  }

  return data;
};

export const getBrand = async () => {
  let data = [];
  try {
    let response = await axios.get(baseUrl + "board/brand/all");
    data = response.data;
  } catch (e) {
    console.log(e);
  }

  return data;
};

export const header = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};
