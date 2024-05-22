import React from "react";
// const user = {
//   isAdmin: true,
//   name: "Christian",
// };
function UserAccount({user}) {
  return (
    <>
      <h1>Hey</h1>
      <h2>User profile</h2>
      {user?.isAdmin && <button>Edit</button>}
      <div>
        <strong>Name: </strong>
        {user.name}
      </div>
    </>
  );
}

export default UserAccount;
