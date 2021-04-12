// SCOMMENTARE SE SI USA JQUERY
// $(document).ready(function(){
//
// });

// METODO JQUERY PER LA RICHIESTA DI API
$.ajax(
{
url: "https://flynn.boolean.careers/exercises/api/random/boolean",
method: "GET",
success: function (data, stato) {
$("#risultati").html(data);
},
error: function (richiesta, stato, errori) {
alert("E' avvenuto un errore. " + errore);
}
}
);

// SCOMMENTARE SE SI USA VUE
Vue.config.devtools = true;
var app = new Vue({
  el: '#root',
  data: {
    message: 'Hello Vue!'
  }
})

// METODO VUE PER LA RICHIESTA DI API
axios
.get('https://flynn.boolean.careers/exercises/api/random/boolean')
.then(function (response) {
  const result = response.data;
})
.catch((error) => {
  console.log(error);
});
