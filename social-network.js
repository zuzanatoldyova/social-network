var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

// List everyone and for each of them, list the names of who they follow and who follows them
function printUsers(){
  for (var user in data){
    var following = follows(user).map(getName);
    var followers = followingMe(user).map(getName);
    console.log(data[user].name);
    console.log("Follows: ", following);
    console.log("Followers: ", followers);
  }

}
 // Returns array of names of people who are following user
 // Can use property age to return users above certain age
function followingMe(myId){
  var followers = [];
  for (var user in data){
    var userObject = data[user];
    if (userObject.follows.some(x => x === myId)){
      followers.push(user);

    }
  }
  return followers;
}

// Returns array of names of people that user is following
// Can use property age to return above certain age
function follows(userId){
  var follows = [];
  data[userId].follows.forEach(x =>
    follows.push(x)
  );
  return follows;
}
// printUsers();

function filterAboveAge(arrayOfUsers, age){
  var filteredUsers = arrayOfUsers.slice();
  filteredUsers.forEach(function(x) {
    if (x.age <= age) {
      filteredUsers.pop(x);
    }
  });
  return filteredUsers;
}

// Identify who follows or is being followed by the most people, can return more users
// Takes function returning an array
// Can also identify most follower/following above certain age
function most(fn){
  var arrayOfFollowing = [];
  var winners = [];
  for (var user in data){
    if(fn(user).length > arrayOfFollowing.length){
      arrayOfFollowing = fn(user);
      winners = [];
      winners.push(data[user].name);
    }
    else if (fn(user).length === arrayOfFollowing.length){
      winners.push(data[user].name);
    }
  }
  return winners;
}


console.log(most(follows));
console.log(followingMe("f01", 30).map(getName));
console.log(follows("f04", 30).map(getName));

// Identify who has the most followers over 30
// Identify who follows the most people over 30
// Can be done using functions above

// List those who follow someone that doesn't follow them back
function notFollowingBack(userId){
  var output = [];
  var following = follows(userId);
  following.forEach(function(x){
    if (!followingMe(userId).some(y => x === y)){
      output.push(x);
    }
  });
  return output.map(getName);
}

// console.log(notFollowingBack("f04"));

function getName(userId){
  return data[userId].name;
}
// List everyone and their reach (sum of # of followers and # of followers of followers)
function printReach(){
  for (var user in data){
    var second = 0;
    var followers = followingMe(user);
    console.log(`${data[user].name} has ${followers.length} followers`);
    followers.forEach(function(x){
      var followerObject = data[x];
      second += followingMe(x).length;
    });
    console.log(`And ${second} followers of followers.`);
  }
}

// printReach();