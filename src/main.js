const app = Vue.createApp({
    template: `
        <login-page v-if="!isLoggedIn" @login-success="isLoggedIn = true" />
        <home-page v-else @logout="isLoggedIn = false" />
    `,
    data() {
        return {
            isLoggedIn: false,
            loginMail: "admin@admin.com",
            loginPassword: "admin",
        }
    },

    methods: {
        

    },


    components: {
        LoginPage,
        HomePage,
    },
});


app.mount("#app");