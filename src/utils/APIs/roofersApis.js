import axios from 'axios';
import { authorizeMe, axiosInstance, axiosInstanceNoAuth } from './commonHeadApiLogic.js';

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};


export async function getEmployerAPI(token) {
      return withAuthorization(async () => {

  return axiosInstance.get("/api/admin/workers", {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",    // required for ngrok
    }
      });

  });
}

export async function getContractorAPI(token) {
      return withAuthorization(async () => {

  return axiosInstance.get("/api/admin/workers", {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",    // required for ngrok
    }
      });

  });
}


export async function EditContractorRequestAPI(token) {
      return withAuthorization(async () => {

  return axiosInstance.patch("/api/admin/workers", {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",    // required for ngrok
    }
      });

  });
}




// export async function dashboardDataAPI() {
//   return withAuthorization(async () => {
//     const response = await axiosInstance.get("/user/get_dashboard_data_api");
//     return response;
//   });
// }


export async function createNewAccountAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/create_an_account", data);
    return response;
  });
}

export async function updateProfileAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/user/account_update_", data);
    return response;
  });
}

export async function updatePasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/account_update_pass_reset", data);
    return response;
  });
}

export async function dashboardDataAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/user/get_dashboard_data_api");
    return response;
  });
}
