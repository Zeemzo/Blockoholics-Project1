export interface IResponse {
  headers: any;
  body: any;
  statusCode: HTTPStatusCodes;
}

class ResponseFactory implements IResponse {
  public headers = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    // "Cache-Control": "no-cache, no-store, must-revalidate"
  };
  public body: any;
  public statusCode: HTTPStatusCodes;

  constructor(statusCode: HTTPStatusCodes, body: any) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}

export function createResponse(
  statusCode: HTTPStatusCodes,
  body: any
): IResponse {
  return new ResponseFactory(statusCode, body);
}
