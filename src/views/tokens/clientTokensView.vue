
<template>
  <div class="container">
    <div class="form-group">
      <label for="clientId">Client Id</label>
      <select
        name="clientId"
        id="clientId"
        class="form-select"
        v-model="model.clientId"
        @change="clientIdChanged"
      >
        <option v-for="item in clients" :key="item.clientId">
          {{ item.clientId }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="requiredScope">Required Scope</label>
      <div class="d-flex justify-content-between">
        <div class="flex-grow-1">
          <select
            name="requiredScope"
            id="requiredScope"
            class="form-select"
            v-model="focusedScope"
          >
            <option v-for="item in scopes" :key="item.scope">
              {{ item.scope }}
            </option>
          </select>
        </div>

        <div class="buttons flex-grow-0">
          <button class="btn btn-primary" @click="addFocusedScope">Add</button>
          <button class="btn btn-primary" @click="addAllAvailableScopes">
            Add All
          </button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <div class="flex-grow-1">
          <select
            name="requiredScopes"
            id="requiredScopes"
            class="form-select"
            v-model="selectedScopes"
            multiple
          >
            <option v-for="item in availableScopes" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="buttons flex-grow-0 align-self-end">
          <button class="btn btn-danger" @click="removeSelectedScope">
            Remove Selected
          </button>
          <button class="btn btn-danger" @click="removeAllSelectedScopes">
            Clear
          </button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="clientSecret">Client Secret</label>
      <div class="d-flex">
        <div class="flex-grow-1">
          <input
            type="password"
            id="clientSecret"
            class="form-control"
            v-model="model.secret"
          />
        </div>
        <div class="buttons flex-grow-0">
          <button class="btn btn-primary" @click="createToken">
            Create Token
          </button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="token">Token</label>
      <textarea
        type="text"
        id="token"
        class="form-control"
        v-model="token"
      ></textarea>
    </div>

    <div class="d-flex justify-content-end submit-button">
      <button class="btn btn-primary" type="button" @click="copyToken">
        Copy
      </button>
      <button class="btn btn-secondary" type="button" @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>
<script>

/* eslint-disable no-debugger */
export default {
  dependencies: [
    "ValidationService",
    "ApiResourceService",
    "ClientService",
    "ApiScopesService",
    "ToastService",
    "SpinnerService",
    "TokenService",
  ],

  async mounted() {
    await this.loadClients();
  },
  data() {
    return {
      clients: [],
      scopes: [],
      focusedScope: null,
      availableScopes: [],
      selectedScopes: [],
      token: "",
      model: {
        clientId: "",
        secret: "",
      },
    };
  },
  methods: {
    async loadClients() {
      try {
        this.SpinnerService.show();
        this.clients = await this.ClientService.getClients();
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    clientIdChanged() {
      let clientId = this.model.clientId;
      this.reset();
      this.model.clientId = clientId;
      this.loadScopes();
    },
    loadScopes() {
      try {
        let clients = this.clients.filter(
          (c) => c.clientId == this.model.clientId
        );
        this.scopes = clients[0].allowedScopes;
      } catch (error) {
        this.ToastService.error(error);
      }
    },
    addFocusedScope() {
      try {
        if (!this.focusedScope) return;
        if (this.availableScopes.some((c) => c == this.focusedScope)) return;
        this.availableScopes.push(this.focusedScope);
      } catch (error) {
        this.ToastService.error(error);
      }
    },
    addAllAvailableScopes() {
      this.availableScopes = [];
      this.scopes.forEach((entity) => this.availableScopes.push(entity.scope));
    },
    removeSelectedScope() {
      this.selectedScopes.forEach((scope) => {
        let index = this.availableScopes.indexOf(scope);
        if (index > -1) {
          this.availableScopes.splice(index, 1);
        }
      });

      //this.availableScopes = this.availableScopes.filter(c=> c.id !== this.selectedScope.id)
    },
    removeAllSelectedScopes() {
      this.availableScopes = [];
    },
    async createToken() {
      //console.log(this.availableScopes.join(","))
      let model = {
        selectedScopes: this.availableScopes,
        clientId: this.model.clientId,
        secret: this.model.secret,
      };
      this.token = await this.TokenService.getToken(model);
    },
    async copyToken() {
      let data = [
        new window.ClipboardItem({
          "text/plain": new Blob([`Bearer ${this.token}`], {
            type: "text/plain",
          }),
        }),
      ];
      await navigator.clipboard.write(data);
      this.ToastService.success("Copied Token");
    },
    reset() {
      this.scopes = [];
      this.focusedScope = null;
      this.availableScopes = [];
      this.selectedScopes = [];
      this.token = "";
      this.model.secret = "";
      this.model.clientId = "";
    },
  },
};
</script>
<style lang="scss">
.buttons {
  button {
    width: 150px;
  }
  button:first-of-type {
    margin: 0 5px;
  }
}
</style>