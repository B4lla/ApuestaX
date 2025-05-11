// exportamos el componente navbar para poder usarlo en otras partes de la app
export const Navbar = {
  name: 'Navbar',
  // propiedades que configuran el comportamiento del navbar
  props: {
    // controla si se muestran los enlaces de navegacion
    showNavLinks: {
      type: Boolean,
      default: true
    },
    // controla si se muestra la barra de busqueda
    showSearch: {
      type: Boolean,
      default: true
    },
    // indica en que pagina estamos (home o juego)
    paginaActual: {
      type: String,
      default: 'home'
    },
    // nombre del juego cuando estamos en una pagina de juego
    nombreJuego: {
      type: String,
      default: ''
    }
  },
  // funcion que calcula la ruta correcta del logo dependiendo de donde estemos
  computed: {
    logoPath() {
      // si estamos en un juego usa una ruta con mas ../
      return this.paginaActual === 'juego' 
        ? "../../../public/assets/logo.png" 
        : "../public/assets/logo.png";
    }
  },
  // eventos que este componente puede emitir al componente padre
  emits: ['cerrar-sesion', 'scroll-to', 'volver-inicio'],
  methods: {
    // emite el evento cerrar-sesion cuando se hace clic en el boton
    cerrarSesion() {
      this.$emit('cerrar-sesion');
    },
    // emite el evento scroll-to con el id de la seccion
    scrollTo(seccionId) {
      this.$emit('scroll-to', seccionId);
    },
    // emite el evento volver-inicio cuando se hace clic en el logo o boton
    volverAlInicio() {
      this.$emit('volver-inicio');
    }
  },
  template: `
    <nav class="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg z-50 border-b border-white/5">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <!-- logo con evento click para volver al inicio -->
        <div class="flex items-center gap-2 cursor-pointer" @click="volverAlInicio">
          <div class="w-8 h-8 rounded flex items-center justify-center">
            <!-- usa la propiedad computada para la ruta del logo -->
            <img :src="logoPath" alt="Logo" class="w-5 h-5" />
          </div>
          <span class="font-bold text-xl">APUESTA X</span>
          <!-- muestra el nombre del juego solo si estamos en una pagina de juego -->
          <span v-if="paginaActual === 'juego' && nombreJuego" class="text-amber-400 ml-2">
            | {{ nombreJuego }}
          </span>
        </div>
        
        <!-- enlaces de navegacion - solo visibles en la pagina principal -->
        <div v-if="showNavLinks" class="hidden md:flex items-center space-x-8">
          <!-- cada enlace emite el evento scrollTo con el id de la seccion -->
          <a @click="scrollTo('juegos')" class="text-white hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <i class="fas fa-gamepad mr-1"></i> Juegos
          </a>
          <a @click="scrollTo('mercado')" class="text-white hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <i class="fas fa-store mr-1"></i> Mercado
          </a>
          <a @click="scrollTo('comunidad')" class="text-white hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <i class="fas fa-users mr-1"></i> Comunidad
          </a>
          <a @click="scrollTo('clasificacion')" class="text-white hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <i class="fas fa-trophy mr-1"></i> Clasificación
          </a>
        </div>
        
        <!-- boton para volver al inicio - solo visible en paginas de juegos -->
        <div v-if="paginaActual === 'juego'" class="flex-1 flex justify-center">
          <a @click="volverAlInicio" class="text-white hover:text-amber-400 cursor-pointer transition-colors duration-300 mx-auto">
            <i class="fas fa-home mr-1"></i> Volver al Inicio
          </a>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- barra de busqueda - solo visible si showSearch es true -->
          <div v-if="showSearch" class="relative">
            <input 
              type="text" 
              placeholder="Buscar juegos..." 
              class="bg-white/5 border border-white/10 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-40 md:w-60"
            />
            <i class="fas fa-search absolute right-3 top-2.5 text-white/50"></i>
          </div>
          <!-- boton cerrar sesion que llama al metodo cerrarSesion -->
          <button @click="cerrarSesion" class="text-white/80 hover:text-white transition-colors duration-300">
            <i class="fas fa-sign-out-alt mr-1"></i> Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  `
};