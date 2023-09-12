export interface Code {
  src: string;
  lang: string;
}

export interface CodeResult {
  stdout: string;
  stderr: string;
  code: number;
}

export interface RunCodeSuccess {
  status: string;
  message: string;
  data: string;
}

export interface ResultCodeSuccess {
  status: string;
  message: string;
  data: string | null;
}
