export default interface Code {
  src: string;
  lang: string;
}

export interface CodeResult {
  stdout: string;
  stderr: string;
  code: number;
}
