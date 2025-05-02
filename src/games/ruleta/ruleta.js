const { createApp } = Vue;

const app = createApp({
template: `
  <div class="min-h-screen bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex flex-col items-center justify-center p-4">
    <div class="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-4 w-full max-w-sm">
      <h1 class="text-xl font-bold text-center mb-3">Ruleta Simple</h1>

      <!-- Saldo y Apuesta -->
      <div class="flex justify-between mb-4">
        <div class="bg-black bg-opacity-70 rounded-lg p-2">
          <div class="text-gray-400 text-xs">Saldo</div>
          <div class="text-yellow-500 text-xl font-bold">{{ saldo }}€</div>
        </div>
        <div class="bg-black bg-opacity-70 rounded-lg p-2">
          <div class="text-gray-400 text-xs">Apuesta</div>
          <div class="text-yellow-500 text-xl font-bold">{{ apuesta }}€</div>
        </div>
      </div>

      <!-- Ruleta -->
      <div class="bg-black rounded-lg p-4 mb-4 flex justify-center">
        <div class="relative w-40 h-40">
          <!-- Disco de la ruleta -->
          <div
            class="w-40 h-40 rounded-full border-4 border-yellow-500 bg-gray-900 absolute inset-0 flex items-center justify-center"
            :style="ruletaStyle"
          >
            <div class="w-full h-full rounded-full overflow-hidden relative">
              <div v-for="i in 10" :key="i" class="absolute w-full h-full" :class="'sector-' + i">
                <div
                  class="absolute left-1/2 w-1/2 h-full origin-left"
                  :class="i % 2 === 0 ? 'bg-red-600' : 'bg-black'"
                ></div>
              </div>
            </div>
          </div>

          <!-- Número ganador -->
          <div class="absolute inset-0 flex items-center justify-center z-10">
            <div class="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <div v-if="!girando && numeroGanador !== null"
                   class="text-3xl font-bold"
                   :class="esRojo(numeroGanador) ? 'text-red-500' : numeroGanador === 0 ? 'text-green-500' : 'text-white'">
                {{ numeroGanador }}
              </div>
              <div v-else class="text-3xl font-bold text-white">?</div>
            </div>
          </div>

          <!-- Marcador fijo -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-yellow-500 z-30"></div>
        </div>
      </div>

      <!-- Apuestas -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <button
          @click="seleccionarTipoApuesta('rojo')"
          class="bg-red-600 p-3 rounded-lg text-center transition-all"
          :class="{ 'ring-2 ring-yellow-500': tipoApuestaSeleccionada === 'rojo' }"
        >
          <div class="text-sm font-bold">Rojo</div>
          <div class="text-xs">x2</div>
        </button>
        <button
          @click="seleccionarTipoApuesta('negro')"
          class="bg-black p-3 rounded-lg text-center transition-all border border-gray-700"
          :class="{ 'ring-2 ring-yellow-500': tipoApuestaSeleccionada === 'negro' }"
        >
          <div class="text-sm font-bold">Negro</div>
          <div class="text-xs">x2</div>
        </button>
        <button
          @click="seleccionarTipoApuesta('par')"
          class="bg-gray-800 p-3 rounded-lg text-center transition-all"
          :class="{ 'ring-2 ring-yellow-500': tipoApuestaSeleccionada === 'par' }"
        >
          <div class="text-sm font-bold">Par</div>
          <div class="text-xs">x2</div>
        </button>
        <button
          @click="seleccionarTipoApuesta('impar')"
          class="bg-gray-800 p-3 rounded-lg text-center transition-all"
          :class="{ 'ring-2 ring-yellow-500': tipoApuestaSeleccionada === 'impar' }"
        >
          <div class="text-sm font-bold">Impar</div>
          <div class="text-xs">x2</div>
        </button>
      </div>

      <!-- Resultado -->
      <div
        v-if="mensajeResultado"
        class="bg-black bg-opacity-70 rounded-lg p-3 mb-4 text-center"
        :class="{ 'text-yellow-500': esGanador, 'text-white': !esGanador }"
      >
        <p class="text-lg font-bold">{{ mensajeResultado }}</p>
      </div>

      <!-- Controles -->
      <div class="flex justify-between">
        <div class="flex gap-2">
          <button
            @click="cambiarApuesta(-1)"
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg"
            :disabled="apuesta <= 1 || girando"
            :class="{ 'opacity-50 cursor-not-allowed': apuesta <= 1 || girando }"
          >-</button>
          <button
            @click="cambiarApuesta(1)"
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg"
            :disabled="apuesta >= 10 || girando"
            :class="{ 'opacity-50 cursor-not-allowed': apuesta >= 10 || girando }"
          >+</button>
        </div>

        <button
          @click="girarRuleta"
          class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg"
          :disabled="girando || saldo < apuesta || !tipoApuestaSeleccionada"
          :class="{ 'opacity-50 cursor-not-allowed': girando || saldo < apuesta || !tipoApuestaSeleccionada }"
        >
          {{ girando ? 'Girando...' : 'Girar' }}
        </button>
      </div>
    </div>
  </div>
`,
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
  computed: {
    ruletaStyle() {
      return {
        transform: `rotate(${this.anguloFinal}deg)`,
        transition: this.girando ? 'transform 2s cubic-bezier(0.5, 0, 0.5, 1)' : ''
      };
    }
  },
  
  methods: {
    esRojo(numero) {
      const numerosRojos = [1, 3, 5, 7, 9];
      return numerosRojos.includes(numero); // Solo 10 sectores simplificados
    },
    seleccionarTipoApuesta(tipo) {
      if (this.girando) return;
      this.tipoApuestaSeleccionada = tipo;
      this.mensajeResultado = `Has seleccionado: ${this.getTipoApuestaTexto(tipo)}`;
      this.esGanador = false;
    },
    getTipoApuestaTexto(tipo) {
      const textos = {
        rojo: "Rojo",
        negro: "Negro",
        par: "Par",
        impar: "Impar"
      };
      return textos[tipo] || tipo;
    },
    girarRuleta() {
      if (this.girando || !this.tipoApuestaSeleccionada) return;
      if (this.saldo < this.apuesta) {
        this.mostrarMensaje("No tienes saldo suficiente", false);
        return;
      }

      this.girando = true;
      this.mensajeResultado = null;
      this.saldo -= this.apuesta;
      this.numeroGanador = null;

      // Simular número ganador entre 0 y 9 (10 sectores)
      const numero = Math.floor(Math.random() * 10);
      this.numeroGanador = numero;

      const anguloPorSector = 36;
      const vueltas = 5;
      this.anguloFinal += (vueltas * 360) + ((10 - numero) * anguloPorSector);

      setTimeout(() => {
        this.calcularGanancia();
        this.girando = false;
      }, 2000);
    },
    calcularGanancia() {
      let gano = false;
      let multiplicador = 0;

      const esRojo = this.esRojo(this.numeroGanador);
      const esPar = this.numeroGanador !== 0 && this.numeroGanador % 2 === 0;

      if (this.tipoApuestaSeleccionada === 'rojo' && esRojo) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'negro' && !esRojo && this.numeroGanador !== 0) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'par' && esPar) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'impar' && !esPar && this.numeroGanador !== 0) {
        gano = true;
      }

      if (gano) {
        const ganancia = this.apuesta * 2;
        this.saldo += ganancia;
        this.mostrarMensaje(`¡Ganaste ${ganancia}€! (${this.numeroGanador})`, true);
      } else {
        this.mostrarMensaje(`Perdiste. Salió ${this.numeroGanador}`, false);
      }

      if (this.saldo === 0) {
        setTimeout(() => {
          if (confirm("Te has quedado sin saldo. ¿Recargar 100€?")) {
            this.saldo = 100;
          }
        }, 500);
      }
    },
    cambiarApuesta(cambio) {
      if (this.girando) return;
      const nuevaApuesta = this.apuesta + cambio;
      if (nuevaApuesta >= 1 && nuevaApuesta <= 10) {
        this.apuesta = nuevaApuesta;
      }
    },
    mostrarMensaje(mensaje, esGanador) {
      this.mensajeResultado = mensaje;
      this.esGanador = esGanador;
    }
  }
});

// Asegúrate de que el elemento con id "app" existe antes de montar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app3')) {
        app.mount("#app3");
    } else {
        console.error("No se encontró el elemento con id 'app2'");
    }
});
