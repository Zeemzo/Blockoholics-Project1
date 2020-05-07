import { APIGatewayEvent } from "aws-lambda";
import * as FuzzySearch from "fuzzy-search";
import { UserRepository } from "../repository/user.repository";
import AWS from "aws-sdk";
import uuid from "uuid";
import Fuse from "fuse.js";
import axios from "axios";
import StellarSdk, { Keypair, Transaction } from "stellar-sdk";
import { AES, enc } from "crypto-js";
import * as jwt from "jsonwebtoken";
import { tokenViewer } from "./handler";
StellarSdk.Network.useTestNetwork();

function decyrptSecret(secret: any, signer: any) {
  try {
    const decrypted = AES.decrypt(secret, signer);
    const plaintext = decrypted.toString(enc.Utf8);
    return plaintext;
  } catch (error) {
    return null;
  }
}
export class UserService {
  public static async login(event: APIGatewayEvent) {
    try {
      const requestBody = JSON.parse(event.body);

      let user = await UserRepository.getUserByEmail(requestBody.key);
      if (user.data == null) {
        user = await UserRepository.getUserByAlias(requestBody.key);
        if (user.data == null) {
          return {
            code: 201,
            message: "account not found",
            data: null,
          };
        }
      }

      const secret = decyrptSecret(
        user.data.encryptedSecret,
        requestBody.password
      );
      if (user.data.publicKey == Keypair.fromSecret(secret).publicKey()) {
        let tokenBody = user.data;
        tokenBody.exp = Math.floor(new Date().getTime() / 1000.0) + 12000;
        var token = jwt.sign(tokenBody, process.env.jwt_secret);
        return {
          code: 200,
          message: "success",
          data: { token: token },
        };
      } else {
        return {
          code: 202,
          message: "password is incorrect",
          data: null,
        };
      }
    } catch (err) {
      return {
        code: 202,
        message: "password is incorrect",
        data: null,
      };
    }
  }

  public static async xdrLogin(event: APIGatewayEvent) {
    try {
      var server = new StellarSdk.Server(process.env.StellarUrl);
      const requestBody = JSON.parse(event.body);
      const parsedTx = new Transaction(requestBody.xdr);
      let publicKey = parsedTx.source;

      let user = await UserRepository.getUserByPublicKey(publicKey);
      if (user.data == null) {
        return {
          code: 201,
          message: "account not found",
          data: null,
        };
      }

      let humanKeypair = Keypair.fromSecret(process.env.HumanDistributorSecret);
      parsedTx.sign(humanKeypair);
      // let x = parsedTx.toEnvelope().toXDR().toString("base64");

      const stellarResponse = await server.submitTransaction(parsedTx);
      if (stellarResponse == null) {
        return {
          code: 202,
          message: "insufficient fund in account",
          data: null,
        };
      }
      let tokenBody = user.data;
      tokenBody.exp = Math.floor(new Date().getTime() / 1000.0) + 12000;
      var token = jwt.sign(tokenBody, process.env.jwt_secret);
      return {
        code: 200,
        message: "success",
        data: { token: token },
      };
    } catch (err) {
      return {
        code: 202,
        message: "secretKey is incorrect",
        data: null,
      };
    }
  }

  public static async register(event: APIGatewayEvent) {
    try {
      const requestBody = JSON.parse(event.body);
      if (requestBody.authType == 0) {
        let existingEmailUser = await UserRepository.getUserByEmail(
          requestBody.email
        );
        if (existingEmailUser.data != null) {
          return {
            code: 201,
            message: "email already used",
            data: null,
          };
        }
      }

      let existingAliasUser = await UserRepository.getUserByAlias(
        requestBody.alias
      );
      if (existingAliasUser.data != null) {
        return {
          code: 202,
          message: "alias already used",
          data: null,
        };
      }

      let user = await UserRepository.addUser(requestBody);
      if (user.data != null) {
        let tokenBody = user.data;
        tokenBody.exp = Math.floor(new Date().getTime() / 1000.0) + 12000;
        var token = jwt.sign(tokenBody, process.env.jwt_secret);
        return {
          code: 200,
          message: "success",
          data: { token: token },
        };
      }
    } catch (err) {
      return {
        code: 400,
        message: "registration failed",
        data: null,
      };
    }
  }

