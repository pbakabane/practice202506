const users = new UserList(); 
users.add({ name: "次郎", age: 28 ,sex: "男"});
users.add({ name: "花子", age: 25 ,sex: "女"});

const userListView = new UserListView({ collection: users });
$('body').append(userListView.render().el);
