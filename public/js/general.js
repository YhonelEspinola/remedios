$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  //const app = initializeApp(firebaseConfig);

  //const analytics = getAnalytics(app);

  firebase.initializeApp(firebaseConfig);

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time


  const remedio = new Remedios()
  remedio.consultarTodosPost()

  // TODO: Firebase observador del cambio de estado

  firebase.auth().onAuthStateChanged(user => {


    if (user) {
      $('#btnInicioSesion').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    }
    else {
      $('#btnInicioSesion').text('Iniciar Sesion')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })


  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)


    const user = firebase.auth().currentUser
    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesion')

      firebase.auth().signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`SignOut correcto`, 5000)
        }).catch(error => {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 5000)
        })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {

    firebase.auth().signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`SignOut correcto`, 4000)
      }).catch(error => {
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
      })


    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const remedios = new Remedios()
    remedios.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })

  $(document).on('click', '.buttonmas', function () {
    const id = $(this).data('id');
    $('#tituloPost').text('Detalles del remedio');
    const remedios = new Remedios();
    remedios.consultarVerMasRemedio(id);
  });

})
