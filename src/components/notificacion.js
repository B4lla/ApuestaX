// componente de notificacion que se muestra temporalmente en la parte superior de la pantalla
export const Notificacion = {
    template: `
      <div 
        v-if="visible" 
        class="fixed top-4 right-4 bg-[#FFFFFF1F] backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-4 w-80 z-50 flex items-start gap-4"
      >
        <div class="text-2xl">
          <i :class="icon"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-white">{{ title }}</h3>
          <p class="text-sm text-white/70">{{ message }}</p>
        </div>
        <button @click="close" class="text-white/50 hover:text-white text-lg">&times;</button>
        <!-- barra de progreso que indica el tiempo restante de la notificacion -->
        <div 
          class="absolute bottom-0 left-0 h-1 bg-amber-500" 
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    `,
    data() {
      return {
        // controla si se muestra la notificacion
        visible: false,
        // porcentaje de la barra de progreso (empieza en 100%)
        progress: 100,
        // guarda referencia al intervalo para poder cancelarlo
        interval: null,
      };
    },
    props: {
      // clase de icono de fontawesome que se muestra (ej: "fas fa-check")
      icon: { type: String, required: true },
      // titulo de la notificacion
      title: { type: String, required: true },
      // mensaje detallado
      message: { type: String, required: true },
      // tiempo en milisegundos que dura la notificacion antes de desaparecer
      duration: { type: Number, default: 10000 },
    },
    methods: {
      // muestra la notificacion e inicia la barra de progreso
      show() {
        this.visible = true;
        this.startProgress();
      },
      // cierra la notificacion y limpia el intervalo
      close() {
        this.visible = false;
        clearInterval(this.interval);
      },
      // inicia la cuenta atras de la barra de progreso
      startProgress() {
        // calcula cuanto debe reducirse en cada paso
        const step = 100 / (this.duration / 100);
        // crea un intervalo que reduce el progreso cada 30ms
        this.interval = setInterval(() => {
          this.progress -= step;
          // cuando llega a 0 cierra automaticamente la notificacion
          if (this.progress <= 0) {
            this.close();
          }
        }, 30);
      },
    },
    // cuando el componente se monta muestra automaticamente la notificacion
    mounted() {
      this.show();
    },
  };
