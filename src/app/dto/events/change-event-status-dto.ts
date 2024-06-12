export class ChangeEventStatusDto {
  public status: string;
  public reason: string;


  constructor(status: string, reason: string) {
    this.status = status;
    this.reason = reason;
  }
}
