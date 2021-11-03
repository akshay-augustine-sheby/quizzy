const setToLocalStorage = ({
  authToken,
  authEmail,
  userId,
  userFirstName,
  userLastName,
}) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(authEmail));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserFirstName", JSON.stringify(userFirstName));
  localStorage.setItem("authUserLastName", JSON.stringify(userLastName));
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
