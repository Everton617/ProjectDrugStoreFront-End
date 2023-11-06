import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductData } from "../interface/ProductData";

const API_URL = 'http://localhost:8080';

const postData = async (data: ProductData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/product', data);
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
