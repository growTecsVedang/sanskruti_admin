import getRole from "../helper/getRole";

function generateDataForPieChart(user) {
  let objectArray = [
    { Role: "USER", value: 0 },
    { Role: "ADMIN", value: 0 },
    { Role: "SUPERADMIN", value: 0 },
    { Role: "BANNED", value: 0 },
  ];
  for (const i of user) {
    for (const j of objectArray) {
      if (j.Role === getRole(i.role)) {
        j.value++;
      }
    }
  }
  return objectArray;
}

export default generateDataForPieChart;
