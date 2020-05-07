import * as mongodb from "../utils/mongodb";
import { APIGatewayEvent } from "aws-lambda";
import { ObjectId, Cursor } from "mongodb";
import { tokenViewer } from "../user/handler";
import { User, Initiative, KYC } from "../models/user.model";
import sha256 from "sha256";

const dbName = process.env.db_name;

export class UserRepository {
  public static async getUserById(id: string, token: any) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }
      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      const cursor = await page.aggregate([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: "kyc",
            localField: "publicKey",
            foreignField: "publicKey",
            as: "kycList",
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        let user = item;
        user.kyc = item.kycList.length > 0 ? "Pending" : null;
        if (item.kycList.length > 0 && item.kycList[0].approved) {
          user.kyc = "Approved";
        }
        delete user["kycList"]
        result.push(user);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }

  public static async getUserByAlias(alias: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      const cursor = await page.aggregate([
        {
          $match: {
            alias: alias,
          },
        },
        {
          $lookup: {
            from: "kyc",
            localField: "publicKey",
            foreignField: "publicKey",
            as: "kycList",
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        let user = item;
        user.kyc = item.kycList.length > 0 ? "Pending" : null;
        if (item.kycList.length > 0 && item.kycList[0].approved) {
          user.kyc = "Approved";
        }
        delete user["kycList"]
        result.push(user);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }
  public static async getUserByEmail(email: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      const cursor = await page.aggregate([
        {
          $match: {
            email: email,
          },
        },
        {
          $lookup: {
            from: "kyc",
            localField: "publicKey",
            foreignField: "publicKey",
            as: "kycList",
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        let user = item;
        user.kyc = item.kycList.length > 0 ? "Pending" : null;
        if (item.kycList.length > 0 && item.kycList[0].approved) {
          user.kyc = "Approved";
        }
        delete user["kycList"]
        result.push(user);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }

  public static async getUserByPublicKey(publicKey: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      const cursor = await page.aggregate([
        {
          $match: {
            publicKey: publicKey,
          },
        },
        {
          $lookup: {
            from: "kyc",
            localField: "publicKey",
            foreignField: "publicKey",
            as: "kycList",
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        let user = item;
        user.kyc = item.kycList.length > 0 ? "Pending" : null;
        if (item.kycList.length > 0 && item.kycList[0].approved) {
          user.kyc = "Approved";
        }
        delete user["kycList"]
        result.push(user);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }

  public static async addUser(user: User) {
    const schema: User = user;
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }
      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      schema.verified = false;
      schema.type = "2";
      schema.createdAt = new Date().toISOString();
      schema._id = new ObjectId().toHexString();
      const dbResponse = await page.insertOne(schema);

      return {
        code: 200,
        message: "success",
        data: dbResponse ? schema : null,
      };
      // }
    } catch (e) {
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async addKYC(kyc: KYC) {
    const schema: KYC = kyc;
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }
      const db = mongodb.client.db(dbName);
      const page = db.collection("kyc");

      schema.approved = false;
      schema.createdAt = new Date().toISOString();
      schema._id = new ObjectId().toHexString();
      const dbResponse = await page.insertOne(schema);

      return {
        code: 200,
        message: "success",
        data: dbResponse ? schema : null,
      };
      // }
    } catch (e) {
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async getKYCByPublicKey(publicKey: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("kyc");

      const cursor = await page.aggregate([
        {
          $match: {
            publicKey: publicKey,
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        result.push(item);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }

  public static async editUser(email: string, user: User) {
    // const schema = JSON.parse(event.body).data;
    const schema: User = user;

    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("user");
      schema.updatedAt = new Date().toISOString();

      const dbResponse = await page.updateOne(
        { email: email },
        {
          $set: schema,
          // $currentDate: { lastModified: true }
        }
      );
      return {
        code: 200,
        message: "success",
        data: dbResponse ? schema : null,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async deleteUser(email: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("page");
      return {
        code: 200,
        message: "success",
        data: (await page.findOneAndDelete({ email: email }))
          ? { email: email }
          : null,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async listUsers() {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return { status: e };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("user");

      const cursor = await page.aggregate([
        {
          $match: {
            verified: true,
          },
        },
      ]);
      // .limit(20);
      let result = [];
      await cursor.forEach((item) => {
        result.push({
          _id: item._id,
          alias: item.alias,
          email: item.email,
          publicKey: item.publicKey,
        });
      });

      // console.log(result);
      return {
        code: 200,
        message: "",
        data: result,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }
  public static async addInitiative(initiative: Initiative) {
    const schema: Initiative = initiative;
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }
      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");

      schema.createdAt = new Date().toISOString();
      schema._id = new ObjectId().toHexString();
      const dbResponse = await page.insertOne(schema);
      return {
        code: 200,
        message: "success",
        data: dbResponse ? schema : null,
      };
      // }
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async editInitiative(id: string, initiative: Initiative) {
    // const schema = JSON.parse(event.body).data;
    const schema: Initiative = initiative;

    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");
      schema.updatedAt = new Date().toISOString();

      const dbResponse = await page.updateOne(
        { _id: id },
        {
          $set: schema,
          // $currentDate: { lastModified: true }
        }
      );
      return {
        code: 200,
        message: "success",
        data: dbResponse ? schema : null,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async deleteInitiative(id: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");
      return {
        code: 200,
        message: "success",
        data: (await page.findOneAndDelete({ _id: id })) ? { _id: id } : null,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: e.errmsg,
        data: null,
      };
    }
  }

  public static async listInitiatives() {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return { status: e };
        }
      }

      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");

      const cursor = await page.find({});
      // .limit(20);
      let result = [];
      await cursor.forEach((item) => {
        result.push(item);
      });

      // console.log(result);
      return {
        code: 200,
        message: "",
        data: result,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }
  public static async getInitiative(id: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }

      // let userId = "";
      // if (token != null) {
      //   userId = token.sub;
      // }

      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");

      const cursor = await page.aggregate([
        {
          $match: {
            _id: id,
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        result.push(item);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[0] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }

  public static async getInitiativeByOwner(publicKey: string) {
    try {
      if (!mongodb.client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
          await mongodb.createConn();
        } catch (e) {
          return {
            code: 500,
            message: e,
            data: null,
          };
        }
      }
      const db = mongodb.client.db(dbName);
      const page = db.collection("initiative");

      const cursor = await page.aggregate([
        {
          $match: {
            creator: publicKey,
          },
        },
      ]);

      let result = [];
      await cursor.forEach((item) => {
        result.push(item);
      });
      return {
        code: 200,
        message: "",
        data: result.length > 0 ? result[result.length - 1] : null,
      };
    } catch (e) {
      return {
        code: 400,
        message: "failed",
        data: null,
      };
    }
  }
}
