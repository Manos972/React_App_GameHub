import useFetch from "./useFetchs.ts";
import {GameQuery} from "../App";

// import {Genre} from "./useGenres.ts";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}
export interface Games {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
    rating: number;
}

const useGames = ( gameQuery: GameQuery ) =>
	useFetch<Games>(
        "/games",
        {
            params: {
                genres   : gameQuery.genre?.id,
                platforms: gameQuery.platform?.id,
                ordering : gameQuery.sortOrder,
                search: gameQuery.searchText,
            },
        },
        [ gameQuery ],
    );


export default useGames;