  public static async getAccount(event: APIGatewayEvent) {
    try {
      let existingUser = await UserRepository.getUserByPublicKey(
        event.pathParameters.id
      );
      if (existingUser.data == null) {
        return {
          code: 201,
          message: "account not found",
          data: null,
        };
      }
      const tokenPayload = tokenViewer(event);
      if (tokenPayload["publicKey"] != existingUser.data.publicKey) {
        return {
          code: 200,
          message: "success",
          data: {
            publicKey: existingUser.data.publicKey,
            email: existingUser.data.email,
            alias: existingUser.data.alias,
            verified: true,
          },
        };
      }

      return {
        code: 200,
        message: "success",
        data: existingUser.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "retrieving account failed",
        data: null,
      };
    }
  }
  public static async searchAccounts(event: APIGatewayEvent) {
    try {
      let existingUser = await UserRepository.listUsers();
      if (existingUser.data == null) {
        return {
          code: 201,
          message: "accounts not found",
          data: null,
        };
      }

      let response = [];
      if (event.queryStringParameters && event.queryStringParameters.key) {
        const options = {
          useExtendedSearch: true,
          includeScore: false,
          keys: ["alias", "publicKey"],
        };

        // Create a new instance of Fuse
        const fuse = new Fuse(existingUser.data, options);
        // Now search for 'Man'
        const result = fuse.search(event.queryStringParameters.key);

        result.forEach((res) => {
          response.push(res.item);
        });
      } else {
        response = existingUser.data;
      }

      return {
        code: 200,
        message: "success",
        data: response,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 400,
        message: "retrieving accounts failed",
        data: null,
      };
    }
  }

  public static async addInitiative(event: APIGatewayEvent) {
    try {
      const tokenPayload: any = tokenViewer(event);
      if (!tokenPayload.verified) {
        return {
          code: 202,
          message: "kyc approval pending",
          data: null,
        };
      }

      const existingInitiative = await UserRepository.getInitiativeByOwner(
        tokenPayload.publicKey
      );
      if (existingInitiative.data != null) {
        return {
          code: 203,
          message: "You can only create one initiative at a time",
          data: null,
        };
      }

      const requestBody = JSON.parse(event.body);
      // Create unique bucket name
      var bucketName = "corona-client-imagesdev-dev";
      // Create name for uploaded object key
      var keyName = uuid.v4();

      // Create a promise on S3 service object
      var s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });

