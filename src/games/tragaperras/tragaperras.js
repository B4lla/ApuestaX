// importamos el componente navbar para la barra de navegacion superior
import { Navbar } from '../../components/navbar.js';

// obtenemos la funcion createApp de Vue
const { createApp } = Vue;

// creamos la aplicacion Vue
const app = createApp({
  // registramos el componente Navbar
  components: {
    Navbar
  },
  // datos iniciales del juego
  data() {
    return {
      saldo: 100,
      apuesta: 1,
      girando: false,
      mensajeResultado: "Selecciona tu apuesta y gira la tragaperras",
      esGanador: false,
      // array de rodillos con su simbolo y estado
      rodillos: [
        { simbolo: "🍒", girando: false },
        { simbolo: "🍋", girando: false },
        { simbolo: "🍉", girando: false }
      ],
      // simbolos que pueden aparecer en los rodillos
      simbolos: ["🍒", "🍋", "🍉", "🍇", "🍊", "7️⃣"],
      // guarda los indices de los rodillos ganadores para resaltarlos
      lineasGanadoras: []
    };
  },
  methods: {
    // metodo principal que inicia el giro de la tragaperras
    girarTragaperras() {
      if (this.girando || this.saldo < this.apuesta) return;
      
      this.girando = true;
      this.esGanador = false;
      this.lineasGanadoras = [];
      this.mensajeResultado = "Girando...";
      
      // Reducir el saldo por la apuesta
      this.saldo -= this.apuesta;
      
      // Marcar todos los rodillos como girando
      this.rodillos.forEach(rodillo => {
        rodillo.girando = true;
      });
      
      // Detener los rodillos secuencialmente con diferentes tiempos
      this.detenerRodilloConRetraso(0, 800);
      this.detenerRodilloConRetraso(1, 1400);
      this.detenerRodilloConRetraso(2, 2000);
      
      // Calcular resultado después de que todos los rodillos se detengan
      setTimeout(() => {
        this.calcularGanancia();
        this.girando = false;
      }, 2200);
    },
    
    // detiene un rodillo especifico despues de un tiempo
    detenerRodilloConRetraso(indice, retraso) {
      setTimeout(() => {
        // Generar un símbolo aleatorio
        const simboloAleatorio = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        this.rodillos[indice].simbolo = simboloAleatorio;
        this.rodillos[indice].girando = false;
      }, retraso);
    },
    
    // calcula si hay combinaciones ganadoras y la ganancia correspondiente
    calcularGanancia() {
      const simbolos = this.rodillos.map(r => r.simbolo);
      
      let ganancia = 0;
      let mensaje = "";
      
      // Comprobar si hay tres iguales (premio mayor)
      if (simbolos[0] === simbolos[1] && simbolos[1] === simbolos[2]) {
        this.lineasGanadoras = [0, 1, 2];
        
        // Comprobar si es un premio especial (7️⃣)
        if (simbolos[0] === "7️⃣") {
          ganancia = this.apuesta * 20;
          mensaje = `¡JACKPOT! Tres 7️⃣. Ganaste ${ganancia}€`;
        } else {
          ganancia = this.apuesta * 5;
          mensaje = `¡Tres ${simbolos[0]}! Ganaste ${ganancia}€`;
        }
      }
      // Comprobar si hay dos iguales (premio menor)
      else if (simbolos[0] === simbolos[1] || simbolos[1] === simbolos[2] || simbolos[0] === simbolos[2]) {
        ganancia = this.apuesta * 2;
        
        if (simbolos[0] === simbolos[1]) {
          this.lineasGanadoras = [0, 1];
          mensaje = `¡Dos ${simbolos[0]}! Ganaste ${ganancia}€`;
        } else if (simbolos[1] === simbolos[2]) {
          this.lineasGanadoras = [1, 2];
          mensaje = `¡Dos ${simbolos[1]}! Ganaste ${ganancia}€`;
        } else {
          this.lineasGanadoras = [0, 2];
          mensaje = `¡Dos ${simbolos[0]}! Ganaste ${ganancia}€`;
        }
      }
      // Sin coincidencias (perdiste)
      else {
        mensaje = "Sin coincidencias. Inténtalo de nuevo.";
      }
      
      // Actualizar saldo y mensaje
      if (ganancia > 0) {
        this.saldo += ganancia;
        this.esGanador = true;
      }
      
      this.mostrarMensaje(mensaje, this.esGanador);
    },
    
    // aumenta o disminuye la cantidad apostada
    cambiarApuesta(cambio) {
      const nuevaApuesta = this.apuesta + cambio;
      if (nuevaApuesta >= 1 && nuevaApuesta <= this.saldo) {
        this.apuesta = nuevaApuesta;
      }
    },
    
    // actualiza el mensaje de resultado y si es ganador
    mostrarMensaje(mensaje, esGanador) {
      this.mensajeResultado = mensaje;
      this.esGanador = esGanador;
    },
    
    // navega a la pagina principal
    volverAlInicio() {
      window.location.href = "../../index.html";
    },
    
    // cierra la sesion y vuelve a la pagina principal
    cerrarSesion() {
      localStorage.removeItem('estaLogueado');
      window.location.href = "../../index.html";
    }
  },
  template: `
    <div class="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <!-- Navbar componente -->
      <navbar 
        :show-nav-links="false"
        :show-search="false"
        pagina-actual="juego"
        nombre-juego="Tragaperras"
        @cerrar-sesion="cerrarSesion"
        @volver-inicio="volverAlInicio"
      />

      <!-- Contenido Principal -->
      <div class="pt-24 pb-12 px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
        <div class="container mx-auto max-w-lg">
          <!-- Panel de juego -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-amber-500/30 p-6 shadow-lg">
            <h1 class="text-2xl font-bold text-center mb-6">Tragaperras</h1>
            
            <!-- Saldo y Apuesta -->
            <div class="flex justify-between mb-8">
              <div class="bg-black/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Saldo</div>
                <div class="text-amber-500 text-2xl font-bold">{{ saldo }}€</div>
              </div>
              <div class="bg-black/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Apuesta</div>
                <div class="flex items-center justify-between">
                  <button 
                    @click="cambiarApuesta(-1)" 
                    class="bg-amber-500/20 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-amber-500/50 transition-colors"
                    :disabled="apuesta <= 1 || girando"
                    :class="{ 'opacity-50 cursor-not-allowed': apuesta <= 1 || girando }"
                  >-</button>
                  <div class="text-amber-500 text-2xl font-bold mx-2">{{ apuesta }}€</div>
                  <button 
                    @click="cambiarApuesta(1)" 
                    class="bg-amber-500/20 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-amber-500/50 transition-colors"
                    :disabled="apuesta >= saldo || girando"
                    :class="{ 'opacity-50 cursor-not-allowed': apuesta >= saldo || girando }"
                  >+</button>
                </div>
              </div>
            </div>

            <!-- Máquina Tragaperras -->
            <div class="bg-black/50 rounded-xl p-6 mb-6">
              <div class="bg-gray-900 rounded-lg p-4 flex justify-around items-center border-2 border-amber-500/30">
                <div 
                  v-for="(rodillo, index) in rodillos" 
                  :key="index" 
                  class="w-20 h-24 bg-white/5 rounded-lg flex items-center justify-center text-4xl"
                  :class="{
                    'animate-pulse': rodillo.girando,
                    'border-2 border-amber-500': lineasGanadoras.includes(index)
                  }"
                >
                  {{ rodillo.girando ? '?' : rodillo.simbolo }}
                </div>
              </div>
              <div class="mt-4 flex justify-center">
                <div class="flex items-center bg-amber-500/10 rounded-lg px-3 py-1 text-sm">
                  <span class="text-amber-400">💰 Línea Completa: x5 &nbsp; | &nbsp; Dos Iguales: x2 &nbsp; | &nbsp; Tres 7️⃣: x20</span>
                </div>
              </div>
            </div>

            <!-- Mensaje de Resultado -->
            <div 
              class="bg-black/50 rounded-xl p-4 mb-6 text-center"
              :class="{ 'border border-amber-500/50': esGanador }"
            >
              <p class="text-xl font-bold" :class="esGanador ? 'text-amber-500' : 'text-white'">{{ mensajeResultado }}</p>
            </div>

            <!-- Botón Girar -->
            <button 
              @click="girarTragaperras" 
              class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-lg transition-colors text-lg"
              :disabled="girando || saldo < apuesta"
              :class="{ 'opacity-50 cursor-not-allowed': girando || saldo < apuesta }"
            >
              {{ girando ? 'Girando...' : 'Girar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

// Montar la app en el html cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app4')) {
        app.mount("#app4");
    } else {
        console.error("No se encontró el elemento con id 'app4'");
    }
});