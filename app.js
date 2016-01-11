let UserList = Vue.extend({
  template: '#user-list-template',
  data: function() {
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
    }
  },
  methods: {
    createUser: function() {
      this.$root.users.push(this.newUser);
      // Reset newUser
      this.newUser = {
        login: "",
        password: "",
        fullname: "",
        email: "",
        roles: []
      }
    },
    openEditPane: function(index) {
      this.editing.status = true;
      this.editing.index = index;
    },
    closeEditPane: function() {
      this.editing.status = false;
    },
    deleteUser: function(index) {
      this.$root.users.splice(index, 1);
    }
  }
});

let UserRegistration = Vue.extend({
  template: '#user-registration-template',
  data: function() {
    return {
      newRegister: {
        login: "",
        fullname: "",
        email: "",
        roles: []
      }
    }
  },
  methods: {
    registerUser: function() {
      this.$root.users.push(this.newRegister);
      this.newRegister = {
        login: "",
        password: "",
        fullname: "",
        email: "",
        roles: []
      }
      window.location.hash = "#!/";
    }
  }
});

let App = Vue.extend({
  data: function() {
    return {
      users: [
        {
          login: "nathan",
          fullname: "Nathan Leung",
          email: "me@nathanhleung.com",
          roles: ["student", "mentor"]
        }
      ]
    }
  }
});
let router = new VueRouter();

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

router.start(App, '#usersApp')
