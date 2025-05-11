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
      mensajeResultado: "Selecciona tu apuesta",
      saldo: 100,
      apuesta: 1,
      girando: false,
      esGanador: false,
      tipoApuestaSeleccionada: null,
      numeroGanador: null,
      anguloFinal: 0
    };
  },
  // propiedades calculadas
  computed: {
    // calcula la rotacion de la ruleta segun el estado del juego
    ruletaStyle() {
      return {
        transform: `rotate(${this.anguloFinal}deg)`,
        transition: this.girando ? 'transform 3s cubic-bezier(0.5, 0, 0.5, 1)' : ''
      };
    }
  },
  methods: {
    // determina si un numero es rojo en la ruleta
    esRojo(numero) {
      const numerosRojos = [1, 3, 5, 7, 9];
      return numerosRojos.includes(numero);
    },
    
    // actualiza el tipo de apuesta seleccionada
    seleccionarTipoApuesta(tipo) {
      if (this.girando) return;
      this.tipoApuestaSeleccionada = tipo;
      
      let mensaje = "";
      if (tipo === 'rojo') mensaje = "Apuesta a ROJO (x2)";
      else if (tipo === 'negro') mensaje = "Apuesta a NEGRO (x2)";
      else if (tipo === 'par') mensaje = "Apuesta a PAR (x2)";
      else if (tipo === 'impar') mensaje = "Apuesta a IMPAR (x2)";
      else if (tipo.startsWith('numero-')) {
        const numero = tipo.split('-')[1];
        mensaje = `Apuesta al NÚMERO ${numero} (x10)`;
      }
      
      this.mostrarMensaje(mensaje, false);
    },
    
    // metodo principal para girar la ruleta y generar resultado
    girarRuleta() {
      if (this.girando || this.saldo < this.apuesta || !this.tipoApuestaSeleccionada) return;
      
      this.girando = true;
      this.esGanador = false;
      this.mostrarMensaje("Girando la ruleta...", false);
      
      // Restar apuesta
      this.saldo -= this.apuesta;
      
      // Generar resultado aleatorio (0-9)
      this.numeroGanador = Math.floor(Math.random() * 10);
      
      // Añadir grados para este número (cada sector es 36 grados)
      const gradosPorSector = 36;
      const giroBase = 1800; // Giros múltiples para efecto visual
      this.anguloFinal = giroBase + (this.numeroGanador * gradosPorSector);
      
      // Esperar a que termine la animación
      setTimeout(() => {
        this.girando = false;
        this.calcularGanancia();
      }, 3000);
    },
    
    // verifica si el usuario gano y calcula su premio
    calcularGanancia() {
      const esRojo = this.esRojo(this.numeroGanador);
      const esPar = this.numeroGanador % 2 === 0;
      
      let ganancia = 0;
      let mensaje = "";
      
      // Comprobar tipo de apuesta
      if (this.tipoApuestaSeleccionada === 'rojo' && esRojo) {
        ganancia = this.apuesta * 2;
        mensaje = `¡ROJO ${this.numeroGanador}! Ganaste ${ganancia}€`;
      } 
      else if (this.tipoApuestaSeleccionada === 'negro' && !esRojo) {
        ganancia = this.apuesta * 2;
        mensaje = `¡NEGRO ${this.numeroGanador}! Ganaste ${ganancia}€`;
      }
      else if (this.tipoApuestaSeleccionada === 'par' && esPar) {
        ganancia = this.apuesta * 2;
        mensaje = `¡NÚMERO PAR ${this.numeroGanador}! Ganaste ${ganancia}€`;
      }
      else if (this.tipoApuestaSeleccionada === 'impar' && !esPar) {
        ganancia = this.apuesta * 2;
        mensaje = `¡NÚMERO IMPAR ${this.numeroGanador}! Ganaste ${ganancia}€`;
      }
      else if (this.tipoApuestaSeleccionada === `numero-${this.numeroGanador}`) {
        ganancia = this.apuesta * 10;
        mensaje = `¡NÚMERO ${this.numeroGanador}! Ganaste ${ganancia}€`;
      }
      else {
        mensaje = `Salió ${this.numeroGanador}. Pierdes.`;
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
        nombre-juego="Ruleta"
        @cerrar-sesion="cerrarSesion"
        @volver-inicio="volverAlInicio"
      />

      <!-- Contenido Principal -->
      <div class="pt-24 pb-12 px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
        <div class="container mx-auto max-w-lg">
          <!-- Panel de juego -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-amber-500/30 p-6 shadow-lg">
            <h1 class="text-2xl font-bold text-center mb-6">Ruleta</h1>
            
            <!-- Saldo y Apuesta -->
            <div class="flex justify-between mb-6">
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

            <!-- Ruleta -->
            <div class="bg-black/50 rounded-xl p-6 mb-6 flex justify-center">
              <div class="relative w-48 h-48">
                <!-- Disco de la ruleta -->
                <div
                  class="w-48 h-48 rounded-full border-4 border-amber-500 bg-gray-900 absolute inset-0 flex items-center justify-center"
                  :style="ruletaStyle"
                >
                  <div class="w-full h-full rounded-full overflow-hidden relative">
                    <div v-for="i in 10" :key="i" class="absolute w-full h-full" :class="'sector-' + i">
                      <div
                        class="absolute left-1/2 w-1/2 h-full origin-left"
                        :class="esRojo(i - 1) ? 'bg-red-600' : 'bg-black'"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Marcador -->
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-amber-500 clip-path-triangle z-10"></div>

                <!-- Número ganador -->
                <div class="absolute inset-0 flex items-center justify-center z-10">
                  <div class="w-20 h-20 rounded-full bg-black/80 border border-amber-500/50 flex items-center justify-center">
                    <div v-if="!girando && numeroGanador !== null"
                        class="text-3xl font-bold"
                        :class="esRojo(numeroGanador) ? 'text-red-500' : 'text-white'">
                      {{ numeroGanador }}
                    </div>
                    <div v-else class="text-3xl font-bold text-white">?</div>
                  </div>
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

            <!-- Apuestas -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <button
                @click="seleccionarTipoApuesta('rojo')"
                class="bg-red-600 p-3 rounded-lg text-center transition-all"
                :class="{'ring-4 ring-amber-500': tipoApuestaSeleccionada === 'rojo', 'opacity-50': girando}"
                :disabled="girando"
              >
                ROJO
              </button>
              <button
                @click="seleccionarTipoApuesta('negro')"
                class="bg-black p-3 rounded-lg text-center border border-white/20 transition-all"
                :class="{'ring-4 ring-amber-500': tipoApuestaSeleccionada === 'negro', 'opacity-50': girando}"
                :disabled="girando"
              >
                NEGRO
              </button>
              <button
                @click="seleccionarTipoApuesta('par')"
                class="bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-3 rounded-lg text-center border border-white/20 transition-all"
                :class="{'ring-4 ring-amber-500': tipoApuestaSeleccionada === 'par', 'opacity-50': girando}"
                :disabled="girando"
              >
                PAR
              </button>
              <button
                @click="seleccionarTipoApuesta('impar')"
                class="bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-3 rounded-lg text-center border border-white/20 transition-all"
                :class="{'ring-4 ring-amber-500': tipoApuestaSeleccionada === 'impar', 'opacity-50': girando}"
                :disabled="girando"
              >
                IMPAR
              </button>
            </div>

            <!-- Números -->
            <div class="grid grid-cols-5 gap-2 mb-6">
              <button
                v-for="numero in 10" 
                :key="numero-1"
                @click="seleccionarTipoApuesta('numero-' + (numero-1))"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                :class="{
                  'bg-red-600': esRojo(numero-1),
                  'bg-black border border-white/20': !esRojo(numero-1),
                  'ring-2 ring-amber-500': tipoApuestaSeleccionada === 'numero-' + (numero-1),
                  'opacity-50': girando
                }"
                :disabled="girando"
              >
                {{ numero - 1 }}
              </button>
            </div>

            <!-- Botón Girar -->
            <button 
              @click="girarRuleta" 
              class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-lg transition-colors text-lg"
              :disabled="girando || saldo < apuesta || !tipoApuestaSeleccionada"
              :class="{ 'opacity-50 cursor-not-allowed': girando || saldo < apuesta || !tipoApuestaSeleccionada }"
            >
              {{ girando ? 'Girando...' : 'Girar Ruleta' }}
            </button>
          </div>
        </div>
      </div>

      <style>
        .clip-path-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
        .sector-1 { transform: rotate(0deg); }
        .sector-2 { transform: rotate(36deg); }
        .sector-3 { transform: rotate(72deg); }
        .sector-4 { transform: rotate(108deg); }
        .sector-5 { transform: rotate(144deg); }
        .sector-6 { transform: rotate(180deg); }
        .sector-7 { transform: rotate(216deg); }
        .sector-8 { transform: rotate(252deg); }
        .sector-9 { transform: rotate(288deg); }
        .sector-10 { transform: rotate(324deg); }
      </style>
    </div>
  `
});

// Montar la app en el html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app3')) {
        app.mount("#app3");
    } else {
        console.error("No se encontró el elemento con id 'app3'");
    }
});