export default interface ICode {
  src: string;
  lang: string;
}

export interface ICodeResult {
  stdout: string;
  stderr: string;
  code: number;
}
