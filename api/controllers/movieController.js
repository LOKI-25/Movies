import Movie from "../models/Movie.js";
import Theatre from "../models/Theatre.js";
import { compareDates } from "../utils/dateUtil.js";

export const createMovie = async (req, res, next) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json(`Movie ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const user = await Movie.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const users = await Movie.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const searchMovie = async (req, res, next) => {
  try {
    // Fetch movie
    const movie = await Movie.findById(req.params.id);

    // Fetch show info
    const { state, theatre, date } = req.query;
    const theatres = await Theatre.find({
      state: state,
      name: theatre,
    });

    console.log(`KMJ :: movieController: theatres: ${theatres}`);

    // only required info
    const moviesData = {};
    for (const theatre of theatres) {
      for (const screen of theatre.screens) {
        for (const show of screen.shows) {
          const diff = compareDates(show.release_date, date);
          if (diff === 0 || diff === -1) {
            if (show.movie_title === movie.title) {
              const currentShowList = moviesData[movie.title] || [];
              const showDetails = {
                total_seats: show.total_seats,
                start: show.start,
                end: show.end,
                price: show.price,
                available_seats: show.available_seats,
                reserved_seats: show.reserved_seats,
                release_data: show.release_date,
                screen_id: screen.screen_id,
                screen_name: screen.name,
                screen_type: screen.type,
                theatre_name: theatre.name,
                state: theatre.state,
                city: theatre.city,
                zipcode: theatre.zipcode,
              };
              currentShowList.push(showDetails);
              moviesData[movie.title] = currentShowList;
            }
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      movie: movie,
      shows: moviesData,
    });
  } catch (err) {
    next(err);
  }
};
