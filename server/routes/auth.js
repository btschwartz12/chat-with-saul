import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    const errorMessage = error.response?.status === 401
      ? "Invalid username or password"
      : "An error occurred. Please try again later.";
    res.status(500).json({ error: errorMessage });
  }
});
// HERE maybe just have token here and get the user and secret from the token

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error.message);
    const errorMessage = error.response?.status === 400
      ? "Username already exists"
      : "An error occurred. Please try again later.";
    res.status(500).json({ error: errorMessage });
  }
});
router.post("/tokenlogin", async (req, res) => {
  try {
    const { token } = req.body;


    const blissResponse = await axios.get(
      "https://btschwartz.com/api/v1/chat/saul/auth",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );


    // will return json with fields message, username, secret, and avatar

    const { message, username, password, avatar } = blissResponse.data;


    if (message === "found") {
      const chatEngineResponse = await axios.get(
        "https://api.chatengine.io/users/me",
        {
          headers: {
            "Project-ID": process.env.PROJECT_ID,
            "User-Name": username,
            "User-Secret": password,
          },
        }
      );
      res.status(200).json({ username: username, secret: password, avatar: avatar, response: chatEngineResponse.data });
    }
    else if (message === "created") {
      const chatEngineResponse = await axios.post(
        "https://api.chatengine.io/users/",
        {
          username: username,
          secret: password,
        },
        {
          headers: { "Private-Key": process.env.PRIVATE_KEY },
        }
      );
      res.status(200).json({ username: username, secret: password, avatar: avatar, response: chatEngineResponse.data });
          
    } else {
      res.status(400).json({ error: 'Unexpected message value' });
    }
  } catch (error) {
    console.error("error", error.message);
    let errorMessage = "An error occurred. Please try again later.";

    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = "Username already exists";
      } else if (error.response.data) {
        errorMessage = error.response.data;
      }
    }
    res.status(500).json({ error: errorMessage });
  }
});

export default router;