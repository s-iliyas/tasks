import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { GraphQLError } from "graphql";

import User from "../../models/user";
import config from "../../config";
import verifyToken from "../../helpers/verifyToken";

interface Login {
  email: string;
  password: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const login = async (_: any, data: Login) => {
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
      const hashedPassword = await bcrypt.compare(
        data?.password,
        user[0].password
      );

      if (!hashedPassword) {
        throw new GraphQLError("Password does not match");
      }

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

export const updateUser = async (
  _: any,
  data: { email: string },
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  // Validate the email address
  if (!emailRegex.test(data?.email)) {
    throw new GraphQLError("Invalid email address");
  }
  try {
    await User.updateOne({ _id: decoded?.userId }, data);
    const user = await User.find({ _id: decoded?.userId });
    return user[0];
  } catch (error) {
    console.log("[UPDATE_USER_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};

export const deleteUser = async (
  _: any,
  __: any,
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    const result = await User.deleteOne({ _id: decoded?.userId  });
    if (result.deletedCount === 1) {
      return decoded?.userId;
    } else {
      throw new GraphQLError("No such user.", {
        extensions: {
          code: "BAD_REQUEST",
          http: { status: 400 },
        },
      });
    }
  } catch (error) {
    console.log("[DELETE_USER_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};
