import axiosClient from "./axiosClient";

const getLatestProducts = async () => {
    try {
        const response = await axiosClient.get("/products?populate=*");
        return response.data; // إرجاع البيانات من الاستجابة
    } catch (error) {
        console.error("Error: " + error);
        throw error; // إعادة الخطأ ليتم التعامل معه في مكان آخر إذا لزم الأمر
    }
};
const getProductById = async (id: string) => {
    try {
        const response = await axiosClient.get(`/products?filters[id][$eq]=${id}&populate=*`);
        return response.data; // إرجاع البيانات من الاستجابة
    } catch (error) {
        console.error("Error: " + error);
        throw error; // إعادة الخطأ ليتم التعامل معه في مكان آخر إذا لزم الأمر
    }
};
const getProductsByCategory = async (category: string) => {
    try {
        const response = await axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);
        return response.data; // إرجاع البيانات من الاستجابة
    } catch (error) {
        console.error("Error: " + error);
        throw error; // إعادة الخطأ ليتم التعامل معه في مكان آخر إذا لزم الأمر
    }
};

const productApi = {
    getLatestProducts,
    getProductById,
    getProductsByCategory
};

export default productApi;