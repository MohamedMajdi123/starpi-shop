import axiosClient from "./axiosClient";

type Cart = {
    username: string;
    email: string;
    productId: string; // تصحيح الخطأ الإملائي
}
const getCartByEmail = async (email: string) => {
    try {
        const response = await axiosClient.get(`/carts?filters[email][$eq]=${email}&populate=*`);
        return response.data; // إرجاع البيانات من الاستجابة
    } catch (error) {
        console.error("Error: " + error);
        throw error; // إعادة الخطأ ليتم التعامل معه في مكان آخر إذا لزم الأمر
    }
};
const deletCartById = async (id: string) => {
    try {
        const response = await axiosClient.delete(`/carts/${id}`);
        return response.data; // إرجاع البيانات من الاستجابة
    } catch (error) {
        console.error("Error: " + error);
        throw error; // إعادة الخطأ ليتم التعامل معه في مكان آخر إذا لزم الأمر
    }
};
const addToCart = async ({payload} : {payload: Cart}) => {
    try {
        const response = await axiosClient.post("/api/carts", payload);
        return response.data; // إرجاع البيانات المستلمة
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error; // إعادة رمي الخطأ لمزيد من المعالجة
    }
}

const cartApis = {
    addToCart,
    getCartByEmail,
    deletCartById
}

export default cartApis;