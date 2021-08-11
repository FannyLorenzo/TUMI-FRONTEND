export default {

    namespaced: true,

    state: {
        token: null,
        count: 123,
        current_id: 0,
        current_user: {
            "DNI_RUC": "780079461",
            "apellido": "LOrenzo Q",
            "calificacion": "4500",
            "correo": "fanny.llq@gmail.com",
            "descripcion_larga": "Dueña de la finca Amanecer que está pronta a extender fronteras, siembra y cosecha de Zanahorias y Alzachofas ",
            "nombre": "Fanny Lorena",
            "npersonas": "1000",
            "password": "123456",
            "telefono": "946718360",
            "ubicacion_map_lat": -16.35676552126726,
            "ubicacion_map_long": -72.18892069235251,
            "usuario_id": "100",
            "website": "www.siempresanos.com",
            "foto": "https://img.freepik.com/foto-gratis/retrato-alto-trabajador-agronomo-agricultor-campo-soja-sosteniendo-thumbs-up-comprobar-cultivos-antes-cosecha_342744-1262.jpg?size=626&ext=jpg",
            "landpage": "https://i.blogs.es/a9806e/1366_2000-5-/1366_2000.jpg",
        },
    },
    mutations: {
        LOGIN_SUCCESS(state, response) {
            state.token = response.token
        },
        SET_CURRENT_ID(state, payload) {
            state.current_id = payload.usuario_id;

        },
        SET_CURRENT_USER(state, payload) {
            if (payload) {
                state.current_user.DNI_RUC = payload.DNI_RUC;
                state.current_user.apellido = payload.apellido;
                state.current_user.calificacion = payload.calificacion;
                state.current_user.correo = payload.correo;
                state.current_user.descripcion_larga = payload.descripcion_larga;
                state.current_user.nombre = payload.nombre;
                state.current_user.npersonas = payload.npersonas;
                state.current_user.password = payload.password;
                state.current_user.telefono = payload.telefono;
                state.current_user.ubicacion_map_lat = payload.ubicacion_map_lat;
                state.current_user.ubicacion_map_long = payload.ubicacion_map_long;
                state.current_user.usuario_id = payload.usuario_id;
                state.current_user.website = payload.website;
                state.current_user.foto = payload.foto;
                state.current_user.landpage = payload.landpage;
            } else
                console.log("No hay usuario logueado");

        }
    },
    actions: {

    }
}