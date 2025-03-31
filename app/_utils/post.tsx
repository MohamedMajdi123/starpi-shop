import axios from 'axios';

interface CartItem {
  username: string;
  email: string;
  products: string;
}


const addCartItem = async (cart: CartItem) => {
  try {
    const response = await axios.post('http://localhost:1337/api/carts', {
      data: cart, // تأكد من استخدام هذا الهيكل
    }, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REST_API_KEY}`, // إضافة API token في رأس الطلب
      },
    });
    console.log('Cart item added:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error adding cart item:', error.response.data); // رسالة الخطأ من الخادم
    } else {
      console.error('Network error:', error);
    }
    throw error;
  }
};

// مثال على استخدام الدالة
export default addCartItem;