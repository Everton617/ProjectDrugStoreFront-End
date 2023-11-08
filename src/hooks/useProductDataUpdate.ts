import { useMutation, useQueryClient,InvalidateQueryFilters } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductData } from "../interface/ProductData";

const API_URL = 'https://projetofullstack-nf8h.onrender.com';

const putData = async ({ id, data }: { id: number; data: ProductData }): AxiosPromise<any> => {
    const response = await axios.put(`${API_URL}/products/${id}`, data);
    return response;
};

export function useProductDataUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            const keyArray: string[] = ['product-data'];
            queryClient.invalidateQueries(keyArray as InvalidateQueryFilters);
        }
    });

    return mutate;
}
