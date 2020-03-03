<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <router-link :to="{name: 'home'}" class="navbar-brand" v-if="!isLoggedIn">Treclon</router-link>
                <router-link :to="{name: 'board'}" class="navbar-brand" v-if="isLoggedIn">Treclon</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto"></ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <router-link :to="{ name: 'login' }" class="nav-link" v-if="!isLoggedIn">Login</router-link>
                        <router-link :to="{ name: 'register' }" class="nav-link" v-if="!isLoggedIn">Register</router-link>
                        <li class="nav-link" v-if="isLoggedIn"> Hi, {{name}}</li>
                        <button @click="logout" class="nav-link" v-if="isLoggedIn">Logout</button>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "App",
        data(){
            return{
                isLoggedIn: null,
                name: null
            }
        },
        methods:{
          async logout(){

              await axios.get('/api/logout')
                .then( () => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('user');

                    if (localStorage.getItem('jwt') == null){
                        this.$router.go('/home');
                    }

                    this.isLoggedIn = null;
                    this.name = null;
                }
                ).catch(error => {
                console.error(error);
            });
          }
        },
        mounted() {
            this.isLoggedIn = localStorage.getItem('jwt')
            this.name = localStorage.getItem('user')
        }
    }
</script>

<style scoped>

</style>
