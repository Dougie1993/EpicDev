<template>
   <form id="addContact-form">
        <div class="row">
          <div class="title">
            <h1>Add Contact Info</h1>
          </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model.trim="email" class="form-control form-control-lg">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Home Number <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Cell Number <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg">
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4" @click="addContactInfo()">Sign Up</button>
            </div>
        </div>
    </form>
</template>

<script>

export default {
  name: 'AddContactInfo',
  data () {
    return {
    }
  },
  methods: {
    addContactInfo() {
      console.log('continue adding info');
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
