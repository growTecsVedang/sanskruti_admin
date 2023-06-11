const user_secret =
  "64b7fdbc-ced4-11ed-afa1-0242ac120002e63ec4c8-3227-4475-9cd6-77814eda66e4";
const admin_secret =
  "64b8017c-ced4-11ed-afa1-0242ac1200021ea82ef3-7fe9-4f3e-8446-c384d099df23";
const superadmin_secret =
  "64b804ba-ced4-11ed-afa1-0242ac12000295f9aee0-7b7f-43fb-9665-005a22528530";

const decodeRole = (roleSecret) => {
  if (roleSecret === "USER") return user_secret;
  if (roleSecret === "ADMIN") return admin_secret;
  if (roleSecret === "SUPERADMIN") return superadmin_secret;
  return undefined;
};

export default decodeRole;
