<template>
  <div>
    <h1>Client Restrictions</h1>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Provider</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Google</td>
          <td><a href="#">delete</a></td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-header">Add Client Restriction</div>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="form-group flex-fill">
            <label for="clientRestriction">Client Idp Restrictions</label>
            <select name="clientRestriction" id="clientRestriction" class="form-select">
                <option value="google">Google</option>
                <option value="microsoft">Microsoft</option>
                <option value="microsoft">Instagram</option>
                <option value="aws">Amazon Web Service</option>
                <option value="facebook">Facebook</option>
            </select>
          </div>
          
        </div>
        <div class="d-flex justify-content-end mt-4">
            <button class="btn btn-primary">Add Client Idp Restriction</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  dependencies: [],
  setup() {},
  created() {},
  mounted() {},
  data() {
    return {
      index: 0,
    };
  },
  methods: {},
  watch: {
    index() {
      console.log(this.index);
    },
  },
};
</script>
<style lang="scss">
</style>