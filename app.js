"use strict";

var UserList = Vue.extend({
  template: '#user-list-template',
  data: function data() {
    return {
      editing: {
        status: false,
        index: 0
      },
      // Define newUser schema
      newUser: {
        login: "",
        fullname: "",
        email: "",
        roles: [] // This is important - shows Vue that multiple checkboxes can be binded (since it's an array)
      }
    };
  },
  methods: {
    createUser: function createUser() {
      this.$root.users.push(this.newUser);
      // Reset newUser
      this.newUser = {
        login: "",
        password: "",
        fullname: "",
        email: "",
        roles: []
      };
    },
    openEditPane: function openEditPane(index) {
      this.editing.status = true;
      this.editing.index = index;
    },
    closeEditPane: function closeEditPane() {
      this.editing.status = false;
    },
    deleteUser: function deleteUser(index) {
      this.$root.users.splice(index, 1);
    }
  }
});

var UserRegistration = Vue.extend({
  template: '#user-registration-template',
  data: function data() {
    return {
      newRegister: {
        login: "",
        fullname: "",
        email: "",
        roles: []
      }
    };
  },
  methods: {
    registerUser: function registerUser() {
      this.$root.users.push(this.newRegister);
      this.newRegister = {
        login: "",
        password: "",
        fullname: "",
        email: "",
        roles: []
      };
      window.location.hash = "#!/";
    }
  }
});

var App = Vue.extend({
  data: function data() {
    return {
      users: [{
        login: "nathan",
        fullname: "Nathan Leung",
        email: "me@nathanhleung.com",
        roles: ["student", "mentor"]
      }]
    };
  }
});
var router = new VueRouter();

router.map({
  '/': {
    component: UserList
  },
  '/register': {
    component: UserRegistration
  }
});

router.redirect({
  '*': '/'
});

router.start(App, '#usersApp');