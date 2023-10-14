FUNCTION

TEST_CASES

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = CALL_FUNCTION
  console.log(`TEST_CASE_${i + 1}|${JSON.stringify(result) === JSON.stringify(testCase.output) ? 'PASSED' : 'FAILED'}`);
}
