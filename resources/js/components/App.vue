<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light custom-navbar navbar-laravel">
            <div class="container">
                <router-link :to="{name: 'home'}" class="navbar-brand text-white" v-if="!isLoggedIn">Treclon</router-link>
                <router-link :to="{name: 'board'}" class="navbar-brand text-white" v-if="isLoggedIn">Treclon</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto"></ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <router-link :to="{ name: 'login' }" class="nav-link text-white-50 custom-nav-link" v-if="!isLoggedIn">Login</router-link>
                        <router-link :to="{ name: 'register' }" class="nav-link text-white-50 custom-nav-link" v-if="!isLoggedIn">Register</router-link>
                        <li class="nav-link text-white-50" v-if="isLoggedIn">Hi, {{name}}</li>
                        <li @click="logout" class="nav-link text-white-50 custom-nav-link" v-if="isLoggedIn">Logout</li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="py-4 board-wrapper">
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
              let token = localStorage.getItem('jwt');

              axios.defaults.headers.common['Content-Type'] = 'application/json';
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

              await axios.get('/api/logout')
                .then( () => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('user');
                    localStorage.removeItem('user_id');

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

<style>
    body{
        background: #00c2e0;
    }

    .custom-navbar{
        background: #0079bf!important;
    }

    .custom-nav-link:hover{
        text-decoration-color: white;
        color: white!important;
    }

    .board-wrapper{
        background: #00c2e0;
    }

    .v-icon{
        width: 18px;
    }
</style>
