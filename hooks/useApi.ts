// client-side hooks
'use client';

import { useState } from 'react';

export function useApi<T, E = Error>(){
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    const [isloading, setIsLoading] = useState(false);

    const execute = async(promise : Promise <T>) => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await promise;
            setData(result);
            return result;
        } catch (e) {
            setError(e as E);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {data, error, isloading, execute};
}
