import React, { createContext, useState } from 'react'

//create globally acess context
export const deleteRecipeResponseContext= createContext()
export const editRecipeResponseContext= createContext()
export const addReciperesponseContext=createContext()

function ContentShare({children}) {
    const [deleteRecipeResponse,setDeleteRecipeResponse] = useState(false)
    const [editRecipeResponse,setEditRecipeResponse]=useState("")
    const [addReciperesponse,setAddRecipeResponse]=useState(false)
  return (
    <>
        <addReciperesponseContext.Provider value={{addReciperesponse,setAddRecipeResponse}}>
        <deleteRecipeResponseContext.Provider value={{deleteRecipeResponse,setDeleteRecipeResponse}}>
        <editRecipeResponseContext.Provider value={{editRecipeResponse,setEditRecipeResponse}}>
            {children}
        </editRecipeResponseContext.Provider>
        </deleteRecipeResponseContext.Provider>
        </addReciperesponseContext.Provider>
    </>
  )
}

export default ContentShare