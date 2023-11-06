import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductData } from "../interface/ProductData";

const API_URL = 'http://localhost:8080';

const putData = async ({ id, data }: { id: number; data: ProductData }): AxiosPromise<any> => {
    const response = await axios.put(`${API_URL}/product/${id}`, data);
    return response;
};


export function useProductDataUpdate() {
    const queryClient = useQueryClient();
   const mutate = useMutation({
    mutationFn: putData,
    retry: 2,
    onSuccess: () =>{
        queryClient.invalidateQueries(['product-data'])
    }
   })
    

    return mutate;
}
