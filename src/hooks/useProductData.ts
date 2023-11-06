import axios, {AxiosPromise} from "axios";
import {useQuery} from "@tanstack/react-query";
import { ProductData } from "../interface/ProductData";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<ProductData[]> =>{
    const response = axios.get(API_URL + '/product')
    return response;
}

export function useProductData(){
    const query = useQuery({
        queryFn : fetchData,
        queryKey : ['product-data'],
        retry: 2
    })
    return{
        ...query,
        data: query.data?.data
    }
}