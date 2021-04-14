Vue.config.devtools = true;
var app = new Vue({
  el: '#root',
  data: {
    searchMovie: 'mamma',
    movies: [],
    searchActive: false,
    uri: 'https://api.themoviedb.org/3',
    api_key: '07d44c193ccfbcc66cd9b564a4d50433',
    lang: 'it',
    actors: [],
    movieGenres: [],
  },

  mounted() {
    // DA TOGLIERE
    let search = this.searchMovie;
    this.searchMovie = '';
    axios
    .get(`${this.uri}/search/movie?api_key=${this.api_key}&language=${this.lang}&query=${search}`)
    .then((response) => {
      const result = response.data.results;
      this.movies = [...this.movies, ...result]
    });
    axios
    .get(`${this.uri}/search/tv?api_key=${this.api_key}&language=${this.lang}&query=${search}`)
    .then((response) => {
      const result = response.data.results;
      this.movies = [...this.movies, ...result]
    });
    // DA TOGLIERE
    axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=07d44c193ccfbcc66cd9b564a4d50433&language=it`)
    .then((response) => {
      const result = response.data.genres;
      this.movieGenres = result;
    });


  },

  methods: {
    genreName: function(genre){
      let result = this.movieGenres.find(genreObj => {
        return genreObj.id == genre;
      });
      return (result && result.name) ? result.name : '' ;
    },

    credits: function(type, id){
      axios
      .get(`${this.uri}/${type}/${id}/credits?api_key=${this.api_key}`)
      .then((response) => {
        const result = response.data.cast;
        for (var i = 0; i < 5; i++) {
          let name = result[i].name;
          this.actors.push(name);
        }
      });

    },

    search: function(){
      if (!this.searchActive) {
        this.searchActive = !this.searchActive;
        // PERCHE' NON FUNZIONA IL FOCUS?
        this.$refs.searchInput.focus();
      } else {
        this.searchActive = !this.searchActive;
        let search = this.searchMovie;
        this.searchMovie = '';
        this.movies = [];
        axios
        .get(`${this.uri}/search/movie?api_key=${this.api_key}&language=${this.lang}&query=${search}`)
        .then((response) => {
          const result = response.data.results;
          this.movies = [...this.movies, ...result]
        });
        axios
        .get(`${this.uri}/search/tv?api_key=${this.api_key}&language=${this.lang}&query=${search}`)
        .then((response) => {
          const result = response.data.results;
          this.movies = [...this.movies, ...result]
        });
      }
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
