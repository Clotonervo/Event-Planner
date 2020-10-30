import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../../../services/fetchWrapper";

/* Redirects to login page if user isn't authenticated.
 * This is really basic and only checks for the existence of the access-token.
 */
const PageAccess = () => {
  const [hasAccess, setHasAccess] = useState(true);
  useEffect(() => {
    setHasAccess(isLoggedIn());
  }, []);
  return <>{!hasAccess && <Redirect to="/login" />}</>;
};

export default PageAccess;
