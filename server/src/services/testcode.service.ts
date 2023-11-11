import { runCodeInDocker } from './docker.service';
import { ICodeResult } from '../models/code.model';
import { ITestCaseResult } from '../models/problem.model';

const REGEX_TEST_CASE = /TEST_CASE_\d+\|[^|]+\|(PASSED|FAILED)/;

export const testCode = async (userCode: string, lang: string, codeForTest: string): Promise<string> => {
  const codeParsedForTest = parseCodeForTest(userCode, lang, codeForTest);

  return runCodeInDocker(codeParsedForTest, lang);
};

export const parseResult = (noParsedResult: string): string => {
  const result = JSON.parse(noParsedResult) as ICodeResult;

  if (result.code !== 0) return noParsedResult;

  const resultParsed = {
    test_case: {},
    stdout: result.stdout,
    stderr: result.stderr,
    code: result.code,
  } as ITestCaseResult;

  const lines = result.stdout.split('\n').filter((line) => line !== '');

  let newStdout = '';
  lines.forEach((line) => {
    if (REGEX_TEST_CASE.test(line)) {
      const elements = line.split('|');
      const testCaseIndex = parseInt(elements[0].split('_')[2]);
      const testCaseOutput = elements[1];
      const testCaseResult = elements[2];

      resultParsed.test_case[testCaseIndex] = { result: testCaseResult, output: testCaseOutput };
    } else {
      newStdout += `${line}\n`;
    }
  });

  resultParsed.stdout = newStdout;

  return JSON.stringify(resultParsed);
};

const parseCodeForTest = (userCode: string, lang: string, codeForTest: string): string => {
  return codeForTest.replace('USER_CODE', userCode);
};
