// importa el componente navbar que usaremos en nuestra app
import { Navbar } from '../components/navbar.js';

export const PaginaInicio = {
  name: 'PaginaInicio',
  // evento que se emite cuando el usuario cierra sesion
  emits: ['cerrar-sesion'],
  components: {
    Navbar
  },
  data() {
    return {
      // array con la info de todos los juegos disponibles
      juegos: [
        {
          id: 1,
          nombre: 'Juego de Dados',
          descripcion: 'Apuesta a diferentes combinaciones de dados y gana según lo que salga.',
          rutaJuego: './games/dados/dados.html',
          imagen: '../public/assets/dados.png',
          rating: 4.7,
          jugadoresOnline: 456,
          reglas: 'Lanza los dados y gana según la combinación: Par (x2), Trío (x5), Doble 6 (x10).'
        },
        {
          id: 2,
          nombre: 'Ruleta',
          descripcion: 'Apuesta a un número o color y espera a que la ruleta se detenga.',
          rutaJuego: './games/ruleta/ruleta.html',
          imagen: '../public/assets/ruleta.png',
          rating: 4.9,
          jugadoresOnline: 782,
          reglas: 'Apuesta a un número (x36), color (x2), docena (x3) o par/impar (x2).'
        },
        {
          id: 3,
          nombre: 'Tragaperras',
          descripcion: 'Gira la máquina y combina los símbolos para llevarte premios.',
          rutaJuego: './games/tragaperras/tragaperras.html',
          imagen: '../public/assets/slots.png',
          rating: 4.6,
          jugadoresOnline: 621,
          reglas: 'Haz girar y combina símbolos iguales. Tres iguales (x5), trío especial (x10).'
        }
      ],
      // guarda el juego que se muestra en el modal de detalles
      juegoSeleccionado: null,
      // datos de torneos que se muestran en la seccion de torneos
      torneos: [
        { nombre: 'Torneo de Póker', fecha: '15 Jun', premio: '10.000€', participantes: 128 },
        { nombre: 'Torneo de Blackjack', fecha: '22 Jun', premio: '5.000€', participantes: 64 },
        { nombre: 'Torneo de Ruleta', fecha: '30 Jun', premio: '7.500€', participantes: 32 }
      ],
      // datos de los mejores jugadores para la tabla de clasificacion
      jugadoresDestacados: [
        { username: 'PokerMaster', puntos: 12500, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { username: 'RuletaKing', puntos: 10200, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { username: 'DadosPro', puntos: 9800, avatar: 'https://randomuser.me/api/portraits/men/67.jpg' }
      ]
    };
  },
  methods: {
    // abre el modal con detalles del juego seleccionado
    abrirDetalles(juego) {
      this.juegoSeleccionado = juego;
    },
    // cierra el modal de detalles
    cerrarDetalles() {
      this.juegoSeleccionado = null;
    },
    // emite el evento para cerrar la sesion
    cerrarSesion() {
      this.$emit('cerrar-sesion');
    },
    // hace scroll suave a la seccion indicada
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  },
  template: `
    <div class="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <!-- componente navbar con sus propiedades y eventos -->
      <navbar
        :show-nav-links="true"
        :show-search="true"
        pagina-actual="home"
        @cerrar-sesion="cerrarSesion"
        @scroll-to="scrollToSection"
      />

      <div class="pt-24 pb-12 px-4 md:px-8">
        <div class="container mx-auto">
          <div class="relative rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/5 shadow-lg shadow-amber-500/5">
            <div class="absolute inset-0 overflow-hidden">
              <img src="../public/assets/ruleta.png" alt="Ruleta" class="w-full h-full object-cover opacity-30">
            </div>
            <div class="p-8 md:p-12 z-10 relative">
              <div class="inline-block bg-amber-500/20 px-3 py-1 rounded-full text-amber-400 text-sm font-medium mb-4">
                <i class="fas fa-star mr-1"></i> Juego Destacado
              </div>
              <h1 class="text-4xl md:text-5xl font-bold mb-4">Ruleta</h1>
              <p class="text-white/70 max-w-2xl mb-6">
                Apuesta a un número o color y espera a que la ruleta se detenga. ¡Multiplica tus ganancias hasta x36!
              </p>
              <div class="flex items-center gap-4 mb-6">
                <div class="flex items-center">
                  <i class="fas fa-star text-amber-400 mr-1"></i><span>4.9</span>
                </div>
                <div class="text-white/60 text-sm">
                  <i class="fas fa-users mr-1"></i> 782 jugadores
                </div>
              </div>
              <div class="flex flex-wrap gap-4">
                <a href="./games/ruleta/ruleta.html" class="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-lg transition-colors">
                  <i class="fas fa-play mr-2"></i> Jugar Ahora
                </a>
                <!-- busca el juego con id=2 (ruleta) para mostrar sus detalles -->
                <button 
                  @click="abrirDetalles(juegos.find(j => j.id === 2))" 
                  class="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/10 transition-colors"
                >
                  <i class="fas fa-info-circle mr-2"></i> Saber Más
                </button>
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          </div>
        </div>
      </div>

      <!-- Torneos Próximos -->
      <div class="py-6 px-4 md:px-8 overflow-hidden">
        <div class="container mx-auto">
          <div class="bg-gray-800/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-lg shadow-black/20">
            <h2 class="text-xl font-bold mb-4 flex items-center">
              <i class="fas fa-trophy text-amber-400 mr-2"></i> Torneos Próximos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- recorre el array de torneos y crea un div para cada uno -->
              <div v-for="(torneo, index) in torneos" :key="index" 
                  class="bg-black/30 rounded-lg p-4 border border-white/10 hover:border-amber-500/30 transition-colors">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold">{{ torneo.nombre }}</h3>
                    <p class="text-white/60 text-sm mt-1">
                      <i class="fas fa-users mr-1"></i> {{ torneo.participantes }} participantes
                    </p>
                  </div>
                  <div class="bg-amber-500/20 px-2 py-1 rounded text-amber-400 text-sm">
                    <i class="far fa-calendar-alt mr-1"></i> {{ torneo.fecha }}
                  </div>
                </div>
                <div class="mt-3 flex justify-between items-center">
                  <div class="text-amber-400 font-bold">
                    <i class="fas fa-coins mr-1"></i> {{ torneo.premio }}
                  </div>
                  <button class="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded transition-colors hover:bg-amber-500 hover:text-black">
                    <i class="fas fa-sign-in-alt mr-1"></i> Inscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Juegos Disponibles -->
      <div id="juegos" class="py-8 px-4 md:px-8">
        <div class="container mx-auto">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <i class="fas fa-gamepad text-amber-400 mr-2"></i> Juegos Disponibles
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- recorre el array de juegos y muestra cada uno con sus datos -->
            <div 
              v-for="(juego, index) in juegos" 
              :key="juego.id"
              class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors"
            >
              <div class="h-40 bg-gray-700 relative overflow-hidden rounded-t-xl">
                <!-- bind dinamico para la imagen de cada juego -->
                <img :src="juego.imagen" :alt="juego.nombre" class="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-colors" />
                <div class="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs flex items-center">
                  <i class="fas fa-star text-amber-400 mr-1"></i>
                  <span>{{ juego.rating }}</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold mb-1 flex items-center justify-between">
                  {{ juego.nombre }}
                  <span class="text-amber-400 text-xs">
                    <i class="fas fa-users mr-1"></i> {{ juego.jugadoresOnline }}
                  </span>
                </h3>
                <p class="text-white/70 text-sm mb-4 line-clamp-2">{{ juego.descripcion }}</p>
                <div class="flex gap-2">
                  <!-- enlace dinamico a la pagina del juego -->
                  <a 
                    :href="juego.rutaJuego" 
                    class="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg text-center transition-colors"
                  >
                    <i class="fas fa-play mr-1"></i> Jugar Ahora
                  </a>
                  <!-- boton para abrir el modal con detalles del juego -->
                  <button 
                    @click="abrirDetalles(juego)"
                    class="w-10 h-10 bg-white/10 hover:bg-white/20 text-amber-500 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <i class="fas fa-info"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mercado -->
      <div id="mercado" class="py-12 px-4 md:px-8 bg-gradient-to-r from-black to-gray-900">
        <div class="container mx-auto">
          <h2 class="text-2xl font-bold mb-8 flex items-center">
            <i class="fas fa-store text-amber-400 mr-2"></i> Mercado
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Paquete Básico -->
            <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors">
              <div class="bg-gradient-to-r from-gray-800 to-gray-700 p-4 relative">
                <h3 class="text-lg font-bold mb-1">Paquete Básico</h3>
                <div class="text-3xl font-bold text-amber-400">500 <span class="text-base font-normal text-amber-300">fichas</span></div>
                <div class="absolute top-2 right-2 bg-white/10 rounded-full px-3 py-1 text-xs">
                  Popular
                </div>
              </div>
              <div class="p-4">
                <ul class="space-y-2 mb-4 text-sm">
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Acceso a juegos básicos</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Bono diario de 50 fichas</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Participación en torneos semanales</span>
                  </li>
                </ul>
                <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors">
                  <i class="fas fa-shopping-cart mr-1"></i> Comprar 4.99€
                </button>
              </div>
            </div>

            <!-- Paquete Premium -->
            <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-amber-500/30 hover:border-amber-500/50 transition-colors relative">
              <div class="bg-gradient-to-r from-amber-900/50 to-amber-800/30 p-4 relative">
                <h3 class="text-lg font-bold mb-1">Paquete Premium</h3>
                <div class="text-3xl font-bold text-amber-400">2500 <span class="text-base font-normal text-amber-300">fichas</span></div>
                <div class="absolute top-2 right-2 bg-amber-500/20 rounded-full px-3 py-1 text-xs text-amber-300">
                  Mejor valor
                </div>
              </div>
              <div class="p-4">
                <ul class="space-y-2 mb-4 text-sm">
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Acceso a todos los juegos</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Bono diario de 200 fichas</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Participación VIP en todos los torneos</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>50% de cashback en pérdidas</span>
                  </li>
                </ul>
                <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors">
                  <i class="fas fa-shopping-cart mr-1"></i> Comprar 19.99€
                </button>
              </div>
            </div>

            <!-- Paquete Elite -->
            <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors">
              <div class="bg-gradient-to-r from-gray-800 to-gray-700 p-4 relative">
                <h3 class="text-lg font-bold mb-1">Paquete Elite</h3>
                <div class="text-3xl font-bold text-amber-400">10000 <span class="text-base font-normal text-amber-300">fichas</span></div>
              </div>
              <div class="p-4">
                <ul class="space-y-2 mb-4 text-sm">
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Acceso prioritario a todos los juegos</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Bono diario de 500 fichas</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Avatar y nombre personalizados</span>
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>Torneos privados con amigos</span>
                  </li>
                </ul>
                <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors">
                  <i class="fas fa-shopping-cart mr-1"></i> Comprar 49.99€
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comunidad -->
      <div id="comunidad" class="py-12 px-4 md:px-8">
        <div class="container mx-auto">
          <h2 class="text-2xl font-bold mb-8 flex items-center">
            <i class="fas fa-users text-amber-400 mr-2"></i> Comunidad
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Foro / Chat -->
            <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-comments text-amber-400 mr-2"></i>Chat
              </h3>
              <div class="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <div class="flex gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">PokerMaster</span>
                      <span class="text-white/40 text-xs">10:23</span>
                    </div>
                    <p class="text-white/70 text-sm">He ganado</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">RuletaKing</span>
                      <span class="text-white/40 text-xs">10:24</span>
                    </div>
                    <p class="text-white/70 text-sm">Y a mi que</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">DadosPro</span>
                      <span class="text-white/40 text-xs">10:26</span>
                    </div>
                    <p class="text-white/70 text-sm">GG ez loosers</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje..." 
                  class="flex-1 bg-black/50 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <button class="bg-amber-500 hover:bg-amber-600 text-black px-3 rounded-lg transition-colors">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            
            <!-- Clasificación -->
            <div id="clasificacion" class="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-trophy text-amber-400 mr-2"></i> Mejores Jugadores
              </h3>
              <div class="space-y-3">
                <!-- recorre el array de jugadores destacados y muestra cada uno -->
                <div 
                  v-for="(jugador, index) in jugadoresDestacados" 
                  :key="index"
                  class="flex items-center gap-3 bg-black/30 p-3 rounded-lg border border-white/10"
                >
                  <!-- muestra el numero de posicion calculado segun el indice -->
                  <div class="text-amber-400 font-bold text-lg w-6 text-center">{{ index + 1 }}</div>
                  <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img :src="jugador.avatar" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="font-bold">{{ jugador.username }}</div>
                    <div class="text-white/60 text-xs">Jugador VIP</div>
                  </div>
                  <!-- formatea los puntos con separador de miles -->
                  <div class="text-amber-400 font-bold">{{ jugador.puntos.toLocaleString() }}</div>
                </div>
              </div>
              <button class="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg border border-white/10 transition-colors hover:bg-amber-500 hover:text-black hover:border-transparent">
                <i class="fas fa-list-ol mr-1"></i> Ver clasificación completa
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-black/50 backdrop-blur-md border-t border-white/5 py-12 px-4 md:px-8 mt-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center gap-1 mb-4">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="../public/assets/logo.png" alt="Logo" class="w-5 h-5" />
              </div>
              <span class="font-bold text-xl">APUESTAX</span>
            </div>
          </div>
          <div>
            <h3 class="font-bold mb-4">Plataforma</h3>
            <ul class="space-y-2 text-white/60">
              <!-- enlaces que hacen scroll a las secciones correspondientes -->
              <li><a @click="scrollToSection('juegos')" class="hover:text-amber-400 cursor-pointer transition-colors duration-300"><i class="fas fa-gamepad mr-1"></i> Juegos</a></li>
              <li><a @click="scrollToSection('mercado')" class="hover:text-amber-400 cursor-pointer transition-colors duration-300"><i class="fas fa-store mr-1"></i> Mercado</a></li>
              <li><a @click="scrollToSection('comunidad')" class="hover:text-amber-400 cursor-pointer transition-colors duration-300"><i class="fas fa-users mr-1"></i> Comunidad</a></li>
              <li><a @click="scrollToSection('clasificacion')" class="hover:text-amber-400 cursor-pointer transition-colors duration-300"><i class="fas fa-trophy mr-1"></i> Clasificación</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/5 mt-8 pt-8 text-center text-white/40 text-sm">
          2025 APUESTA X
        </div>
      </footer>

      <!-- Modal de Detalles de Juego - solo se muestra cuando hay un juego seleccionado -->
      <div v-if="juegoSeleccionado" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-gray-900/90 border border-white/10 rounded-xl max-w-md w-full p-6 modal-content">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">{{ juegoSeleccionado.nombre }}</h3>
            <button @click="cerrarDetalles" class="text-white/60 hover:text-white transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="bg-black/50 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <i class="fas fa-star text-amber-400 mr-1"></i>
                <!-- el signo ? es para evitar errores si juegoSeleccionado es null -->
                <span>{{ juegoSeleccionado?.rating }}</span>
              </div>
              <div class="text-white/60 text-sm">
                <i class="fas fa-users mr-1"></i> {{ juegoSeleccionado?.jugadoresOnline }} jugadores
              </div>
            </div>
            <p class="text-white/70 mb-4">{{ juegoSeleccionado?.descripcion }}</p>
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <div class="text-amber-400 text-sm font-medium mb-1">
                <i class="fas fa-book mr-1"></i> Reglas del juego:
              </div>
              <p class="text-white/70 text-sm">{{ juegoSeleccionado?.reglas }}</p>
            </div>
          </div>
          
          <div class="flex gap-2">
            <!-- enlace dinamico a la pagina del juego seleccionado -->
            <a 
              :href="juegoSeleccionado?.rutaJuego" 
              class="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg text-center transition-colors"
            >
              <i class="fas fa-play mr-1"></i> Jugar Ahora
            </a>
            <button 
              @click="cerrarDetalles" 
              class="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg border border-white/10 transition-colors"
            >
              <i class="fas fa-times mr-1"></i> Cerrar
            </button>
          </div>
        </div>
      </div>

      <style>
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.5);
          border-radius: 10px;
        }
      </style>
    </div>
  `
};
