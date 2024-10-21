$(() => {
    $('#btnModalPost').click(() => {
        $('#tituloNewPost').val('');
        $('#descripcionNewPost').val('');
        $('#linkVideoNewPost').val('');
        $('#btnUploadFile').val('');
        $('.determinate').attr('style', `width: 0%`);
        sessionStorage.setItem('imgNewPost', null);

        const user = firebase.auth().currentUser;
        if (!user) {
            Materialize.toast('Para crear el post debes estar autenticado', 4000);
            return;
        }

        $('#modalPost').modal('open');
    });

    $('#btnRegistroPost').click(() => {
        const remedios = new RemediosTwo();
        const user = firebase.auth().currentUser;

        if (!user) {
            Materialize.toast('Para crear un remedio debes estar autenticado', 5000);
            return;
        }

        const titulo = $('#tituloNewPost').val();
        const descripcion = $('#descripcionNewPost').val();
        const ingredientes = $('#ingredientesNewRemedios').val();
        const preparacion = $('#preparacionNewRemedios').val();
        const imagenLink = sessionStorage.getItem('imgNewPost') === 'null' ? null : sessionStorage.getItem('imgNewPost');

        remedios.crearPost(user.uid, user.email, titulo, descripcion, ingredientes, preparacion, imagenLink)
            .then(() => {
                Materialize.toast('Post creado correctamente', 5000);
                $('.modal').modal('close');
            })
            .catch(err => {
                Materialize.toast(`Error => ${err}`, 5000);
            });
    });

    $('#btnUploadFile').on('change', e => {
        const file = e.target.files[0];
        const user = firebase.auth().currentUser;

        if (!user) {
            Materialize.toast('Para crear el post debes estar autenticado', 4000);
            return;
        }

        const remedios = new RemediosTwo();
        remedios.subirImagenRemedio(file, user.uid);
    });
});