<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <h1>Login</h1>
      <form method="post" @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
[type="text"],
[type="number"],
[type="search"],
[type="password"] {
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
}
</style>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>
