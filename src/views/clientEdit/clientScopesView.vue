<template>
  <div>
    <h1>Client Scopes</h1>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Scope</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>openid</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>2</td>
          <td>profile</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>3</td>
          <td>self-service-business</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>4</td>
          <td>role</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>26</td>
          <td>ad-groups</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>27</td>
          <td>offline_access</td>
          <td><a href="#">delete</a></td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-header">Add Client Scope</div>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="form-group flex-fill">
            <label for="scope">Scope</label>
            <input type="text" id="scope" class="form-control" />
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mt-3">Add Scope</button>
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