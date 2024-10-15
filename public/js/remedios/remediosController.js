$(() => {
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('open')
  })

  $('#btnRegistroPost').click(() => {
    const remedios = new Remedios()

    // TODO: Validar que el usuario esta autenticado


    const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para crear un remedio debes estar autenticado`, 5000)
      return
    }

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const ingredientes = $('#ingredientesNewRemedios').val()
    const preparacion = $('#preparacionNewRemedios').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    remedios
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        ingredientes,
        preparacion,
        imagenLink
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 5000)
        $('.modal').modal('close')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 5000)
      })
  })

  $('#btnUploadFile').on('change', e => {
    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0]

    // TODO: Referencia al storage
    
  })
})
