import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
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
        mutationFn: postData, // Certifique-se de definir corretamente a função postData
        retry: 2,
        onSuccess: () => {
            const keyArray: string[] = ['product-data'];
            queryClient.invalidateQueries(keyArray as InvalidateQueryFilters);
        }
    });

    return mutate;
}

