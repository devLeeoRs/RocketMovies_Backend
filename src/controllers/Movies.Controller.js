const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async show(request, response) {
    const { id } = request.params;

    const movie = await knex("movie_notes").select("*").where({ id }).first();
    const movie_tag = await knex("movie_tags")
      .select("*")
      .where({ note_id: id });

    console.log(movie);

    return response.json({
      ...movie,
      movie_tag,
    });
  }
  async index(request, response) {
    const { title, tags, rating } = request.query;
    const user_id = request.user.id;

    let movies;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      movies = await knex("movie_tags")
        .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("movie_notes.title");
    } else {
      movies = await knex("movie_notes")
        .where({ user_id })
        // .where("movie_notes.rating", rating)
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("movie_tags").where({ user_id });
    const notesAndTags = movies.map((movie) => {
      const noteTags = userTags.filter((tag) => tag.note_id === movie.id);

      return {
        ...movie,
        tags: noteTags,
      };
    });

    response.json(notesAndTags);
  }
  async create(request, response) {
    const user_id = request.user.id;
    const { title, description, rating, tags } = request.body;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    if (tags) {
      const movieTags = tags.map((tag) => {
        return {
          name: tag,
          user_id,
          note_id,
        };
      });
      await knex("movie_tags").insert(movieTags);
    }

    return response.json({ message: "note success" });
  }
  async delete(request, response) {
    const user_id = request.user.id;

    await knex("movie_notes").where({ user_id }).del();

    return response.json({ message: "note is deleted " });
  }
}

module.exports = MoviesController;
