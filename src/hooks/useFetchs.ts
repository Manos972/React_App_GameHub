import {useEffect, useState} from "react";
import apiClient from "../services/api-client.ts";
import {AxiosRequestConfig, CanceledError} from "axios";

export interface FetchResponse<T> {
	count: number;
	results: T[];
}

const useFetch = <T> ( endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[] ) => {
	const [ data, setData ] = useState<T[]>( [] );
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( "" );

	useEffect( () => {
		const controller = new AbortController();

		setLoading( true );
		apiClient
			.get<FetchResponse<T>>( endpoint, {signal: controller.signal, ...requestConfig} )
			.then( ( res ) => {
				setData( res.data.results );
				setLoading( false );
			} )
			.catch( ( err ) => {
				if ( err instanceof CanceledError ) return;
				setError( err.message );
				setLoading( false );
			} );

		return () => controller.abort();
	}, deps ? [ ...deps ] : [] );

	return {data, error, loading};
};

export default useFetch;