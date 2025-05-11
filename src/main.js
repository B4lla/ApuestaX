import { PaginaLogin } from './pages/login.js';
import { PaginaInicio } from './pages/home.js';

const app = Vue.createApp({
    template: `
        <pagina-login 
          v-if="!estaLogueado" 
          @inicio-exitoso="manejarInicioSesion" 
        />
        <pagina-inicio 
          v-else 
          @cerrar-sesion="manejarCierreSesion" 
        />
    `,
    data() {
        return {
            // estado de login guardado en localStorage para persistencia
            estaLogueado: localStorage.getItem('estaLogueado') === 'true'
        };
    },
   methods: {
        // cambia al estado logueado y guarda en localStorage
        manejarInicioSesion() {
            this.estaLogueado = true;
            localStorage.setItem('estaLogueado', 'true');
        },
        // cambia al estado deslogueado y elimina de localStorage
        manejarCierreSesion() {
            this.estaLogueado = false;
            localStorage.removeItem('estaLogueado');
        }
    },
    // componentes disponibles en esta app
    components: {
        PaginaLogin,
        PaginaInicio
    }
});

app.mount('#appMain');