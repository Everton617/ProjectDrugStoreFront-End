import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

const deleteData = async (codigo: number) => {
    const response = await axios.delete(`${API_URL}/product/${codigo}`);
    return response;
};

export function useProductDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['product-data'])
        }
    })

    return mutate;
}
