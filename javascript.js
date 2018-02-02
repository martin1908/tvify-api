//$(function(){
//    var a = $('<a>', {
//        href: 'http://starter.pe',
//        target: '_blank',
//        html: 'Aprieta el boton'
//    })
//    $('#app-body').append(a);
//})
//enter y click en buscar
$(function() {
    var $tvShowsContainer = $('#app-body').find('.tv-shows');
    $tvShowsContainer.on('click', 'button.like', function (ev){ //efecto para el boton like
        var $this = $(this);
        //$this.animate({
         //   'fontSize': '30px' //agrandar corazon
        //}, 'fast');
        $this.closest('.tv-show').toggleClass('liked') //toggle class para quitar el click
    })
    // icono me pone triste
    $tvShowsContainer.on('click', 'button.sad', function (ev){ //efecto para el boton like
        var $this = $(this);
        //$this.animate({
         //   'fontSize': '30px' //agrandar corazon
        //}, 'fast');
        $this.closest('.tv-show').toggleClass('likes') //toggle class para quitar el click
    })
    // icono me gusta
    $tvShowsContainer.on('click', 'button.gusta', function (ev){ //efecto para el boton like
        var $this = $(this);
        //$this.animate({
         //   'fontSize': '30px' //agrandar corazon
        //}, 'fast');
        $this.closest('.tv-show').toggleClass('megusta') //toggle class para quitar el click
    })

    function renderShows(shows){
            $tvShowsContainer.find('.loader').remove(); //eliminar el spiner luego de haber cargado la pagina
            //var i=0 ;
            shows.forEach(function(show){
                //for(var j=0; j<5 ; j++) {
                    //var show = shows[j]
                    //console.log(show); 
                //poner 5 elementos 
               
                var article = template
                .replace(':name:', show.name)
                .replace(':img:', show.image.medium)
                .replace(':summary:', show.summary)
                .replace(':img alt:', show.name + "Logo")
                // dar mejor animacion al article
                 var $article = $(article)
                 $article.hide(); //hide = display: none
                $tvShowsContainer.append($article.fadeIn(3500)); //fadein efecto que aparesca lentamente 

            })
            //)
        }
    $('#app-body')
    .find('form')
    .submit(function(ev){
        ev.preventDefault();
        var busqueda = $(this)
        .find('input[type="text"]')
        .val();
        $tvShowsContainer.find('.tv-show').remove()
        var $loader =  $('<div class="loader">');
        $loader.appendTo($tvShowsContainer);
        $.ajax({
            url: 'http://api.tvmaze.com/search/shows', 
            data:{ q: busqueda},
            success: function(res, textStatus, xhr){
                $loader.remove();
                var shows = res.map(function (el){
                    return el.show;
                })
                renderShows(shows);            

            }
        })
    })
    var template = 
                    '<article class="tv-show">' +
                        '<div class="left image-container">'+
                            '<img src=":img:" alt="img alt" />' +
                        '</div>' +
                    '<div class="rigth info">'+
                        '<h1 translate="no" lang="es">:name:</h1>'+
                        '<p translate="no" lang="es">:summary:</p>'+
                        '<div class="botones">'+
                        '<button class="gusta" alt="Me gusta" title="Me gusta">👍</button>'+
                        '<button class="sad" alt="No me gusta" title="No me gusta">😭</button>'+
                        '<button class="like" alt="Me encanta" title="Me encanta">💖</button>'+
                        '</div>'+
                    '</div>' +
                    '</article>';
    if (!localStorage.shows){
        $.ajax( 'http://api.tvmaze.com/shows')
        .then(function  (shows){ //promesas
              //remover el loader a la hora que carga la pagina
            $tvShowsContainer.find('.loader').remove();
            localStorage.shows = JSON.stringify(shows); //localstorage del cliente
            renderShows(shows);
        })
    } else {
        renderShows(JSON.parse(localStorage.shows));
    }         
})


//// traslate

$(document).ready(function(){
  var selector = '#translate';
  $(selector).on('click', function(e){
    e.preventDefault();
    startLang( $(this) );
  });
  var startLang = function(el){
    var el = $(el);
    var text = el.attr('data-text');
    var file = el.attr('data-file');
    file = file.split(',');
    text = text.split(',');
    var index = el.attr('data-index');
    if(index >= file.length){
      index = 0;
    }
    changeName(el, text[index]);
    changeIndex(el, index);
    loadLang(file[index]);
    $('html').attr('lang', file[index]);
  };
 
  var changeName = function(el, name){
    $(el).html( name );
  };
 
  var changeIndex = function(el, index){
    $(el).attr('data-index', ++index);
  };
 
  var loadLang = function(lang){
    var processLang = function(data){
      var arr = data.split('\n');
      for(var i in arr){
        if( lineValid(arr[i]) ){
          var obj = arr[i].split('=>');
          assignText(obj[0], obj[1]);
        }
      }
    };
    var assignText = function(key, value){
      $('[data-lang="'+key+'"]').each(function(){
        var attr = $(this).attr('data-destine');
        if(typeof attr !== 'undefined'){
          $(this).attr(attr, value);
        }else{
          $(this).html(value);
        }
      });
    };
    var lineValid = function(line){
      return (line.trim().length > 0);
    };
    $('.loading-lang').addClass('show');
    $.ajax({
      url: 'lang/'+lang+'.txt',
      error:function(){
        alert('No se cargó traducción');
      },
      success: function(data){
        $('.loading-lang').removeClass('show');
        processLang(data);
      }
    });
  };  
});


//modal
$(document).ready(function(){
  $("#myModal").on("hidden.bs.modal",function(){
    $("#iframeYoutube").attr("src","#");
  })
})

function changeVideo(vId){
  var iframe=document.getElementById("iframeYoutube");
  iframe.src="https://www.youtube.com/embed/"+vId;

  $("#myModal").modal("show");
}