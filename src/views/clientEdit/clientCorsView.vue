<template>
  <div>
    <h1>Client CORS</h1>
  </div>
  <table class="table table-condensed">
    <thead class="thead-primary">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Origin</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2</td>
        <td>http://localhost:8080</td>
        <td><a href="#">delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>http://localhost:8081</td>
        <td><a href="#">delete</a></td>
      </tr>
      <tr>
        <td>24</td>
        <td>https://its-idmtst-web.adtest.unc.edu</td>
        <td><a href="#">delete</a></td>
      </tr>
      <tr>
        <td>29</td>
        <td>https://selfservicetest.unc.edu</td>
        <td><a href="#">delete</a></td>
      </tr>
    </tbody>
  </table>

  <div class="card">
    <div class="card-header">Add Client CORS Orgin</div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="form-group flex-fill">
          <label for="origin">Origin</label>
          <input type="text" id="origin" class="form-control" />
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary mt-3">Add CORS Origin</button>
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