import {SimpleGrid, Text} from "@chakra-ui/react";
import useGames from "../hooks/useGames.tsx";
import GameCard from "./GameCard.tsx";
import GameCardSkeleton from "./GameCardSkeleton.tsx";
import GameCardContainer from "./GameCardContainer.tsx";
import {Genre} from "../hooks/useGenres.tsx";

interface Props {
	selectedGenre: Genre | null;
}

function GameGrid ( {selectedGenre}: Props ) {
	const {error, data, loading} = useGames( selectedGenre );
	const skeletons = [ 1, 2, 3, 4, 5, 6 ];
	return (
		<>
			{error && <Text>{error}</Text>}
			{data && (
				<SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 5}} spacing={10}>
					{loading && skeletons.map( skeleton =>
						<GameCardContainer key={skeleton}>
							<GameCardSkeleton/>
						</GameCardContainer> )}
					{data.map( ( game ) => (
						<GameCardContainer key={game.id}>
							<GameCard game={game}/>
						</GameCardContainer>
					) )}
				</SimpleGrid>
			)}
		</>
	);
}

export default GameGrid;