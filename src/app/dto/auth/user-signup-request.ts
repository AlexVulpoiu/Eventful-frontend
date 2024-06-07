import {BaseSignupRequest} from "./base-signup-request";

export class UserSignupRequest extends BaseSignupRequest {

  constructor(email: string, firstName: string, lastName: string, password: string) {
    super(email, firstName, lastName, password);
  }
}
