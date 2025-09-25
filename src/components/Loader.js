import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

export const FormLoader = () => {

    const [formLoading] = useState(true)
     const override = { 
            display: "block",
            borderColor: "black",
          };


    return (
        <div className='form-loader flex'>
            <HashLoader
                color={'black'}
                loading={formLoading}
                cssOverride={override}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />Loading...
        </div>
    )
}