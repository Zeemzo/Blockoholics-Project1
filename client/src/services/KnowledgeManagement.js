import { dappBackend } from "variables/constants";
import axios from "axios";
import {getUserSession} from "./UserManagement"
export async function getInitiativeById(id) {
  try {
    const res = await axios.get(dappBackend + `/initiatives/${id}`, {
      headers: {
        // 'Authorization': "bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (res != null) {
      switch (res.status) {
        case 200:
          return res.data.data;
        case 201:
          return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function getInitiatives() {
  try {
    const res = await axios.get(dappBackend + `/initiatives`, {
      headers: {
        // 'Authorization': "bearer " + token,
        "Content-Type": "application/json"
      }
    });

    if (res != null) {
      switch (res.status) {
        case 200:
          return res.data.data;
        case 201:
          return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function searchDapps(searchObject) {
  try {
    const { key, type, typeKey } = searchObject;
    const res = await axios.get(
      dappBackend +
      `/api/search?key=${key}&type=${type != undefined ? type : ""}&typeKey=${
      typeKey != undefined ? typeKey : ""
      }`,
      {
        headers: {
          // 'Authorization': "bearer " + token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    if (res != null) {
      switch (res.status) {
        case 200:
          return res;
        case 201:
          return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
/**
 * @desc
 * @param object
 * @author Azeem Ashraf azeemashraf@outlook.com
 * @return
 */
export async function addInitiative(body) {
  try {
    let user = getUserSession()
    let token;
    if (localStorage.getItem("token") != null) {
      token = localStorage.getItem("token");
    }
    body.creator = user.publicKey;
    // return postBody
    const res = await axios.post(dappBackend + "/initiatives", body, {
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json"
      }
    });

    if (res != null) {
      if (res.status == 200) {
        return res;
      } else {
        return res;
      }
    } else {
      return null;
    }
  } catch (err) {
    //console.log(err);
    return null;
  }
}

export async function getRating(id) {
  try {
    let token;
    if (localStorage.getItem("token") != null) {
      token = localStorage.getItem("token");
    }
    const res = await axios.get(dappBackend + `/api/rating/${id}`, {
      headers: {
        // 'Authorization': "bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (res != null) {
      switch (res.status) {
        case 200:
          return res;
        case 201:
          return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function addRating(body) {
  try {
    let token;
    if (localStorage.getItem("token") != null) {
      token = localStorage.getItem("token");
    }
    // return postBody
    const res = await axios.post(dappBackend + "/api/rating", body, {
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (res != null) {
      if (res.status == 200) {
        return res;
      } else {
        return res;
      }
    } else {
      return null;
    }
  } catch (err) {
    //console.log(err);
    return null;
  }
}

export async function getViews(id) {
  try {
    const res = await axios.get(dappBackend + `/api/dapps/ping/${id}`, {
      headers: {
        // 'Authorization': "bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (res != null) {
      switch (res.status) {
        case 200:
          return res;
        case 201:
          return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
