import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { GraphQLError } from "graphql";

import User from "../../models/user";
import config from "../../../config";

interface Login {
  email: string;
  password: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const login = async (_: any, data: Login) => {
  // Validate the email address
  if (!emailRegex.test(data.email)) {
    throw new GraphQLError("Invalid email address");
  }

  // Validate the password
  if (data.password.length < 6) {
    throw new GraphQLError(
      "Password must be a string with at least 6 characters"
    );
  }

  try {
    let user = await User.find({ email: data?.email });
    let response: { token: string };
    if (user.length < 1) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data?.password, salt);
      const newUser = await User.create({
        email: data?.email,
        password: hashedPassword,
      });
      response = {
        token: jwt.sign({ userId: newUser._id }, config.SECRET_KEY, {
          expiresIn: "1d",
        }),
      };
    } else {
      response = {
        token: jwt.sign({ userId: user[0]?._id }, config.SECRET_KEY, {
          expiresIn: "1d",
        }),
      };
    }
    return response;
  } catch (error) {
    console.log("[LOGIN_ERROR]", error.message);
    throw new GraphQLError(error.message);
  }
};

export default login;
