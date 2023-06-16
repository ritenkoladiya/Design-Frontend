import axios from 'axios';
let token = JSON.parse(localStorage.getItem('token'))


const Api_call = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
        "Content-Type": "multipart/form-data",
        'Authorization': `${token}`,
    }
});
//user
export const Regi = (data) => Api_call.post("/user", data);
export const login = (data) => Api_call.post("/login", data);
export const adduser = (data) => Api_call.post("/adduser", data);
export const getalluse = (page, size, data) => Api_call.get(`/alluser?page=${page}&limit=${size}`, data);
export const edituser = (data, id) => Api_call.put(`/updateuser/${id}`, data);
export const deleteuser = (id) => Api_call.delete(`/deleteuser/${id}`);
export const SearchAlluser = (data) => Api_call.get("/searchuser?value=" + data);
//category
export const categoryadd = (data) => Api_call.post("/addcategory", data);
export const subcategoryadd = (data) => Api_call.post("/addsubcategory", console.log(data, "data"));
export const allcategoryget = (page, size) => Api_call.get(`/allcategory?page=${page}&limit=${size}`);
export const allsubcategoryget = (subctypage, subctysize) => Api_call.get(`/subcategory?page=${subctypage}&limit=${subctysize}`);
export const categorydelete = (DELETE_API, ID) => Api_call.delete(`/${DELETE_API}/${ID}`);
export const singelcty = (id) => Api_call.get(`/singelcategory/${id}`);
export const singelsubcty = (id) => Api_call.get(`/singelsubcategory/${id}`);
export const ctyupdate = (selectedItem, category) => Api_call.put(`/updatecategory/${selectedItem}`, category);
export const subctyupdate = (selectedItem, category, category_id) => Api_call.put(`/updatesubcategory/${selectedItem}`, category, category_id);
export const allcty = () => Api_call.get("/allcategory");
export const subcty = (ID) => Api_call.get(`/getsubcategory/${ID}`)
//product
export const productadd = (data) => Api_call.post("/addproduct", data);
export const productall = (page, size) => Api_call.get(`/allproduct?page=${page}&limit=${size}`);
export const deletepro = (id) => Api_call.delete(`/deleteproduct/${id}`);
export const getsingelproduct = (id) => Api_call.get(`/singelproduct/${id}`);
export const updateproduct = (id, data) => Api_call.put(`/productupdate/${id}`, data);
export const Searchproduct = (data) => Api_call.get("/searchproduct?value=" + data);