<template>
   <form id="addContact-form">
        <div class="row">
          <div class="title">
            <h1>Add Contact</h1>
          </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg" name="fname" v-model="fname">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Surname <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg" name="surname" v-model="surname">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Username <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg" name="uname" v-model="uname">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                <input type="password" class="form-control form-control-lg" name="password" v-model="password">
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4" @click="addContact()">Sign Up</button>
            </div>
        </div>
    </form>
</template>

<script>

export default {
  name: 'AddContact',
  data () {
    return {
      fname: 'hey',
      surname: '',
      uname: '',
      password: ''
    }
  },
  methods: {
    addContact () {
    //  fname = this.fname
    fname = this.fname
      console.log(fname)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-vue{
    background: #53B985;
    color: #31485D;
    font-weight: bold;
}
</style>
