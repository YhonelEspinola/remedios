$(() => {
    $('.tooltipped').tooltip({ delay: 50 });
    $('.modal').modal();

    firebase.initializeApp(firebaseConfig);




    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $('#btnInicioSesion').text('Salir');
            $('#avatar').attr('src', user.photoURL ? user.photoURL : 'imagenes/user_auth.png');
        } else {
            $('#btnInicioSesion').text('Iniciar Sesion');
            $('#avatar').attr('src', 'imagenes/user.png');
        }
    });

    $('#btnInicioSesion').click(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            firebase.auth().signOut()
                .then(() => {
                    $('#avatar').attr('src', 'imagenes/user.png');
                    Materialize.toast('SignOut correcto', 5000);
                })
                .catch(error => {
                    Materialize.toast(`Error al realizar SignOut => ${error}`, 5000);
                });
        } else {
            $('#emailSesion').val('');
            $('#passwordSesion').val('');
            $('#modalSesion').modal('open');
        }
    });

    $('#avatar').click(() => {
        firebase.auth().signOut()
            .then(() => {
                $('#avatar').attr('src', 'imagenes/user.png');
                Materialize.toast('SignOut correcto', 4000);
            })
            .catch(error => {
                Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
            });
    });

    $('#btnTodoPost').click(() => {
        $('#tituloPost').text('Remedios de la Comunidad');
        const remedio = new RemediosTwo();
        remedio.consultarTodosPost();
    });

    $('#btnMisPost').click(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            const remedio = new RemediosTwo();
            remedio.consultarPostxUsuario(user.email);
            $('#tituloPost').text('Mis Remedios');
        } else {
            Materialize.toast('Debes estar autenticado para ver tus remedios', 4000);
        }
    });

    $(document).on('click', '.buttonmas', function () {
        const id = $(this).data('id');
        $('#tituloPost').text('Detalles del remedio');
        const remedio = new RemediosTwo();
        remedio.consultarVerMasRemedio(id);
    });

    $(document).on('click', '.button-edit', function () {
        const id = $(this).data('id');
        const remedio = new RemediosTwo();
        remedio.consultarRemedioParaEditar(id);
    });

    $(document).on('click', '.button-delete', function () {
        const id = $(this).data('id');
        const remedio = new RemediosTwo();
        remedio.eliminarRemedio(id);
    });

    document.getElementById('imagenEditRemedio').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagenPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    $('#btnSaveEditPost').click(() => {
        const id = $('#btnSaveEditPost').data('id');
        const titulo = $('#tituloEditPost').val();
        const descripcion = $('#descripcionEditPost').val();
        const ingredientes = $('#ingredientesEditRemedios').val();
        const preparacion = $('#preparacionEditRemedios').val();
        const imagenFile = document.getElementById('imagenEditRemedio').files[0];

        const remedio = new RemediosTwo();
        remedio.editarRemedio(id, titulo, descripcion, ingredientes, preparacion, imagenFile);
    });


});