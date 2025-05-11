const { createApp } = Vue;

const app = createApp({
template: `
    <!-- Estructura HTML -->
        <div class="min-h-screen bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex flex-col">
            <!-- Barra de Navegación -->
            <nav class="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md p-4 border-b border-gray-800 flex items-center justify-between z-50">
                <div class="flex items-center">
                    <div class="bg-yellow-500 w-8 h-8 flex items-center justify-center rounded">
                        <span class="text-black font-bold">C</span>
                    </div>
                    <span class="ml-2 font-bold text-xl">CardVerse</span>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="text-gray-300 hover:text-white text-sm">Iniciar Sesión</button>
                    <button class="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-1 rounded text-sm">Registrarse</button>
                </div>
            </nav>
  <!-- Alineación del contenido -->
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
          <div class="absolute inset-0 flex items-center justify-center z-  10">
            <div class="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <div v-if="!girando && numeroGanador !== null"
                   class="text-3xl font-bold"
                   :class="esRojo(numeroGanador) ? 'text-red-500' : 'text-black'">
                {{ numeroGanador }}
              </div>
              <div v-else class="text-3xl font-bold text-white">?</div>
            </div>
          </div>

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
    return { // Variables
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
    ruletaStyle() { //Realiza la rotación de la ruleta
      return {
        transform: `rotate(${this.anguloFinal}deg)`,
        transition: this.girando ? 'transform 2s cubic-bezier(0.5, 0, 0.5, 1)' : ''
      };
    }
  },
  
  methods: {
    esRojo(numero) { // Determina si el número es rojo
      const numerosRojos = [1, 4, 5, 8, 10];
      return numerosRojos.includes(numero); // Solo 10 sectores simplificados
    },
    seleccionarTipoApuesta(tipo) { // Selecciona el tipo de apuesta
      if (this.girando) return;
      this.tipoApuestaSeleccionada = tipo;
      this.esGanador = false;
    },
    girarRuleta() { //Método para girar la ruleta
      if (this.girando || !this.tipoApuestaSeleccionada) return; // Evita girar si ya está girando o no hay apuesta seleccionada
      if (this.saldo < this.apuesta) { // Comprobar si hay suficiente saldo
        this.mostrarMensaje("No tienes saldo suficiente", false);
        return;
      }
      // Si hay saldo, iniciar el giro
      this.girando = true;
      this.mensajeResultado = null;
      this.saldo -= this.apuesta;
      this.numeroGanador = null;

      // Simular número ganador entre 0 y 9 (10 sectores)
      const numero = Math.floor(Math.random() * 10) + 1;
      this.numeroGanador = numero;
      // Calcular el ángulo final
      // 10 sectores, cada uno ocupa 36 grados (360/10)
      const anguloPorSector = 36;
      const vueltas = 5;
      this.anguloFinal += (vueltas * 360) + ((10 - numero) * anguloPorSector);

      setTimeout(() => { // Esperar a que termine el giro
        this.calcularGanancia(); // Calcular ganancia
        this.girando = false; // Terminar el giro
      }, 2000);
    },
    calcularGanancia() { // Método para calcular la ganancia
      let gano = false; // Variable para determinar si he ganado
      let multiplicador = 0;

      const esRojo = this.esRojo(this.numeroGanador); // Determina si el número es rojo
      const esPar = this.numeroGanador % 2 === 0; // Determina si el número es par

      // Comprobar si la apuesta es ganadora
      if (this.tipoApuestaSeleccionada === 'rojo' && esRojo) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'negro' && !esRojo) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'par' && esPar) {
        gano = true;
      } else if (this.tipoApuestaSeleccionada === 'impar' && !esPar) {
        gano = true;
      }

      if (gano) { //Si gana el usuario se le suma y se muestra un mensaje
        const ganancia = this.apuesta * 2;
        this.saldo += ganancia;
        this.mostrarMensaje(`¡Ganaste ${ganancia}€! (${this.numeroGanador})`, true);
      } else {
        this.mostrarMensaje(`Perdiste. Salió ${this.numeroGanador}`, false);
      }

    },
    //Metodo para cambiar la apuesta
    cambiarApuesta(cambio) { 
      if (this.girando) return; //Si esta girando que no se pueda cambiar
      const nuevaApuesta = this.apuesta + cambio;
      if (nuevaApuesta >= 1 && nuevaApuesta <= 10) {
        this.apuesta = nuevaApuesta;
      }
    },
    mostrarMensaje(mensaje, esGanador) { //Metodo para mostrar mensajes
      this.mensajeResultado = mensaje;
      this.esGanador = esGanador;
    }
  }
});

// Montar la app en el html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app3')) {
        app.mount("#app3");
    } else {
        console.error("No se encontró el elemento con id 'app3'");
    }
});
