FUNCTION

TEST_CASES

for i in range(len(testCases)):
    testCase = testCases[i]
    result = CALL_FUNCTION
    if result == testCase['output']:
        status = 'PASSED'
    else:
        status = 'FAILED'
    print(f"TEST_CASE_{i + 1}|{status}")
