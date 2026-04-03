import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if(token){
       try {
         await axios.post(backend_url + "/api/cart/add", {itemId, size},{headers:{token}});
       } catch (error) {
         console.log(error);
          toast.error("Failed to add item to cart on server");
       }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const sizeObj = cartItems[itemId];
      for (const size in sizeObj) {
        try {
          if (sizeObj[size] > 0) {
            totalCount += sizeObj[size];
          }
        } catch {
          // Intentionally ignore errors
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    if (quantity === 0) {
      
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; 
      }
    } else {
      cartData[itemId][size] = quantity;
    }
  }

  setCartItems(cartData);

  if(token){
     try {
        await axios.post(backend_url + "/api/cart/update", {itemId, size, quantity},{headers:{token}});
     } catch (error) {
        console.log(error);
        toast.error("Failed to update cart on server");
     }
  }
};

const getCartAmount =  () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
        let itemInfo = products.find((product) => product._id === itemId);
        for(const size in cartItems[itemId]){
            try {
                if (cartItems[itemId][size] > 0) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            } catch {
                // Intentionally ignore errors
            }
        }
    }
    return totalAmount;
}

const getProductsData = async () => {
  try {

    const response = await axios.get(backend_url + "/api/product/list");
    if(response.data.success){
       setProducts(response.data.products);
    }
    else{
      toast.error("Failed to fetch products data");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error fetching products data");
  }
}

const getUserCart = async (token) => {
  try {
    
     const response = await axios.post(backend_url + "/api/cart/user",{}, {headers:{token}});
     if(response.data.success){
        setCartItems(response.data.cartData);
     }
  } catch (error) {
    console.log(error);
    toast.error("Error fetching user cart");
  }

}

 useEffect(() => {
   getProductsData();
 },[])

 useEffect(()=> {
   if(!token && localStorage.getItem("token")){
     setToken(localStorage.getItem("token"));
     getUserCart(localStorage.getItem("token"));
   }
 },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backend_url,
    setToken,
    token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
