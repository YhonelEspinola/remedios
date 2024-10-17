class Remedios {
    constructor() {
        // TODO inicializar firestore y settings


        this.db = firebase.firestore()

    }

    crearPost(uid, emailUser, titulo, descripcion, ingredientes, preparacion, imagenLink) {


        return this.db.collection('remedios').add({


            uid: uid,
            autor: emailUser,
            titulo: titulo,
            descripcion: descripcion,
            imagenLink: imagenLink,
            ingredientes: ingredientes,
            preparacion: preparacion,
            fecha: firebase.firestore.FieldValue.serverTimestamp(),

        })
            .then(refDoc => {
                console.log(`Id del remedio => ${refDoc.id}`)
            })
            .catch(error => {
                console.error(`Error creando el remedio => ${error}`)
            })
    }

    consultarTodosPost() {
        this.db.collection('remedios').onSnapshot(querySnapshot => {
            $('#posts').empty()
            if (querySnapshot.empty) {
                $('#posts').append(this.obtenerTemplatePostVacio())
            } else {
                querySnapshot.forEach(post => {
                    let postHtml = this.obtenerPostTemplate(
                        post.id,
                        post.data().autor,
                        post.data().titulo,
                        post.data().descripcion,
                        post.data().imagenLink,
                        Utilidad.obtenerFecha(post.data().fecha.toDate())
                    )
                    $('#posts').append(postHtml)

                })
            }
        })
    }




    consultarPostxUsuario(emailUser) {

    }

    obtenerTemplatePostVacio() {
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

    obtenerPostTemplate(
        id,
        autor,
        titulo,
        descripcion,
        imagenLink,
        fecha
    ) {
        const Descripcion = descripcion.length > 200 ? descripcion.slice(0, 200) + '...' : descripcion;

        const postHtml = `
            <article class="post">
                <div class="post-titulo"><h5>${titulo}</h5></div>
                ${imagenLink ? `<div class="post-video"><img id="imgVideo" src='${imagenLink}' class="post-imagen-video" alt="Imagen Video"></div>` : ''}
                <div class="post-descripcion"><p>${Descripcion}</p></div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">Fecha: ${fecha}</div>
                        <div class="col m6">Autor: ${autor}</div>
                    </div>
                </div>
                <div class="button">
                    <a class="waves-effect waves-light btn m-3 buttonmas" data-id="${id}">Ver más</a>
                </div>
            </article>`;

        return postHtml;
    }

    consultarVerMasRemedio(id) {
        if (!id) {
            console.error('ID inválido');
            return;
        }

        this.db.collection('remedios').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    let remedioData = doc.data();
                    let fecha = remedioData.fecha ? Utilidad.obtenerFecha(remedioData.fecha.toDate()) : 'Fecha no disponible';

                    let postHtml = this.obtenerVerMasRemedioTemplate(
                        doc.id,
                        remedioData.autor,
                        remedioData.titulo,
                        remedioData.descripcion,
                        remedioData.ingredientes,
                        remedioData.preparacion,
                        remedioData.imagenLink,
                        fecha
                    );

                    $('#posts').empty();
                    $('#posts').append(postHtml);
                } else {
                    this.mostrarRemedioNoDisponible();
                }
            })
            .catch(error => {
                this.manejarErrorConsulta(error);
            });
    }

    mostrarRemedioNoDisponible() {
        $('#posts').empty();
        $('#posts').append(this.obtenerTemplatePostVacio());
        Materialize.toast('El remedio no existe o fue eliminado.', 5000);
    }

    manejarErrorConsulta(error) {
        console.error(`Error obteniendo el remedio => ${error}`);
        Materialize.toast(`Error al cargar el remedio: ${error.message}`, 5000);
    }

    obtenerVerMasRemedioTemplate = (id, autor, titulo, descripcion, ingredientes, preparacion, imagenLink, fecha) => {

        const postHtml = `
            <div class="container my-5 p-4 shadow-sm rounded border">
                
                
                <h2 class="text-center text-danger font-weight-bold"><b>${titulo}</b></h2>
                
               
                ${imagenLink ? `
                    <div class="text-center my-4">
                        <img src='${imagenLink}' class="img-fluid rounded shadow" alt="Imagen del Remedio">
                    </div>` : ''}
        
                
                <div class="remedio-contenido">
                    <h4 class="text-danger mt-4"><b>Descripción</b></h4>
                    <p class="text-justify ">${descripcion}</p>
                    
                   
                    <h4 class="text-danger mt-4"><b>Ingredientes</b></h4>
                <ul class="list-unstyled ml-3" style="line-height: 1.6; padding-left: 20px;">
                    ${ingredientes.split(',').map(ingrediente => `<li class="mb-1" style="list-style-type: disc;">${ingrediente.trim()}</li>`).join('')}
                </ul>
                    
                    
                    <h4 class="text-danger mt-4"><b>Preparación</b></h4>
                    <p class="text-justify ">${preparacion}</p>
                </div>
        
                <!-- Autor y fecha -->
                <div class="bg-danger text-white p-3 mt-4 rounded">
                    <p class="text-center m-0">Por <strong>${autor}</strong> | Publicado el ${fecha}</p>
                </div>
            </div>`;

        return postHtml;
    };


}
