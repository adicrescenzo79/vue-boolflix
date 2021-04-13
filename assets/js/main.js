Vue.config.devtools = true;
var app = new Vue({
  el: '#root',
  data: {
    searchMovie: 'avengers',
    movies: [],
    searchActive: false,
    uri: 'https://api.themoviedb.org/3',
    api_key: '07d44c193ccfbcc66cd9b564a4d50433',
    lang: 'it',

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
  },

  methods: {

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
