<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default border-0">
                    <div class="card-header custom-card-header text-center font-weight-bolder custom-title">Register</div>

                    <div class="card-body">
                        <form method="POST" action="/register">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right custom-label-text">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control custom-label-text" v-model="name" required autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right custom-label-text">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control custom-label-text" v-model="email" required>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right custom-label-text">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control custom-label-text" v-model="password" required>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right custom-label-text">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control custom-label-text" v-model="password_confirmation" required>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary custom-btn-txt" @click="handleSubmit">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : ""
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    axios.post('api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        c_password : this.password_confirmation
                    })
                        .then(response => {
                            localStorage.setItem('user',response.data.success.name)
                            localStorage.setItem('jwt',response.data.success.token)
                            localStorage.setItem('user_id',response.data.success.user_id)

                            if (localStorage.getItem('jwt') != null){
                                this.$router.go('/board')
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    this.password = "";
                    this.passwordConfirm = "";

                    return alert('Passwords do not match')
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            if (localStorage.getItem('jwt')) {
                return next('board');
            }

            next();
        }
    }
</script>

<style scoped>
    .custom-card-header{
        background: #0079bf;
        color: white!important;
    }

    .custom-title{
        font-size: 20px;
    }

    .custom-btn-txt{
        font-size: 16px;
    }

    .custom-label-text{
        font-size: 18px;
    }
</style>
