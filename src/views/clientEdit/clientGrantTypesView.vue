<template>
  <div>
    <h1>Client Grant Types</h1>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Grant Type</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5</td>
          <td>implicit</td>
          <td><a href="#">delete</a></td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-header">Add Client Grant Type</div>
      <div class="card-body">
        <div class="d-flex">
          <div class="form-group flex-fill">
            <label for="grantType">Grant Type</label>
            <select name="grantType" id="grantType" class="form-select">
              <option value="authorization_code">authorization_code</option>
              <option value="client_credentials">client_credentials</option>
              <option value="hybrid">hybrid</option>
              <option value="password">password</option>
              <option value="urn:ietf:params:oauth:grant-type:device_code">
                urn:ietf:params:oauth:grant-type:device_code
              </option>
            </select>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-primary">Add Grant Type</button>
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