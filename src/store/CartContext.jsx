import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    try {
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  const [userId, setUserId] = useState(null);

  //  Save to localStorage 
  useEffect(() => {
    if (Array.isArray(items)) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    } else {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }, [items]);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return unsubscribe;
  }, []);

 
  useEffect(() => {
    if (!userId) return;
    const cartRef = doc(db, "carts", userId);

    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const firebaseItems = docSnap.data()?.items;
        if (Array.isArray(firebaseItems)) {
          setItems(firebaseItems);
          localStorage.setItem("cartItems", JSON.stringify(firebaseItems));
        }
      } else {
      
        setItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
      }
    });

    return unsubscribe;
  }, [userId]);

  //  Save to Firestore
  const saveCartToFirebase = async (updatedItems) => {
    if (!userId) return;
    const cartRef = doc(db, "carts", userId);
    const safeItems = Array.isArray(updatedItems) ? updatedItems : [];
    await setDoc(cartRef, { items: safeItems }, { merge: true });
  };

  // Add item
  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }
      saveCartToFirebase(updatedItems);
      return updatedItems;
    });
  };

  //  Remove item
  const removeItem = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === id);
      if (!existingItem) return prevItems;
      let updatedItems;
      if (existingItem.quantity > 1) {
        updatedItems = prevItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        updatedItems = prevItems.filter((i) => i.id !== id);
      }
      saveCartToFirebase(updatedItems);
      return updatedItems;
    });
  };

  // Clear Cart
 
  const clearCart = () => {
    setItems([]);
    saveCartToFirebase([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
