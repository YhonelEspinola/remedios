class Remedios {
  constructor () {
      // TODO inicializar firestore y settings


      this.db = firebase.firestore()

  }

  crearPost (uid, emailUser, titulo, descripcion, ingredientes , preparacion ,imagenLink) {
    

    return this.db.collection('remedios').add({


        uid : uid,
        autor : emailUser,
        titulo : titulo,
        descripcion : descripcion,
        imagenLink : imagenLink,
        ingredientes : ingredientes,
        preparacion : preparacion,
        fecha : firebase.firestore.FieldValue.serverTimestamp(),

    })
    .then(refDoc => {
        console.log(`Id del remedio => ${refDoc.id}`)
    })
    .catch(error => {
        console.error(`Error creando el remedio => ${error}`)
    })
  }

  consultarTodosPost () {
    this.db.collection('remedios').onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
            $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
           querySnapshot.forEach( post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().autor,
            post.data().titulo,
            post.data().descripcion,
            post.data().imagenLink,
            Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
            
           })
    }})
  }

  consultarPostxUsuario (emailUser) {
    
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer remedio a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-imagen">
            <img id="imgRemedio"width="500" height="385" src='https://www.salud.mapfre.es/media/2020/06/exfoliante-coorporar-de-jengibre.jpg' class="post-imagen-video"
         
      </div>
      <div class="post-imagenlink">
          imagen
      </div>
      <div class="post-descripcion">
          <p>Crea el primer remedio la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
            <div class="button">
                <a class="waves-effect waves-light btn">Ver mas</a>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
                 <div class="button">
                <a class="waves-effect waves-light btn">Ver mas</a>
            </div>
            </article>`
  }
}
