import { Doc } from "./doc";

export class SigningRequest {
  constructor(public id: number, public isSigned: boolean, public submissionDays: number, public documents: Doc[]) {
  }
}