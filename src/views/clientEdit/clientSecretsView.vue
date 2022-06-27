<template>
  <div>
    <h1>Client Secrets</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Description</th>
          <th scope="col">Expiration</th>
          <th scope="col">Created</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>w=6JD=\,V?M5{_5J</td>
          <td></td>
          <td>10/09/2021</td>
          <td>
            <a href="#">delete</a>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>w=6JD=\,V?M5{_5J</td>
          <td></td>
          <td>10/09/2021</td>
          <td>
            <a href="#">delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <div class="card">
        <div class="card-header">Add Client Secret</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group flex-fill">
              <label for="description">Description</label>
              <input type="text" id="description" class="form-control" data-lpignore="true"/>
            </div>
            <div class="form-group flex-fill">
              <label for="secret">Secret</label>
              <input type="password" id="secret" class="form-control" data-lpignore="true"/>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-primary">Add Secret</button>
          </div>
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
.flex-fill {
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
}
</style>