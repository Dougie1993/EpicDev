<template>
   <form id="addContact-form">
        <div class="row">
          <div class="title">
            <h1>Add Contact Note</h1>
          </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Note Title <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg">
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Note Description <span class="text-danger">*</span></label>
                <textarea class="form-control form-control-lg"></textarea>
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4">Sign Up</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'AddContactNote',
  data () {
    return {
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
