// importa el componente de notificaciones para mostrar errores de login
import { Notificacion } from '../components/notificacion.js';

export const PaginaLogin = {
  // registro el componente Notificacion
  components: {
    Notificacion
  },
  template: `
<div class="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-4" style="overflow: hidden;">
  <!-- Encabezado -->
  <div class="fixed top-0 left-0 w-full p-4 backdrop-blur-lg z-10">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded flex items-center justify-center">
          <img src="../public/assets/logo.png" alt="Logo" class="w-5 h-5" />
        </div>
        <span class="font-bold text-xl">APUESTA X</span>
      </div>
    </div>
  </div>
  <!-- Formulario -->
  <div class="w-full max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
    <h1 class="text-2xl font-bold mb-6 text-center">Accede a tu cuenta</h1>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-white/80">Correo electrónico</label>
        <input 
          v-model="correo" 
          type="email" 
          placeholder="ejemplo@correo.com"
          class="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1 text-white/80">Contraseña</label>
        <input 
          v-model="contrasena" 
          type="password" 
          placeholder="••••••••"
          class="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="recordar" 
            v-model="recordar" 
            class="mr-2 accent-amber-500" 
          />
          <label for="recordar" class="text-sm text-white/70">Recuérdame</label>
        </div>
        <a href="#" class="text-sm text-amber-500 hover:text-amber-400">¿Olvidaste tu contraseña?</a>
      </div>
      <button 
        @click="iniciarSesion"
        class="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
      >
        Iniciar Sesión
      </button>
      <div class="text-center mt-4 text-white/60 text-sm">
        ¿No tienes una cuenta? 
        <a href="#" class="text-amber-500 hover:text-amber-400">Regístrate ahora</a>
      </div>
    </div>
  </div>
  
  <!-- componente notificacion que aparecera cuando haya error -->
  <notificacion 
    v-if="mostrarNotificacion"
    :icon="notificacionIcon"
    :title="notificacionTitle"
    :message="notificacionMessage"
    :duration="notificacionDuration"
  />
</div>
  `,
  data() {
    return {
      correo: '',
      contrasena: '',
      recordar: false,
      // propiedades para controlar la notificacion
      mostrarNotificacion: false,
      notificacionIcon: '',
      notificacionTitle: '',
      notificacionMessage: '',
      notificacionDuration: 5000
    };
  },
  emits: ['inicio-exitoso'],
  methods: {
    iniciarSesion() {
      if (this.correo === 'admin@admin.com' && this.contrasena === 'admin') {
        this.$emit('inicio-exitoso');
      } else {
        // propiedades para mostrar la notificacion
        this.notificacionIcon = 'fas fa-exclamation-circle';
        this.notificacionTitle = 'Error de autenticación';
        this.notificacionMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        this.notificacionDuration = 5000;
        this.mostrarNotificacion = true;
      }
    }
  }
};