'use strict';

$(function() {

  $('#hamburger').on('click', function() {
    $('header nav').slideToggle();
  });

  /*__________Function for image slider_________ */
  function imageSlider() {
    var count = 0;
    var width = 1050;

    setInterval(function(){
      $('.hero-images').animate({'margin-left': '-=' + width}, 1000, function(){
        count++;
        if(count === 3) {
          $('.hero-images').css('margin-left',0);
          count = 0;
        }
      });
    },4000);
  }

  /*_________Function for handlebars_______________*/
  function compileHandlebars() {
    var handlebarsData = [
      {
        category: 'about',
        title: 'A LITTLE ABOUT MYSELF',
        content: 'Hi! My name is John and I\'m an aspiring sofware developer. After working as an engineer for several years I decided to take the next step in my career and learn software development. Contributing to others, personal growth, and continually learning are three values I try to live by every day.'
      },
      {
        category: 'experience',
        title: 'EXPERIENCE',
        content: 'My experience includes: '
      },
      {
        category: 'projects',
        title: 'Projects',
        content: 'This is the projects section'
      },
      {
        category: 'contact',
        title: 'GET IN TOUCH',
        content:''
      }
    ];
    for (var i = 0; i < handlebarsData.length; i++){
      var template = $('#template').html();
      var compileData = Handlebars.compile(template);
      $('#main').append(compileData(handlebarsData[i]));
    }
    $('#about h1').after('<img src="img/image2.jpg">');

    $('#experience p').after('<div id="icons">');
    $('#icons').append('<img src="img/postgresql-logo.png" width="63" height="64" alt="postgresql Icon">');
    $('#icons').append('<img src="img/GitHub-Mark.png" width="63" height="64" alt="GitHub Icon">');
    $('#icons').append('<img src="img/jquery-icon.png" width="63" height="64" alt="jQuery Icon">');
    $('#icons').append('<img src="img/nodejs-512.png" width="63" height="64" alt="nodeJS Icon">');
    $('#icons').append('<img src="img/handlebars.png" width="63" height="64" alt="handlebars Icon">');
    $('#icons').append('<img src="img/javascript.png" width="63" height="64" alt="JS Icon">');
    $('#icons').append('<img src="img/css3.png" width="63" height="64" alt="CCS3 Icon">');
    $('#icons').append('<img src="img/HTML5_Logo_256.png" width="63" height="64" alt="HTML5 Powered" title="HTML5 Powered">');
    $('#experience p').after('</div>');
  }


//TODO: I nedd to finish this function to append the number of commtis to the dom for each project, not
// just on the first project. Also, I can probably get rid of the whole commitsUrl stuff and just use
// an ajax call with `${data.commits_url.slice(0,-6)}` where my handlebars currently is.
  function compileProjectHandlebars() {
    const repos = {};
    const commitsUrl = {};
    const commits = {};
    repos.all = [];
    commitsUrl.all = [];
    commits.all = [];

    $.get('/github/user/repos')
    .then(data => data.forEach(function(data) {
        repos.all.push(data);
      }),
      err => console.error(err)).then(function(){
        repos.all.forEach(function(data){
          $.get(data.commits_url.slice(0,-6)).then(data => commits.all.push(data))
        })
      })
      // .then(data => repos.all.forEach(function(data) {
      //
      //   var repoTemplate = $('#repo-template').html();
      //   var compileData  = Handlebars.compile(repoTemplate);
      //   $('#projects').append(compileData(data));
      //
      // })).then(data => commitsUrl.all.forEach(function(data){
      //   console.log(data)
      //   $.get(`/github/${data.slice(0,-6)}`)
      //   .then(function(data){
      //
      //     commits.all.push(data)
      //     $('#num-commits').append(data.length)
      //
      //     })
      //   }));

        console.log(repos.all)
        console.log(commits.all)
  }


  compileHandlebars();
  compileProjectHandlebars();
  imageSlider();
});
