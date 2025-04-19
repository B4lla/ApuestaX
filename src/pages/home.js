const HomePage = {
    template: `
      <div class="min-h-screen bg-black text-white p-8">
        <h1 class="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        <p class="mb-4">This is the secure area.</p>
        <button @click="$emit('logout')" class="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Logout</button>
      </div>
    `,
  };
  