      let buf = Buffer.from(
        requestBody.cover.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      var data = {
        Bucket: bucketName,
        Key: keyName,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
        ACL: "public-read",
      };
      s3Bucket.putObject(data, function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error uploading data: ", data);
        } else {
          requestBody.cover =
            "https://corona-client-imagesdev-dev.s3.us-east-1.amazonaws.com/" +
            keyName;
          console.log(data);
          console.log("succesfully uploaded the image!");
        }
      });

      let initiative = await UserRepository.addInitiative(requestBody);
      if (initiative.data == null) {
        return {
          code: 201,
          message: "Initiative Creation Failed",
          data: null,
        };
      }
      return {
        code: 200,
        message: "Success",
        data: initiative.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "Initiative Creation Failed",
        data: null,
      };
    }
  }

  public static async editInitiative(event: APIGatewayEvent) {
    try {
      const requestBody = JSON.parse(event.body);

      let existinginitiative = await UserRepository.getInitiative(
        event.pathParameters.id
      );
      if (existinginitiative.data == null) {
        return {
          code: 201,
          message: "initiative not found",
          data: null,
        };
      }
      const tokenPayload = tokenViewer(event);
      if (tokenPayload["publicKey"] != existinginitiative.data.creator) {
        return {
          code: 202,
          message: "you are not the owner",
          data: null,
        };
      }
      let initiative = await UserRepository.editInitiative(
        event.pathParameters.id,
        requestBody
      );
      if (initiative.data == null) {
        return {
          code: 203,
          message: "Initiative Modification Failed",
          data: null,
        };
      }
      return {
        code: 200,
        message: "Success",
        data: initiative.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "Initiative Modification Failed",
        data: null,
      };
    }
  }

  public static async deleteInitiative(event: APIGatewayEvent) {
    try {
      let existinginitiative = await UserRepository.getInitiative(
        event.pathParameters.id
      );
      if (existinginitiative.data == null) {
        return {
          code: 201,
          message: "initiative not found",
          data: null,
        };
      }
      const tokenPayload = tokenViewer(event);
      if (tokenPayload["publicKey"] != existinginitiative.data.creator) {
        return {
          code: 202,
          message: "you are not the owner",
          data: null,
        };
      }
      let initiative = await UserRepository.deleteInitiative(
        event.pathParameters.id
      );
      if (initiative.data == null) {
        return {
          code: 201,
          message: "Initiative Deletion Failed",
          data: null,
        };
      }
      return {
        code: 200,
        message: "Success",
        data: initiative.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "Initiative Deletion Failed",
        data: null,
      };
    }
  }

  public static async getInitiative(event: APIGatewayEvent) {
    try {
      let initiative = await UserRepository.getInitiative(
        event.pathParameters.id
      );
      if (initiative.data == null) {
        return {
          code: 201,
          message: "initiative not found",
          data: null,
        };
      }

      return {
        code: 200,
        message: "Success",
        data: initiative.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "get initiative failed",
        data: null,
      };
    }
  }
  public static async listInitiatives(event: APIGatewayEvent) {
    try {
      let initiative = await UserRepository.listInitiatives();
      if (initiative.data == null) {
        return {
          code: 201,
          message: "initiatives not found",
          data: null,
        };
      }

      return {
        code: 200,
        message: "Success",
        data: initiative.data,
      };
    } catch (err) {
      return {
        code: 400,
        message: "list initiative failed",
        data: null,
      };
    }
  }

  public static async searchInitiatives(event: APIGatewayEvent) {
    try {
      let initiative = await UserRepository.listInitiatives();
      if (initiative.data == null) {
        return {
          code: 201,
          message: "initiatives not found",
          data: null,
        };
      }

      let response = [];
      if (event.queryStringParameters && event.queryStringParameters.key) {
        const options = {
          // includeScore: true,
          useExtendedSearch: true,
          keys: ["name", "description", "creator"],
        };

        // Create a new instance of Fuse
        const fuse = new Fuse(initiative.data, options);

        // Now search for 'Man'
        const result = fuse.search(event.queryStringParameters.key);
        result.forEach((res) => {
          response.push(res.item);
        });
      } else {
        response = initiative.data;
      }

      return {
        code: 200,
        message: "success",
        data: response,
      };
    } catch (err) {
      return {
        code: 400,
        message: "search failed",
        data: null,
      };
    }
  }

  public static async fundTransaction(event: APIGatewayEvent) {
    try {
      var server = new StellarSdk.Server(process.env.StellarUrl);
      const requestBody = JSON.parse(event.body);
      const parsedTx = new Transaction(requestBody.xdr);
      let publicKey = parsedTx.source;

      let user = await UserRepository.getUserByPublicKey(publicKey);
      if (user.data == null) {
        return {
          code: 201,
          message: "account not found",
          data: null,
        };
      }

      const operation: any = parsedTx.operations[2];
      const tokenPayload: any = tokenViewer(event);
      if (operation.destination == tokenPayload.publicKey) {
        return {
          code: 202,
          message: "You cannot fund yourself",
          data: null,
        };
      }

      // if(!user.data.verified){
      //   return {
      //     code: 202,
      //     message: "kyc approval is pending",
      //     data: null,
      //   };
      // }

      let humanKeypair = Keypair.fromSecret(process.env.HumanDistributorSecret);
      parsedTx.sign(humanKeypair);
      // let x = parsedTx.toEnvelope().toXDR().toString("base64");

      const stellarResponse = await server.submitTransaction(parsedTx);
      if (stellarResponse == null) {
        return {
          code: 203,
          message: "insufficient fund in account",
          data: null,
        };
      }
      // console.log(stellarResponse);

      return {
        code: 200,
        message: "success",
        data: null,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 400,
        message: "Funding Failed",
        data: null,
      };
    }
  }

  public static async addKYC(event: APIGatewayEvent) {
    try {
      const tokenPayload: any = tokenViewer(event);
      console.log(tokenPayload);
      const existingKYC = await UserRepository.getKYCByPublicKey(
        tokenPayload.publicKey
      );

      if (existingKYC.data != null) {
        if (existingKYC.data.approved) {
          return {
            code: 201,
            message: "Kyc already approved",
            data: null,
          };
        }
        return {
          code: 202,
          message: "Kyc is pending approval",
          data: null,
        };
      }

      const requestBody = JSON.parse(event.body);
      requestBody.publicKey = tokenPayload.publicKey;

      let kyc = await UserRepository.addKYC(requestBody);
      if (kyc.data == null) {
        return {
          code: 203,
          message: "Kyc Creation Failed",
          data: null,
        };
      }
      return {
        code: 200,
        message: "Success",
        data: kyc.data,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 400,
        message: "Kyc Creation Failed",
        data: null,
      };
    }
  }
  private static async sendToPortal(body) {
    try {
      const res = await axios.post(
        process.env.gateway_URI + "/transactions",
        // "https://devnet-blockchain-portal.herokuapp.com/transactions",
        // "http://localhost:8000/transactions",

        body,
        {
          headers: {
            // 'Authorization': "bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (res !== null) {
        // console.log(res)
        true;
      } else {
        return null;
      }
    } catch (err) {
      // console.log(err)
      return null;
    }
  }

  private static unique(arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError("array-unique expects an array.");
    }

    var len = arr.length;
    var i = -1;

    while (i++ < len) {
      var j = i + 1;

      for (; j < arr.length; ++j) {
        if (arr[i]._id === arr[j]._id) {
          arr.splice(j--, 1);
        }
      }
    }
    return arr;
  }
}
