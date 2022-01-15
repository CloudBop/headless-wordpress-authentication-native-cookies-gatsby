import * as React from "react";
import { Link } from "gatsby";

import { useUser } from "../hooks/useUser";

export default function Nav() {
  const { user } = useUser();
  // console.log(`user`, user);
  // console.log(`!!user`, !!user);
  return (
    <nav>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user?.viewer ? (
          <>
            <li>
              <Link to="/log-in">Log In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link to="/query-demo">RQ-demo</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/members">Members</Link>
            </li>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              {/* <Link to="/log-out-apollo">Log Out</Link> */}
              <Link to="/log-out-rq">Log Out rq</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
