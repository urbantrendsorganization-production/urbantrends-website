import React, { createContext, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({children}) => {
    const [ordersCount, setOrderCount] = useState(0);

    return (
        <OrdersContext.Provider values={{ordersCount, setOrderCount}}>
            {children}
        </OrdersContext.Provider>
    )
}

export const useOrders = () => createContext(OrdersContext);