<template>
    <div>
        <h1>Client Properties View</h1>
        <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Type</td>
          <td>Value</td>
          <td><a href="#">delete</a></td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-header">Client Properties</div>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="form-group flex-fill">
            <label for="key">Key</label>
            <input type="text" id="key" class="form-control" />
          </div>
          <div class="form-group flex-fill">
            <label for="value">Value</label>
            <input type="text" id="value" class="form-control" />
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-primary">Add Client Property</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        dependencies: [],
        setup() {},
        created(){},
        mounted() {},
        data() {
            return {
                index: 0
            }
        },
        methods: {

        },
        watch: {
            index() {
                console.log(this.index);
            }
        }

    }
</script>
<style lang="scss">
</style>