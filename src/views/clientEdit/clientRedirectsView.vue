<template>
  <div>
    <h1>Client Redirects View</h1>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Redirect Uri</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>22</td>
          <td>https://localhost:5002/signin-oidc</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>23</td>
          <td>
            https://its-idmtst-web.adtest.unc.edu/client/self-service/signin-oidc
          </td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>24</td>
          <td>http://localhost:8080/call-back.html</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>25</td>
          <td>
            https://its-idmtst-web.adtest.unc.edu/client/self-service/call-back.html
          </td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>26</td>
          <td>https://selfservicetest.unc.edu/call-back.html</td>
          <td><a href="#">delete</a></td>
        </tr>
        <tr>
          <td>27</td>
          <td>https://selfservicetest.unc.edu/silent-refresh.html</td>
          <td><a href="#">delete</a></td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-header">Add Client Redirect Uri</div>
      <div class="card-body">
        <div class="d-flex justify-content-between">
            <div class="flex-fill">
                <div class="form-group">                                 
                <label for="clientRedirectUri">Url</label>
                <input
                  type="text"
                  id="clientRedirectUri"
                  class="form-control"
                />
                </div>
            </div>
            
        </div>
        <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-primary">Add Redirect Uri</button>
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