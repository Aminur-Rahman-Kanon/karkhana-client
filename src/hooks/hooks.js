import { useQuery } from 'react-query';
import axios from 'axios';

const fetchRepoData = () => axios.get('https://karkhana-server.onrender.com/products').then(res => res.data);

export function useRepoData() {
    return useQuery(['data'], fetchRepoData, { staleTime: 30000 });
}
