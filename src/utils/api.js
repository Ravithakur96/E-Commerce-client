import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) => {
  try {
    const token = localStorage.getItem("accesstoken");

    const response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accesstoken");

    const params = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};



export const uploadImage = async (url, updateData) => {
  const token = localStorage.getItem("accesstoken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await axios.put(apiUrl + url, updateData, params);
  return { data };
};

export const editData = async (url, updateData) => {
  const token = localStorage.getItem("accesstoken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.put(apiUrl + url, updateData, params);
  return { data };
};

export const deleteData = async (url) => {
  try {
    const res = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },

    });

    return res.data;
  } catch (error) {
    console.error("Delete Error:", error);
    return error?.response?.data;
  }
};



export const putData = async (url, updateData) => {
  const token = localStorage.getItem("accesstoken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.put(apiUrl + url, updateData, params);
  return data;
};
