import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helper/helper";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.selectedItems.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return reducer(state, { type: "INCREASE", payload: action.payload });
      }

      const newSelectedItems = [
        ...state.selectedItems,
        { ...action.payload, quantity: 1 },
      ];

      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
        checkout: false,
      };
    }

    case "INCREASE": {
      const newSelectedItems = state.selectedItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
      };
    }

    case "DECREASE": {
      const newSelectedItems = state.selectedItems
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
      };
    }

    case "REMOVE_ITEM": {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id,
      );
      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
        checkout: false,
      };
    }

    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };

    default:
      throw new Error("Invalid Action!");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
