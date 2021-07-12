import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface IMoviesContextProviderProps {
  children: ReactNode;
}
interface IMoviesContext {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  handleClickButton: (id: number) => void;
}
export const MoviesContext = createContext<IMoviesContext>(
  {} as IMoviesContext
);

export function MoviesContextProvider({children}: IMoviesContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        selectedGenre,
        selectedGenreId,
        movies,
        handleClickButton,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
