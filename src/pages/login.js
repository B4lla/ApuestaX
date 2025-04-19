const LoginPage = {
    template: `
      <div class="min-h-screen flex items-center justify-center bg-black text-white">
        <div class="p-6 rounded-lg bg-white/10 backdrop-blur-xl">
          <h1 class="text-xl font-bold mb-4">Login</h1>
          <input v-model="email" type="email" placeholder="Email" class="mb-2 w-full p-2 bg-black text-white border border-white/20 rounded" />
          <input v-model="password" type="password" placeholder="Password" class="mb-4 w-full p-2 bg-black text-white border border-white/20 rounded" />
          <button @click="login" class="w-full bg-yellow-500 text-black font-medium py-2 rounded hover:bg-yellow-600">
            Log In
          </button>
        </div>
      </div>
    `,
    data() {
      return {
        email: '',
        password: '',
      };
    },
    emits: ['login-success'],
    methods: {
      login() {
        if (this.email === 'admin@admin.com' && this.password === 'admin') {
          this.$emit('login-success');
        } else {
          alert("Incorrect login");
        }
      },
    },
  };
  