import {Text, List, ListItem, HStack, Image, Spinner, Button, Heading} from "@chakra-ui/react";
import useFetch from "../hooks/useFetchs.ts";
import useGenres, {Genre} from "../hooks/useGenres.ts";
import getCropImageUrl from "../services/image-url.ts";

interface Props {
	onSelectGenre: ( genre: Genre ) => void;
	selectedGenre: Genre | null;
}

const GenreList = ( {selectedGenre, onSelectGenre}: Props ) => {
	const {data, isLoading, error} = useGenres();

	if ( error ) return <Text>{error}</Text>;

	if ( isLoading ) return <Spinner/>;

	return (
		<>
			<Heading fontSize="2xl" marginTop={9} marginBottom={3}>
				Genres
			</Heading>
			<List>
				{data.map( ( genre ) => (
					<ListItem key={genre.id} paddingY="5px">
						<HStack>
							<Image
								boxSize="32px"
								borderRadius={8}
								objectFit="cover"
								src={getCropImageUrl( genre.image_background )}
							/>
							<Button
								whiteSpace="normal"
								textAlign="left"
								fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
								onClick={() => onSelectGenre( genre )}
								fontSize="md"
								variant="link"
							>
								{genre.name}
							</Button>
						</HStack>
					</ListItem>
				) )}
			</List>
		</>
	);
};

export default GenreList;