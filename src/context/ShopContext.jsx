import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_free = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
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


  const value = {
    products,
    currency,
    delivery_free,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
