import Problem, { Difficulty, IProblem } from '../models/problem.model';

export const hydrateDBService = () => {
  // Check if the database is empty
  Problem.find().then((problems: IProblem[]) => {
    if (problems.length === 0) {
      // If the database is empty, hydrate it
      const problems = [
        {
          title: 'Two Sum',
          description: `
            <p>Given an array of integers, return indices of the two numbers that add up to a specific target.</p>
            <p>Write a function <code>twoSum(nums: number[], target: number): number[]</code> to find the indices of two numbers in the <code>nums</code> array that add up to the given <code>target</code>.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "nums": [2, 7, 11, 15],
              "target": 9
            }
            </pre>
            <p>Output:</p>
            <pre>
            [0, 1]
            </pre>
            <p>Explanation: nums[0] + nums[1] = 2 + 7 = 9</p>
          `,
          difficulty: Difficulty.Easy,
          tags: ['array', 'hash table'],
          testCases: [
            {
              input: {
                nums: [2, 7, 11, 15],
                target: 9,
              },
              output: [0, 1],
            },
            {
              input: {
                nums: [3, 2, 4],
                target: 6,
              },
              output: [1, 2],
            },
            {
              input: {
                nums: [3, 3],
                target: 6,
              },
              output: [0, 1],
            },
          ],
          baseCodes: [
            {
              codeForTest: `
USER_CODE;

testCases = [
  {
    input: {
      nums: [2, 7, 11, 15],
      target: 9,
    },
    output: [0, 1],
  },
  {
    input: {
      nums: [3, 2, 4],
      target: 6,
    },
    output: [1, 2],
  },
  {
    input: {
      nums: [3, 3],
      target: 6,
    },
    output: [0, 1],
  },
];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = twoSum(testCase.input.nums, testCase.input.target);
  console.log('TEST_CASE_' + (i + 1) + '|' + JSON.stringify(result) + '|' + (JSON.stringify(result) === JSON.stringify(testCase.output) ? 'PASSED' : 'FAILED'));
}`,
              language: 'javascript',
              code: `
function twoSum(nums, target) {
    // Your JavaScript solution for Two Sum
}
              `,
            },
            {
              codeForTest: `
USER_CODE

testCases = [
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9,
    },
    "output": [0, 1],
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6,
    },
    "output": [1, 2],
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6,
    },
    "output": [0, 1],
  },
];

for i in range(len(testCases)):
  testCase = testCases[i]
  result = twoSum(testCase["input"]["nums"], testCase["input"]["target"])
  if result == testCase['output']:
    status = 'PASSED'
  else:
    status = 'FAILED'
  print(f"TEST_CASE_{i + 1}|{result}|{status}")
`,
              language: 'python',
              code: `
def twoSum(nums, target):
    # Your Python solution for Two Sum
              `,
            },
            {
              codeForTest: `
USER_CODE;

int main(int argc, char const *argv[]) 
{
    int nums[][4] = {
        {2, 7, 11, 15},
        {3, 2, 4},
        {3, 3}
    };
    int target[] = {9, 6, 6};
    int expected_output[][2] = {
        {0, 1},
        {1, 2},
        {0, 1}
    };

    int* result;
    int returnSize;

    for (int i = 0; i < sizeof(nums) / sizeof(nums[0]); i++) {
        result = twoSum(nums[i], sizeof(nums[i]) / sizeof(nums[i][0]), target[i], &returnSize);
        const char* status = (result[0] == expected_output[i][0] && result[1] == expected_output[i][1]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|[%d,%d]|%s\\n", i + 1, result[0], result[1], status);
        free(result); // Free the result array after each test
    }

    return 0;
}
              `,
              language: 'c',
              code: `
#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Your C solution for Two Sum
}
              `,
            },
            {
              codeForTest: `
USER_CODE;
#include <iostream>

int main() {
    vector<vector<int>> nums = {
        {2, 7, 11, 15},
        {3, 2, 4},
        {3, 3}
    };
    vector<int> target = {9, 6, 6};
    vector<vector<int>> expected_output = {
        {0, 1},
        {1, 2},
        {0, 1}
    };

    vector<int> result;

    for (int i = 0; i < nums.size(); i++) {
        result = twoSum(nums[i], target[i]);
        const char* status = (result[0] == expected_output[i][0] && result[1] == expected_output[i][1]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|[%d,%d]|%s\\n", i + 1, result[0], result[1], status);
    }

    return 0;
}`,
              language: 'cpp',
              code: `
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your C++ solution for Two Sum
}
              `,
            },
          ],
        },
        {
          title: 'Remove Duplicates from Sorted Array',
          description: `
            <p>Given a sorted array <code>nums</code>, remove the duplicates in-place such that each element appears only once and returns the new length.</p>
            <p>Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.</p>
            <p>Write a function <code>removeDuplicates(nums: number[]): number</code> to solve the problem. The function should return the new length of the modified array.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "nums": [0,0,1,1,1,2,2,3,3,4]
            }
            </pre>
            <p>Output:</p>
            <pre>
            5
            </pre>
            <p>Explanation: The modified array should be [0, 1, 2, 3, 4].</p>
          `,
          difficulty: Difficulty.Easy,
          tags: ['array', 'two pointers'],
          testCases: [
            {
              input: {
                nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
              },
              output: 5,
            },
            {
              input: {
                nums: [1, 1, 2],
              },
              output: 2,
            },
            {
              input: {
                nums: [3, 3, 3, 3],
              },
              output: 1,
            },
          ],
          baseCodes: [
            {
              codeForTest: `
USER_CODE;

testCases = [
  {
    "input": {
      "nums": [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    },
    "output": 5
  },
  {
    "input": {
      "nums": [1, 1, 2]
    },
    "output": 2
  },
  {
    "input": {
      "nums": [3, 3, 3, 3]
    },
    "output": 1
  }
];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = removeDuplicates(testCase.input.nums);
  console.log('TEST_CASE_' + (i + 1) + '|' + result + '|' + (result === testCase.output ? 'PASSED' : 'FAILED'));
}
            `,
              language: 'javascript',
              code: `
function removeDuplicates(nums) {
    // Your JavaScript solution for Remove Duplicates from Sorted Array
}
            `,
            },
            {
              codeForTest: `
USER_CODE

testCases = [
  {
    "input": {
      "nums": [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    },
    "output": 5
  },
  {
    "input": {
      "nums": [1, 1, 2]
    },
    "output": 2
  },
  {
    "input": {
      "nums": [3, 3, 3, 3]
    },
    "output": 1
  }
];

for i in range(len(testCases)):
  testCase = testCases[i]
  result = removeDuplicates(testCase["input"]["nums"])
  if result == testCase['output']:
    status = 'PASSED'
  else:
    status = 'FAILED'
  print(f"TEST_CASE_{i + 1}|{result}|{status}")
`,
              language: 'python',
              code: `
def removeDuplicates(nums):
    # Your Python solution for Remove Duplicates from Sorted Array
}
`,
            },
            {
              codeForTest: `
USER_CODE;

int main() {
    int nums[][10] = {
        {0, 0, 1, 1, 1, 2, 2, 3, 3, 4},
        {1, 1, 2},
        {3, 3, 3, 3}
    };
    int expected_output[] = {5, 2, 1};

    for (int i = 0; i < sizeof(nums) / sizeof(nums[0]); i++) {
        int result = removeDuplicates(nums[i], sizeof(nums[i]) / sizeof(nums[i][0]));
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
`,
              language: 'c',
              code: `
#include <stdio.h>

int removeDuplicates(int* nums, int numsSize) {
    // Your C solution for Remove Duplicates from Sorted Array
`,
            },
            {
              codeForTest: `
USER_CODE;
#include <iostream>

int main() {
    vector<int> nums[] = {
        {0, 0, 1, 1, 1, 2, 2, 3, 3, 4},
        {1, 1, 2},
        {3, 3, 3, 3}
    };
    int expected_output[] = {5, 2, 1};

    for (int i = 0; i < sizeof(nums) / sizeof(nums[0]); i++) {
        int result = removeDuplicates(nums[i]);
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
`,
              language: 'cpp',
              code: `
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    // Your C++ solution for Remove Duplicates from Sorted Array
}
`,
            },
          ],
        },
        {
          title: 'Container With Most Water',
          description: `
            <p>Write a function <code>maxArea(height: number[]): number</code> to solve the problem.</p>

            <p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
            
            <p>Return <em>the maximum amount of water a container can store</em>.</p>
            
            <p><strong>Notice</strong> that you may not slant the container.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "height": [1, 8, 6, 2, 5, 4, 8, 3, 7]
            }
            </pre>
            <p>Output:</p>
            <pre>
            49
            </pre>
            <p>Explanation: The maximum area is obtained by choosing the second and fourth vertical lines.</p>
          `,
          difficulty: Difficulty.Medium,
          tags: ['array', 'two pointers'],
          testCases: [
            {
              input: {
                height: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              },
              output: 49,
            },
            {
              input: {
                height: [1, 1],
              },
              output: 1,
            },
            {
              input: {
                height: [4, 3, 2, 1, 4],
              },
              output: 16,
            },
          ],
          baseCodes: [
            {
              codeForTest: `
USER_CODE;

testCases = [
  {
    "input": {
      "height": [1, 8, 6, 2, 5, 4, 8, 3, 7]
    },
    "output": 49
  },
  {
    "input": {
      "height": [1, 1]
    },
    "output": 1
  },
  {
    "input": {
      "height": [4, 3, 2, 1, 4]
    },
    "output": 16
  },
];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = maxArea(testCase.input..height);
  console.log('TEST_CASE_' + (i + 1) + '|' + result + '|' + (result === testCase.output ? 'PASSED' : 'FAILED'));
}
      `,
              language: 'javascript',
              code: `
function maxArea(height) {
    // Your JavaScript solution for Container With Most Water
}
              `,
            },
            {
              codeForTest: `
USER_CODE

testCases = [
  { "input": { "height": [1, 8, 6, 2, 5, 4, 8, 3, 7] }, "output": 49 },
  { "input": { "height": [1, 1] }, "output": 1 },
  { "input": { "height": [4, 3, 2, 1, 4] }, "output": 16 },
];

for i in range(len(testCases)):
  testCase = testCases[i]
  result = maxArea(testCase["input"]["height"])
  if result == testCase['output']:
    status = 'PASSED'
  else:
    status = 'FAILED'
  print(f"TEST_CASE_{i + 1}|{result}|{status}")
        `,
              language: 'python',
              code: `
def maxArea(height):
    # Your Python solution for Container With Most Water
        `,
            },
            {
              codeForTest: `
USER_CODE;

int main() {
    int height[][9] = {
        {1, 8, 6, 2, 5, 4, 8, 3, 7},
        {1, 1},
        {4, 3, 2, 1, 4}
    };
    int expected_output[] = {49, 1, 16};   

    for (int i = 0; i < sizeof(height) / sizeof(height[0]); i++) {
        int result = maxArea(height, sizeof(height) / sizeof(height[0]));
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
        `,
              language: 'c',
              code: `
#include <stdio.h>

int maxArea(int* height, int heightSize) {
    // Your C solution for Container With Most Water
}
              `,
            },
            {
              codeForTest: `
USER_CODE;
#include <iostream>

int main() {
    vector<int> height[] = {
        {1, 8, 6, 2, 5, 4, 8, 3, 7},
        {1, 1},
        {4, 3, 2, 1, 4}
    };
    int expected_output[] = {49, 1, 16};

    for (int i = 0; i < sizeof(height) / sizeof(height[0]); i++) {
        int result = maxArea(height[i]);
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
        `,
              language: 'cpp',
              code: `
#include <vector>
using namespace std;

int maxArea(vector<int>& height) {
    // Your C++ solution for Container With Most Water
}
              `,
            },
          ],
        },
        {
          title: 'Longest Substring Without Repeating Characters',
          description: `
            <p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
            <p>Write a function <code>lengthOfLongestSubstring(s: string): number</code> to solve the problem.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "s": "abcabcbb"
            }
            </pre>
            <p>Output:</p>
            <pre>
            3
            </pre>
            <p>Explanation: The answer is "abc", with the length of 3.</p>
          `,
          difficulty: Difficulty.Medium,
          tags: ['hash table', 'two pointers', 'string', 'sliding window'],
          testCases: [
            {
              input: {
                s: 'abcabcbb',
              },
              output: 3,
            },
            {
              input: {
                s: 'bbbbb',
              },
              output: 1,
            },
            {
              input: {
                s: 'pwwkew',
              },
              output: 3,
            },
            {
              input: {
                s: '',
              },
              output: 0,
            },
          ],
          baseCodes: [
            {
              codeForTest: `
USER_CODE;

testCases = [
  {
    "input": {
      "s": "abcabcbb"
    },
    "output": 3
  },
  {
    "input": {
      "s": "bbbbb"
    },
    "output": 1
  },
  {
    "input": {
      "s": "pwwkew"
    },
    "output": 3
  },
  {
    "input": {
      "s": ""
    },
    "output": 0
  }
];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = lengthOfLongestSubstring(testCase.input.s);
  console.log('TEST_CASE_' + (i + 1) + '|' + result + '|' + (result === testCase.output ? 'PASSED' : 'FAILED'));
}
            `,
              language: 'javascript',
              code: `
function lengthOfLongestSubstring(s) {
    // Your JavaScript solution for Longest Substring Without Repeating Characters
}
            `,
            },
            {
              codeForTest: `
USER_CODE

testCases = [
  {
    "input": {
      "s": "abcabcbb"
    },
    "output": 3
  },
  {
    "input": {
      "s": "bbbbb"
    },
    "output": 1
  },
  {
    "input": {
      "s": "pwwkew"
    },
    "output": 3
  },
  {
    "input": {
      "s": ""
    },
    "output": 0
  }
];

for i in range(len(testCases)):
  testCase = testCases[i]
  result = lengthOfLongestSubstring(testCase["input"]["s"])
  if result == testCase['output']:
    status = 'PASSED'
  else:
    status = 'FAILED'
  print(f"TEST_CASE_{i + 1}|{result}|{status}")
`,
              language: 'python',
              code: `
def lengthOfLongestSubstring(s):
    // Your Python solution for Longest Substring Without Repeating Characters
`,
            },
            {
              codeForTest: `
USER_CODE;

int main() {
    char* s[] = {
        "abcabcbb",
        "bbbbb",
        "pwwkew",
        ""
    };
    int expected_output[] = {3, 1, 3, 0};

    for (int i = 0; i < sizeof(s) / sizeof(s[0]); i++) {
        int result = lengthOfLongestSubstring(s[i]);
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
              `,
              language: 'c',
              code: `
#include <stdio.h>

int lengthOfLongestSubstring(char* s) {
    // Your C solution for Longest Substring Without Repeating Characters
}
              `,
            },
            {
              codeForTest: `
USER_CODE;

#include <iostream>

int main() {
    string s[] = {
        "abcabcbb",
        "bbbbb",
        "pwwkew",
        ""
    };
    int expected_output[] = {3, 1, 3, 0};

    for (int i = 0; i < sizeof(s) / sizeof(s[0]); i++) {
        int result = lengthOfLongestSubstring(s[i]);
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%d|%s\\n", i + 1, result, status);
    }

    return 0;
}
              `,
              language: 'cpp',
              code: `
#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Your C++ solution for Longest Substring Without Repeating Characters
}
              `,
            },
          ],
        },
        {
          title: 'Median of Two Sorted Arrays',
          description: `
            <p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>
            <p>Write a function <code>findMedianSortedArrays(nums1: number[], nums2: number[]): number</code> to solve the problem.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "nums1": [1, 3],
              "nums2": [2]
            }
            </pre>
            <p>Output:</p>
            <pre>
            2
            </pre>
            <p>Explanation: The median is 2.0.</p>
          `,
          difficulty: Difficulty.Hard,
          tags: ['array', 'binary search', 'divide and conquer'],
          testCases: [
            {
              input: {
                nums1: [1, 3],
                nums2: [2],
              },
              output: 2,
            },
            {
              input: {
                nums1: [1, 2],
                nums2: [3, 4],
              },
              output: 2.5,
            },
            {
              input: {
                nums1: [0, 0],
                nums2: [0, 0],
              },
              output: 0,
            },
            {
              input: {
                nums1: [],
                nums2: [1],
              },
              output: 1,
            },
            {
              input: {
                nums1: [2],
                nums2: [],
              },
              output: 2,
            },
          ],
          baseCodes: [
            {
              codeForTest: `
USER_CODE;

testCases = [
  {
    "input": {
      "nums1": [1, 3],
      "nums2": [2]
    },
    "output": 2
  },
  {
    "input": {
      "nums1": [1, 2],
      "nums2": [3, 4]
    },
    "output": 2.5
  },
  {
    "input": {
      "nums1": [0, 0],
      "nums2": [0, 0]
    },
    "output": 0
  },
  {
    "input": {
      "nums1": [],
      "nums2": [1]
    },
    "output": 1
  },
  {
    "input": {
      "nums1": [2],
      "nums2": []
    },
    "output": 2
  }
];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  const result = findMedianSortedArrays(testCase.input.nums1, testCase.input.nums2);
  console.log('TEST_CASE_' + (i + 1) + '|' + result + '|' + (result === testCase.output ? 'PASSED' : 'FAILED'));
}
            `,
              language: 'javascript',
              code: `
function findMedianSortedArrays(nums1, nums2) {
    // Your JavaScript solution for Median of Two Sorted Arrays
}
            `,
            },
            {
              codeForTest: `
USER_CODE

testCases = [
  {
    "input": {
      "nums1": [1, 3],
      "nums2": [2]
    },
    "output": 2
  },
  {
    "input": {
      "nums1": [1, 2],
      "nums2": [3, 4]
    },
    "output": 2.5
  },
  {
    "input": {
      "nums1": [0, 0],
      "nums2": [0, 0]
    },
    "output": 0
  },
  {
    "input": {
      "nums1": [],
      "nums2": [1]
    },
    "output": 1
  },
  {
    "input": {
      "nums1": [2],
      "nums2": []
    },
    "output": 2
  }
];

for i in range(len(testCases)):
  testCase = testCases[i]
  result = findMedianSortedArrays(testCase["input"]["nums1"], testCase["input"]["nums2"])
  if result == testCase['output']:
    status = 'PASSED'
  else:
    status = 'FAILED'
  print(f"TEST_CASE_{i + 1}|{result}|{status}")
`,
              language: 'python',
              code: `
def findMedianSortedArrays(nums1, nums2):
    // Your Python solution for Median of Two Sorted Arrays
`,
            },
            {
              codeForTest: `
USER_CODE;

int main() {
    int nums1[][2] = {
        {1, 3},
        {1, 2},
        {0, 0},
        {},
        {2}
    };
    int nums2[][2] = {
        {2},
        {3, 4},
        {0, 0},
        {1},
        {}
    };
    double expected_output[] = {2, 2.5, 0, 1, 2};

    for (int i = 0; i < sizeof(nums1) / sizeof(nums1[0]); i++) {
        double result = findMedianSortedArrays(nums1[i], sizeof(nums1[i]) / sizeof(nums1[i][0]), nums2[i], sizeof(nums2[i]) / sizeof(nums2[i][0]));
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%f|%s\\n", i + 1, result, status);
    }

    return 0;
}
              `,
              language: 'c',
              code: `
#include <stdio.h>

double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    // Your C solution for Median of Two Sorted Arrays
}
              `,
            },
            {
              codeForTest: `
USER_CODE;

#include <iostream>

int main() {
    vector<vector<int>> nums1 = {
        {1, 3},
        {1, 2},
        {0, 0},
        {},
        {2}
    };
    vector<vector<int>> nums2 = {
        {2},
        {3, 4},
        {0, 0},
        {1},
        {}
    };
    double expected_output[] = {2, 2.5, 0, 1, 2};

    for (int i = 0; i < nums1.size(); i++) {
        double result = findMedianSortedArrays(nums1[i], nums2[i]);
        const char* status = (result == expected_output[i]) ? "PASSED" : "FAILED";
        printf("TEST_CASE_%d|%f|%s\\n", i + 1, result, status);
    }

    return 0;
}
              `,
              language: 'cpp',
              code: `
#include <vector>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Your C++ solution for Median of Two Sorted Arrays
}
              `,
            },
          ],
        },
      ];

      Problem.insertMany(problems)
        .then(() => console.log('Database hydrated successfully'))
        .catch((err) => console.log(err));
    }
  });
};
