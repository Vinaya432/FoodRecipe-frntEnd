import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverURL";

//register API
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")

}

//login API
export const loginAPI = async(user,role)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,{...user,role},"")
}

//add recipe Api
export const addRecipeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addrecipe`,reqBody,reqHeader)
}

//get all recipes
export const getAllRecipesAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-recipes?search=${searchKey}`,"",reqHeader)
}

//get category based recipes
export const getcategoryRecipesAPI = async(category,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-category-recipes?category=${category}`,"",reqHeader)

}

//get user recipes
export const getUserRecipeAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-recipe`,"",reqHeader)
}

//get a single recipe
export const getASingleRecipeAPI =  async(id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/recipe/${id}`,"",reqHeader)
}

//edit recipe
export const editRecipeAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/userrecipe/edit/${id}`,reqBody,reqHeader)

}

//delete recipe
export const deleteRecipeAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/userrecipe/delete/${id}`,{},reqHeader)
}

//user prifile updation
export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//add to fav
export const addToFavAPI=  async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-to-fav`,reqBody,reqHeader)
}

//get fav list
export const getFavRecipeAPI= async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/favrecipe-list`,"",reqHeader)
 
}

//delete recipe
export const deleteFavRecipeAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/favrecipe/delete/${id}`,{},reqHeader)
}

//get all recipes by admin
export const getAllRecipesAdminAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-all-recipes`,"",reqHeader)
}
