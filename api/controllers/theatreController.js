import Theatre from "../models/Theatre.js";
import Movie from "../models/Movie.js";
import { compareDates } from "../utils/dateUtil.js";

export const createTheatre = async (req, res, next) => {
  const newTheatre = new Theatre(req.body);
  try {
    const savedTheatre = await newTheatre.save();
    res.status(200).json(savedTheatre);
  } catch (err) {
    next(err);
  }
};

export const updateTheatre = async (req, res, next) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedTheatre);
  } catch (err) {
    next(err);
  }
};

export const deleteTheatre = async (req, res, next) => {
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200).json(`Theatre ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getTheatre = async (req, res, next) => {
  try {
    const user = await Theatre.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getTheatres = async (req, res, next) => {
  try {
    const users = await Theatre.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Controller method to find movies by state, theatre, and date
export const search = async (req, res, next) => {
  try {
    const { state, theatre, date } = req.query;

    console.log(`KMJ -- input: ${state}, ${theatre}, ${date}`);

    // Query the Theatre model based on the provided criteria
    const theatres = await Theatre.find({
      state: state,
      name: theatre,
    });

    // Extract movieTitles
    let movieTitles = new Set();

    for (const theatre of theatres) {
      for (const screen of theatre.screens) {
        for (const show of screen.shows) {
          const diff = compareDates(show.release_date, date);
          if (diff === 0 || diff === -1) {
            movieTitles.add(show.movie_title);
          }
        }
      }
    }

    // console.log(`KMJ -- movieTitles: ${[...movieTitles]}`);
    console.log(movieTitles);

    // Query the Movie model to retrieve details for the matching movie titles
    const movieTitlesArray = [...movieTitles];
    const movies = await Movie.find({ title: { $in: movieTitlesArray } });
    // Constructing the dictionary
    const movieDict = {};
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      console.log(`KMJ :: movie: \n${movie}`);
      // movieDict["title"] = movie.title;
      // movieDict["description"] = movie.description;
      // movieDict["certificate"] = movie.certificate;
      // movieDict["duration"] = movie.duration;
      // movieDict["price"] = movie.price;
      // movieDict["genres"] = movie.genres;
      // movieDict["release_date"] = movie.release_date;
      // movieDict["photos"] = movie.photos;
      // movieDict["_id"] = movie._id;
      movieDict[movie.title] = movie;
    }

    const moviesData = {};
    // Iterate movies and capture all shows and theatre info
    for (const movie of movieTitles) {
      for (const theatre of theatres) {
        for (const screen of theatre.screens) {
          for (const show of screen.shows) {
            const diff = compareDates(show.release_date, date);
            if (diff === 0 || diff === -1) {
              if (show.movie_title === movie) {
                const movieData = movieDict[movie];
                const currentShowList = moviesData[movie] || [];
                const showDetails = {
                  title: movieData.title,
                  description: movieData.description,
                  certificate: movieData.certificate,
                  duration: movieData.duration,
                  genres: movieData.genres,
                  release_date: movieData.release_date,
                  photos: movieData.photos,
                  _id: movieData._id,
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
                moviesData[movie] = currentShowList;
              }
            }
          }
        }
      }
    }

    // Respond with the list of movies that match the criteria
    res.status(200).json({
      success: true,
      movies: movies.map((movie) => ({
        title: movie.title,
        description: movie.description,
        certificate: movie.certificate,
        duration: movie.duration,
        price: movie.price,
        genres: movie.genres,
        release_date: movie.release_date,
        photos: movie.photos,
        _id: movie._id,
      })),
      shows: moviesData,
    });
  } catch (err) {
    next(err);
  }
};
