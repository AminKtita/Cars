import React, { createContext, useState } from 'react'

export const CarContext = createContext();

const CarContextProvider = (props) =>{

    const currency ='€';
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] =useState(false);
    const value ={
        currency,search,setSearch,showSearch,setShowSearch
    }

    return (
        <CarContext.Provider value={value}>
            {props.children}

        </CarContext.Provider>
      )
    
}
export default CarContextProvider;

