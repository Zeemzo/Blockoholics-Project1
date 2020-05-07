import { APIGatewayEvent, Context } from "aws-lambda";
import { UserService } from "./user.service";
import { createResponse } from "../utils/response-generator";
import { logger } from "../utils/logger";
import * as jwt from "jsonwebtoken";
import {
  loginSchema,
  registerSchema,
  loginWithSecretSchema,
  editUserSchema,
  addInitiativeSchema,
  editInitiativeSchema,
  fundTranasctionSchema,
  addKYCSchema,
} from "../models/user.model";

export const tokenViewer = (event: APIGatewayEvent) => {
  if (typeof event.headers.Authorization === "undefined") {
    return null;
  }
  const split = event.headers.Authorization.split(" ");
  if (split.length !== 2) {
    return null;
  }
  const token = split[1].trim();
  const tokenPayload = jwt.verify(token, "ijk3dp4n");
  if (tokenPayload) {
    return tokenPayload;
  }
};

export const authMiddleware = (
  event: APIGatewayEvent,
  roles: Array<string>
) => {
  try {
    if (typeof event.headers.Authorization === "undefined") {
      return {
        code: 401,
        message: "authorization token is missing",
        data: null,
      };
    }
    const split = event.headers.Authorization.split(" ");
    if (split.length !== 2) {
      return {
        code: 401,
        message: "authorization token is invalid",
        data: null,
      };
    }
    const token = split[1].trim();
    const tokenPayload = jwt.verify(token, "ijk3dp4n");
    if (tokenPayload) {
      if (roles.indexOf(tokenPayload["type"]) > -1) {
        return {
          code: 200,
          message: "authorized",
          data: tokenPayload,
        };
      } else {
        return {
          code: 401,
          message: "action permission denied",
          data: null,
        };
      }
    }
  } catch (err) {
    return {
      code: 401,
      message: err.message,
      data: null,
    };
  }
};

export const login = async (event: APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await loginSchema.validateAsync(JSON.parse(event.body));

    const response = await UserService.login(event);

    logger.info("success!");
    return createResponse(response.code, response);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const xdrLogin = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await loginWithSecretSchema.validateAsync(JSON.parse(event.body));

    const post = await UserService.xdrLogin(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const register = async (event: APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await registerSchema.validateAsync(JSON.parse(event.body));

    let post = await UserService.register(event);
    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const getAccount = async (event: APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    let post = await UserService.getAccount(event);
    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const searchAccounts = async (event: APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    let post = await UserService.searchAccounts(event);
    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};


export const editInitiative = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    await editInitiativeSchema.validateAsync(JSON.parse(event.body));

    let post = await UserService.editInitiative(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const deleteInitiative = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }

    let post = await UserService.deleteInitiative(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const getInitiative = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
  
    let post = await UserService.getInitiative(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const listInitiatives = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {

    let post = await UserService.listInitiatives(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const searchInitiatives = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {

    let post = await UserService.searchInitiatives(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const addInitiative = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    await addInitiativeSchema.validateAsync(JSON.parse(event.body));

    let post = await UserService.addInitiative(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};


export const fundTransaction = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    await fundTranasctionSchema.validateAsync(JSON.parse(event.body));

    let post = await UserService.fundTransaction(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};

export const addKYC = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const auth = await authMiddleware(event, ["1", "2", "3", "4", "5"]);
    if (auth.data == null) {
      return createResponse(auth.code, auth);
    }
    await addKYCSchema.validateAsync(JSON.parse(event.body));

    let post = await UserService.addKYC(event);

    logger.info("success!");
    return createResponse(post.code, post);
  } catch (error) {
    logger.error(error);
    return createResponse(HTTPStatusCodes.BAD_REQUEST, {
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  } finally {
    logger.info("connection closed");
  }
};