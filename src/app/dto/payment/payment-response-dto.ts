export class PaymentResponseDto {
  public sessionId: string;
  public sessionUrl: string;


  constructor(sessionId: string, sessionUrl: string) {
    this.sessionId = sessionId;
    this.sessionUrl = sessionUrl;
  }
}
