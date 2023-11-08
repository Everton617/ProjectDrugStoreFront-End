import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductData } from "../interface/ProductData";

const API_URL = 'https://projetofullstack-nf8h.onrender.com';

const postData = async (data: ProductData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/products', data);
    return response;
};

export function useProductDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['product-data'])
        }
    })

    return mutate;
}
