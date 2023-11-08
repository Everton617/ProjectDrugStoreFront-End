import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'https://projetofullstack-nf8h.onrender.com';

const deleteData = async (codigo: number) => {
    const response = await axios.delete(`${API_URL}/products/${codigo}`);
    return response;
};

export function useProductDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            const keyArray: string[] = ['product-data'];
            queryClient.invalidateQueries(keyArray as InvalidateQueryFilters);
        }
    });

    return mutate;
}

