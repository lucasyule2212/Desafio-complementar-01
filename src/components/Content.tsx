import { ReactNode } from "react";
import { MovieCard } from "./MovieCard";


interface IContentProps{
  genreTitle:string;
  children:ReactNode;
}

export function Content(props:IContentProps) {
  // Complete aqui
  return(
    <>
    <header>
    <span className="category">
      Categoria:<span> {props.genreTitle}</span>
    </span>
  </header>

  <main>
    <div className="movies-list">
      {props.children}
    </div>
  </main>
  </>
  );
}