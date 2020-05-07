import * as Joi from "@hapi/joi";

export const registerSchema = Joi.object({
  alias: Joi.string().required(),
  email: Joi.string().optional().allow(""),
  publicKey: Joi.string().required(),
  encryptedSecret: Joi.string().optional().allow(""),
  recoveryQuestion: Joi.string().optional().allow(""),
  encryptedRecoverySecret: Joi.string().optional().allow(""),
  authType: Joi.number().valid(0, 1, 2).optional(),
});

export const loginSchema = Joi.object({
  key: Joi.string().required(),
  password: Joi.string().optional(),
});

export const loginWithSecretSchema = Joi.object({
  xdr: Joi.string().required(),
});

export const editUserSchema = Joi.object({
  alias: Joi.string().optional(),
  email: Joi.string().optional(),
  dob: Joi.string().optional(),
  publicKey: Joi.string().optional(),
  encryptedSecret: Joi.string().optional(),
  recoveryQuestion: Joi.string().optional(),
  encryptedRecoverySecret: Joi.string().optional(),
  pash: Joi.string().optional(),
});

export const addInitiativeSchema = Joi.object({
  name: Joi.string().optional(),
  txnhash: Joi.string().optional(),
  xdr: Joi.string().optional(),
  goal: Joi.number().optional(),
  creator: Joi.string().optional(),
  recipient: Joi.string().optional(),
  recipientType: Joi.string().optional(),
  endDate: Joi.string().optional(),
  cover: Joi.string().optional(),
  description: Joi.string().optional(),
  paymentDetails: Joi.object().optional(),
});

export const editInitiativeSchema = Joi.object({
  name: Joi.string().optional(),
  txnhash: Joi.string().optional(),
  xdr: Joi.string().optional(),
  goal: Joi.number().optional(),
  creator: Joi.string().optional(),
  recipient: Joi.string().optional(),
  recipientType: Joi.string().optional(),
  endDate: Joi.string().optional(),
  cover: Joi.string().optional(),
  description: Joi.string().optional(),
  paymentDetails: Joi.object().optional(),
});

export const fundTranasctionSchema = Joi.object({
  xdr: Joi.string().required(),
});

export class FundTranasction {
  xdr: String;
}
export class Initiative {
  _id: String;
  name: String;
  txnhash: String;
  goal: String;
  creator: String;
  recipient: String;
  recipientType: String;
  endDate: String;
  cover: String;
  description: String;
  paymentDetails: Object;
  createdAt: String;
  updatedAt: String;
}

export class User {
  _id: String;
  name: String;
  email: String;
  dob: String;
  verified: Boolean;
  authType: String;
  type: String;
  publicKey: String;
  encryptedSecret: String;
  recoveryQuestion: String;
  encryptedRecoverySecret: String;
  pash: String;
  createdAt: String;
  updatedAt: String;
}

export class KYC {
  _id: String;
  publicKey: String;
  idNo: String;
  dob: Date;
  idFront: String;
  idBack: String;
  faceIdFront: String;
  fullname: String;
  telephone: String;
  addressLineOne: String;
  addressLineTwo: String;
  city: String;
  province: String;
  country: String;
  approved: Boolean;
  createdAt: String;
  updatedAt: String;
}

export const addKYCSchema = Joi.object({
  idNo: Joi.string().required(),
  dob: Joi.date().required(),
  idFront: Joi.string().required(),
  idBack: Joi.string().required(),
  faceIdFront: Joi.string().required(),
  fullname: Joi.string().required(),
  telephone: Joi.string().required(),
  addressLineOne: Joi.string().required(),
  addressLineTwo: Joi.string().optional().allow(""),
  city: Joi.string().required(),
  province: Joi.string().optional(),
  zipCode: Joi.number().required(),
  country: Joi.string().required(),
});
