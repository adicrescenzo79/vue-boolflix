Vue.config.devtools = true;
var app = new Vue({
  el: '#root',
  data: {
    searchMovie: 'avengers',
    movies: [],
    tvShows: [],
  },
  methods: {
    search: function(){
      let search = this.searchMovie;
      this.searchMovie = '';
      axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=07d44c193ccfbcc66cd9b564a4d50433&language=it&query=${search}`)
      .then((response) => {
        const result = response.data.results;
        this.movies = result;
      });
      axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=07d44c193ccfbcc66cd9b564a4d50433&language=it&query=${search}`)
      .then((response) => {
        const result = response.data.results;
        this.tvShows = result;

      });

    },
  }
})

// METODO VUE PER LA RICHIESTA DI API
// axios
// .get('https://flynn.boolean.careers/exercises/api/random/boolean')
// .then(function (response) {
//   const result = response.data;
// })
// .catch((error) => {
//   console.log(error);
// });
