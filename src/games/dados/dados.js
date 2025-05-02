const { createApp } = Vue;

const app = createApp({
template: `
  <div class="min-h-screen bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex flex-col items-center justify-center p-4">
    <!-- Juego de Dados -->
    <div class="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">Juego de Dados</h1>
      
      <!-- Saldo y Apuesta -->
      <div class="flex justify-between mb-6">
        <div class="bg-black bg-opacity-70 rounded-lg p-3">
          <div class="text-gray-400 text-sm">Saldo</div>
          <div class="text-yellow-500 text-2xl font-bold">{{ saldo }}€</div>
        </div>
        <div class="bg-black bg-opacity-70 rounded-lg p-3">
          <div class="text-gray-400 text-sm">Apuesta</div>
          <div class="text-yellow-500 text-2xl font-bold">{{ apuesta }}€</div>
        </div>
      </div>

      <!-- Dados -->
      <div class="bg-black rounded-lg p-4 mb-6">
        <div class="flex justify-center gap-4">
          <div 
            v-for="(dado, index) in dados" 
            :key="index" 
            class="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center"
            :class="{ 'animate-bounce': lanzando }"
          >
            <span class="text-4xl">{{ dadoEmoji(dado) }}</span>
          </div>
        </div>
      </div>

      <!-- Mensaje de Resultado -->
      <div 
        v-if="mensajeResultado" 
        class="bg-black bg-opacity-70 rounded-lg p-4 mb-6 text-center"
        :class="{ 'text-yellow-500': esGanador, 'text-white': !esGanador }"
      >
        <p class="text-xl font-bold">{{ mensajeResultado }}</p>
      </div>

      <!-- Reglas Simples -->
      <div class="bg-black bg-opacity-70 rounded-lg p-4 mb-6 text-center">
        <p class="text-sm">
          <span class="font-bold">Reglas:</span> 
          Par (x2) | Trío (x5) | Doble 6 (x10)
        </p>
      </div>

      <!-- Controles -->
      <div class="flex justify-between">
        <div class="flex gap-2">
          <button 
            @click="cambiarApuesta(-1)" 
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            :disabled="apuesta <= 1 || lanzando"
            :class="{ 'opacity-50 cursor-not-allowed': apuesta <= 1 || lanzando }"
          >
            -
          </button>
          <button 
            @click="cambiarApuesta(1)" 
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            :disabled="apuesta >= 10 || lanzando"
            :class="{ 'opacity-50 cursor-not-allowed': apuesta >= 10 || lanzando }"
          >
            +
          </button>
        </div>
        
        <button 
          @click="lanzarDados" 
          class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg"
          :disabled="lanzando || saldo < apuesta"
          :class="{ 'opacity-50 cursor-not-allowed': lanzando || saldo < apuesta }"
        >
          {{ lanzando ? 'Lanzando...' : 'Lanzar Dados' }}
        </button>
      </div>
    </div>
  </div>
</template>
`,
  data() {
    return {
      mensajeResultado: "¡Lanza los dados para comenzar!",
      saldo: 100,
      apuesta: 1,
      dados: [1, 1],
      lanzando: false,
      esGanador: false
    };
  },
  methods: {
    dadoEmoji(valor) {
      const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      return emojis[valor - 1];
    },
    lanzarDados() {
      if (this.lanzando) return;
      
      if (this.saldo < this.apuesta) {
        this.mostrarMensaje("No tienes suficiente saldo", false);
        return;
      }

      this.lanzando = true;
      this.saldo -= this.apuesta;
      
      // Simulación visual de lanzamiento
      const intervalId = setInterval(() => {
        this.dados = this.dados.map(() => this.generarDadoAleatorio());
      }, 100);
      
      // Detener el lanzamiento después de un tiempo
      setTimeout(() => {
        clearInterval(intervalId);
        
        // Generar resultado final
        this.dados = [
          this.generarDadoAleatorio(),
          this.generarDadoAleatorio()
        ];
        
        this.calcularGanancia();
        this.lanzando = false;
      }, 1500);
    },
    generarDadoAleatorio() {
      return Math.floor(Math.random() * 6) + 1;
    },
    calcularGanancia() {
      const [d1, d2] = this.dados;
      let ganancia = 0;
      
      // Par
      if (d1 === d2) {
        // Doble 6
        if (d1 === 6) {
          ganancia = this.apuesta * 10;
          this.mostrarMensaje(`¡Doble 6! Ganaste ${ganancia}€`, true);
        } else {
          // Cualquier otro par
          ganancia = this.apuesta * 5;
          this.mostrarMensaje(`¡Trío! Ganaste ${ganancia}€`, true);
        }
      } else {
        this.mostrarMensaje("Inténtalo de nuevo", false);
      }
      
      this.saldo += ganancia;
      
      // Comprobar si el saldo es 0
      if (this.saldo === 0) {
        setTimeout(() => {
          if (confirm('¡Te has quedado sin saldo! ¿Quieres recargar 100€?')) {
            this.saldo = 100;
          }
        }, 500);
      }
    },
    cambiarApuesta(cambio) {
      if (this.lanzando) return;
      
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
    if (document.getElementById('app2')) {
        app.mount("#app2");
    } else {
        console.error("No se encontró el elemento con id 'app2'");
    }
});
