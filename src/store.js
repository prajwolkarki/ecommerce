import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create((set) => ({
  data: [],
  loading: true,
  error: null,
  fetchData: async () => {
    try {
      const res = await fetch("https://fakestoreapi.in/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      set({ data: data.products, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      console.log("Error fetching data:", err);
    }
  },
}));


const useCartStore = create(persist(
  (set,get) => ({
    cart: [],
    addToCart: (item) =>
      set((state) => {
        const existingItem = state.cart.find((i)=> i.id === item.id);
        if (existingItem) {
          return {
            cart: state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        } else {
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }
      }),
    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart
          .map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      })),
    clearCart: () => set({ cart: [] }),
    getTotalQuantity:() =>{
      return get().cart.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice: () => {
      return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  }),
  {
    name: "cart-storage", 
  }
));
export  {useStore,useCartStore};
