const users = new UsersList(); 
users.add({ name: "次郎", age: 28 });
users.add({ name: "花子", age: 25 });

const usersListView = new UsersListView({ collection: users });
$('body').append(usersListView.render().el);
