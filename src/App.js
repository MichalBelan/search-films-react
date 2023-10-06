import React from "react";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";
import data from "./data1";
import allMovies from "./data2";
import { useState, useReducer, useEffect } from "react";

const reducer = (state, action) => {
  if (action.type === "ADD_MOVIE") {
    const newMovies = [...state.movies, action.payload];
    return {
      ...state,
      movies: newMovies,
      showNotifications: true,
      notificationContent: "Film bol pridany",
    };
  }
  if (action.type === "NO_MOVIE_NAME") {
    return {
      ...state,
      showNotifications: true,
      notificationContent: "Film nebol pridany",
    };
  }

  if (action.type === "CLOSE_NOTIFICATION") {
    return {
      ...state,
      showNotifications: false,
    };
  }

  if (action.type === "REMOVE_MOVIE") {
    const filtredMovies = state.movies.filter((oneMovie) => {
      return oneMovie.id !== action.payload;
    });
    return {
      ...state,
      movies: filtredMovies,
    };
  }

  return new Error("Chyba");
};

const defaultState = {
  movies: [],
  showNotifications: false,
  notificationContent: "",
};



const App = () => {
  const [movieNames, setMovieNames] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [searchingText,setSearchingText]= useState("")
  const [filteredMovies,setFilteredMovies] = useState([])

  useEffect(()=>{
   let moviesAfterFilter = allMovies.filter((oneMovie)=>{
     return oneMovie.title.toLowerCase().includes(searchingText.toLocaleLowerCase())
   })
   setFilteredMovies(moviesAfterFilter)
  },[searchingText])

  const submitForm = (e) => {
    e.preventDefault();
    if (movieNames) {
      const newMovie = { id: new Date().getTime(), name: movieNames };
      dispatch({ type: "ADD_MOVIE", payload: newMovie });
    } else {
      dispatch({ type: "NO_MOVIE_NAME" });
    }
    setMovieNames("");
  };

  const closeNotifications = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" });
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <section className="form">
        {state.showNotifications && (
          <Modal
            notifContent={state.notificationContent}
            closeNotif={closeNotifications}
          />
        )}
        <form onSubmit={submitForm}>
          <input
            type="text"
            value={movieNames}
            onChange={(e) => setMovieNames(e.target.value)}
          />
          <input type="submit" value="Pridat" />
        </form>
        <div>
          {state.movies.map((oneMovie) => {
            return (
              <div className="all-movies" key={oneMovie.id}>
                <p>{oneMovie.name}</p>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_MOVIE", payload: oneMovie.id })
                  }
                >
                  Vymazat
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="movies-box">
        <form>
          <input type="text" placeholder="Hladany film" onChange={(e)=>setSearchingText(e.target.value)}/>
        </form>
          <div className="all-movies">
            {filteredMovies.map((oneMovie) =>{
              const {id,image,title,age,tags,description}=oneMovie
              return <div className="one-movie" key={id}>
                  <img src={image} alt="" />
                  <h2>{title}</h2>
                  <p>{age}</p>
                  <p>{tags}</p>
                  <p>{description}</p>
              </div>
            })}
          </div>
      </div>
    </div>
  );
};

export default App;
