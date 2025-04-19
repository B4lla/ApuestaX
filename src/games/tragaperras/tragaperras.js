const { createApp } = Vue;

const app = createApp({
    template: `
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

            <!-- Contenido Principal -->
            <div class="flex-1 flex flex-col items-center justify-center p-6 mt-16">
                <!-- Máquina Tragaperras -->
                <div class="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-6 w-full max-w-2xl">
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
                        <div class="bg-black bg-opacity-70 rounded-lg p-3">
                            <div class="text-gray-400 text-sm">Ganancia</div>
                            <div class="text-yellow-500 text-2xl font-bold">{{ ganancia }}€</div>
                        </div>
                    </div>

                    <!-- Rodillos -->
                    <div class="bg-black rounded-lg p-4 mb-6">
                        <div class="flex justify-center gap-4">
                            <div 
                                v-for="(rodillo, index) in rodillos" 
                                :key="index" 
                                class="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg flex items-center justify-center text-5xl"
                                :class="{ 'animate-spin-slow': girando }"
                            >
                                {{ rodillo }}
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

                    <!-- Tabla de Premios -->
                    <div class="bg-black bg-opacity-50 rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-bold mb-4 text-center">Tabla de Premios</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🎰 🎰 🎰</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x100</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">7️⃣ 7️⃣ 7️⃣</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x50</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">💎 💎 💎</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x25</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🍇 🍇 🍇</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x15</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🍊 🍊 🍊</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x10</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🍋 🍋 🍋</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x5</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🍒 🍒 🍒</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x3</div>
                            </div>
                            <div class="bg-black bg-opacity-70 rounded-lg p-3 text-center">
                                <div class="flex justify-center mb-2">
                                    <span class="text-2xl">🍒 🍋 🍊</span>
                                </div>
                                <div class="text-yellow-500 font-bold">x2</div>
                            </div>
                        </div>
                    </div>

                    <!-- Controles -->
                    <div class="flex flex-col md:flex-row gap-4 justify-between">
                        <div class="flex gap-2">
                            <button 
                                @click="cambiarApuesta(-1)" 
                                class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                                :disabled="apuesta <= 1 || girando"
                                :class="{ 'opacity-50 cursor-not-allowed': apuesta <= 1 || girando }"
                            >
                                -
                            </button>
                            <button 
                                @click="cambiarApuesta(1)" 
                                class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                                :disabled="apuesta >= 10 || girando"
                                :class="{ 'opacity-50 cursor-not-allowed': apuesta >= 10 || girando }"
                            >
                                +
                            </button>
                        </div>
                        
                        <button 
                            @click="girarRodillos" 
                            class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg"
                            :disabled="girando || saldo < apuesta"
                            :class="{ 'opacity-50 cursor-not-allowed': girando || saldo < apuesta }"
                        >
                            {{ girando ? 'Girando...' : 'Girar' }}
                        </button>
                        
                        <button 
                            @click="apostarMaximo" 
                            class="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                            :disabled="girando || saldo < 10"
                            :class="{ 'opacity-50 cursor-not-allowed': girando || saldo < 10 }"
                        >
                            Apuesta Máx
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            mensajeResultado: null,
            saldo: 100,
            apuesta: 1,
            ganancia: 0,
            rodillos: ["🎰", "🎰", "🎰"],
            girando: false,
            esGanador: false,
            simbolos: ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣", "🎰"]
        };
    },
    methods: {
        girarRodillos() {
            if (this.girando) return;
            
            if (this.saldo < this.apuesta) {
                this.mostrarMensaje("No tienes suficiente saldo para realizar esta apuesta.", false);
                return;
            }

            this.girando = true;
            this.mensajeResultado = null;
            this.saldo -= this.apuesta;
            this.ganancia = 0;
            
            // Simulación visual de giro
            const intervalId = setInterval(() => {
                this.rodillos = this.rodillos.map(() => this.generarSimboloAleatorio());
            }, 100);
            
            // Detener el giro después de un tiempo y mostrar el resultado final
            setTimeout(() => {
                clearInterval(intervalId);
                
                // Generar resultado final
                const resultadoFinal = [
                    this.generarSimboloAleatorio(),
                    this.generarSimboloAleatorio(),
                    this.generarSimboloAleatorio()
                ];
                
                this.rodillos = resultadoFinal;
                this.calcularGanancia();
                this.girando = false;
            }, 2000);
        },
        generarSimboloAleatorio() {
            const indice = Math.floor(Math.random() * this.simbolos.length);
            return this.simbolos[indice];
        },
        calcularGanancia() {
            const [r1, r2, r3] = this.rodillos;
            
            if (r1 === r2 && r2 === r3) {
                const premios = {
                    "🍒": 3,
                    "🍋": 5,
                    "🍊": 10,
                    "🍇": 15,
                    "💎": 25,
                    "7️⃣": 50,
                    "🎰": 100
                };
                
                const multiplicador = premios[r1] || 0;
                this.ganancia = this.apuesta * multiplicador;
                this.saldo += this.ganancia;
                this.mostrarMensaje(`¡Felicidades! Has ganado ${this.ganancia}€ (x${multiplicador})`, true);
            } else if (this.esCombinacionFrutas(r1, r2, r3)) {
                // Combinación de frutas diferentes
                this.ganancia = this.apuesta * 2;
                this.saldo += this.ganancia;
                this.mostrarMensaje(`¡Combinación de frutas! Has ganado ${this.ganancia}€ (x2)`, true);
            } else {
                this.ganancia = 0;
                this.mostrarMensaje("Inténtalo de nuevo", false);
            }
            
            // Comprobar si el saldo es 0
            if (this.saldo === 0) {
                setTimeout(() => {
                    if (confirm('¡Te has quedado sin saldo! ¿Quieres recargar 100€?')) {
                        this.saldo = 100;
                    }
                }, 500);
            }
        },
        esCombinacionFrutas(s1, s2, s3) {
            const frutas = ["🍒", "🍋", "🍊", "🍇"];
            // Verificar que todos son frutas pero no son iguales
            return frutas.includes(s1) && frutas.includes(s2) && frutas.includes(s3) && 
                   !(s1 === s2 && s2 === s3);
        },
        cambiarApuesta(cambio) {
            if (this.girando) return;
            
            const nuevaApuesta = this.apuesta + cambio;
            if (nuevaApuesta >= 1 && nuevaApuesta <= 10) {
                this.apuesta = nuevaApuesta;
            }
        },
        apostarMaximo() {
            if (this.girando || this.saldo < 10) return;
            this.apuesta = 10;
        },
        mostrarMensaje(mensaje, esGanador) {
            this.mensajeResultado = mensaje;
            this.esGanador = esGanador;
        }
    },
    mounted() {
        this.mensajeResultado = "¡Haz girar los rodillos para comenzar!";
    }
});

// Asegúrate de que el elemento con id "app" existe antes de montar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('app1')) {
        app.mount("#app1");
    } else {
        console.error("No se encontró el elemento con id 'app1'");
    }
});