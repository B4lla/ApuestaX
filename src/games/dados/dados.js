// importamos el componente navbar para la barra superior
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
      dados: [1, 1],
      lanzando: false,
      mensajeResultado: "Selecciona tu apuesta y lanza los dados",
      esGanador: false
    };
  },
  methods: {
    // convierte el valor numerico del dado en su emoji correspondiente
    dadoEmoji(valor) {
      const emojis = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
      return emojis[valor];
    },
    
    // metodo principal que inicia la tirada de dados
    lanzarDados() {
      if (this.lanzando || this.saldo < this.apuesta) return;
      
      this.lanzando = true;
      this.esGanador = false;
      this.mensajeResultado = "Lanzando...";
      
      // Reducir el saldo por la apuesta
      this.saldo -= this.apuesta;
      
      // Simular tiempo de lanzamiento
      setTimeout(() => {
        // Generar valores aleatorios para los dados
        this.dados = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ];
        
        // Calcular resultado
        this.calcularGanancia();
        this.lanzando = false;
      }, 1000);
    },
    
    // evalua la combinacion de dados y calcula la ganancia
    calcularGanancia() {
      const [dado1, dado2] = this.dados;
      let ganancia = 0;
      let mensaje = "";
      
      // Par de dados iguales
      if (dado1 === dado2) {
        // Doble 6 (x10)
        if (dado1 === 6) {
          ganancia = this.apuesta * 10;
          mensaje = `¡Doble 6! Ganaste ${ganancia}€`;
        } 
        // Cualquier par (x2)
        else {
          ganancia = this.apuesta * 2;
          mensaje = `¡Par de ${dado1}! Ganaste ${ganancia}€`;
        }
      } 
      // Suma 7 (x3)
      else if (dado1 + dado2 === 7) {
        ganancia = this.apuesta * 3;
        mensaje = `¡Suma 7! Ganaste ${ganancia}€`;
      }
      // Perdiste
      else {
        mensaje = "No hay coincidencia. Inténtalo de nuevo.";
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
        nombre-juego="Juego de Dados"
        @cerrar-sesion="cerrarSesion"
        @volver-inicio="volverAlInicio"
      />

      <!-- Contenido Principal -->
      <div class="pt-24 pb-12 px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
        <div class="container mx-auto max-w-lg">
          <!-- Panel de juego -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-amber-500/30 p-6 shadow-lg">
            <h1 class="text-2xl font-bold text-center mb-6">Juego de Dados</h1>
            
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
                    :disabled="apuesta <= 1 || lanzando"
                    :class="{ 'opacity-50 cursor-not-allowed': apuesta <= 1 || lanzando }"
                  >-</button>
                  <div class="text-amber-500 text-2xl font-bold mx-2">{{ apuesta }}€</div>
                  <button 
                    @click="cambiarApuesta(1)" 
                    class="bg-amber-500/20 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-amber-500/50 transition-colors"
                    :disabled="apuesta >= saldo || lanzando"
                    :class="{ 'opacity-50 cursor-not-allowed': apuesta >= saldo || lanzando }"
                  >+</button>
                </div>
              </div>
            </div>

            <!-- Dados -->
            <div class="bg-black/50 rounded-xl p-6 mb-6">
              <div class="flex justify-center gap-8">
                <div 
                  v-for="(dado, index) in dados" 
                  :key="index" 
                  class="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-inner border border-amber-500/20"
                  :class="{ 'animate-pulse': lanzando }"
                >
                  <span class="text-6xl" :class="{ 'opacity-30': lanzando }">{{ dadoEmoji(dado) }}</span>
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

            <!-- Reglas Simples -->
            <div class="bg-black/30 rounded-xl p-4 mb-6 text-sm text-white/70">
              <h3 class="text-amber-500 font-bold mb-2">Reglas</h3>
              <ul class="space-y-1 list-disc pl-4">
                <li>Par de números: Gana x2 tu apuesta</li>
                <li>Doble 6: Gana x10 tu apuesta</li>
                <li>Suma 7: Gana x3 tu apuesta</li>
              </ul>
            </div>

            <!-- Botón Lanzar -->
            <button 
              @click="lanzarDados" 
              class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-lg transition-colors text-lg"
              :disabled="lanzando || saldo < apuesta"
              :class="{ 'opacity-50 cursor-not-allowed': lanzando || saldo < apuesta }"
            >
              {{ lanzando ? 'Lanzando...' : 'Lanzar Dados' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

// Montar la app en el html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app2')) {
        app.mount("#app2");
    } else {
        console.error("No se encontró el elemento con id 'app2'");
    }
});
