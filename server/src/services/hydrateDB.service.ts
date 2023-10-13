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
              output: '[0, 1]',
            },
            {
              input: {
                nums: [3, 2, 4],
                target: 6,
              },
              output: '[1, 2]',
            },
            {
              input: {
                nums: [3, 3],
                target: 6,
              },
              output: '[0, 1]',
            },
          ],
          baseCodes: [
            {
              language: 'javascript',
              code: `
function twoSum(nums, target) {
    // Your JavaScript solution for Two Sum
}
              `,
            },
            {
              language: 'python',
              code: `
def twoSum(nums, target):
    # Your Python solution for Two Sum
              `,
            },
            {
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
          title: 'Fibonacci',
          description: `
            <p>Write a function <code>fibonacci(n: number): number</code> that returns the n-th number in the Fibonacci sequence.</p>
            <p>The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "n": 5
            }
            </pre>
            <p>Output:</p>
            <pre>
            5
            </pre>
            <p>Explanation: The 5th Fibonacci number is 5 (0, 1, 1, 2, 3, <strong>5</strong>).
          `,
          difficulty: Difficulty.Medium,
          tags: ['math', 'sequence'],
          testCases: [
            {
              input: {
                n: 1,
              },
              output: '1',
            },
            {
              input: {
                n: 5,
              },
              output: '5',
            },
            {
              input: {
                n: 10,
              },
              output: '55',
            },
          ],
          baseCodes: [
            {
              language: 'javascript',
              code: `
function fibonacci(n) {
    // Your JavaScript solution for Fibonacci
}
              `,
            },
            {
              language: 'python',
              code: `
          def fibonacci(n):
              # Your Python solution for Fibonacci
              `,
            },
            {
              language: 'c',
              code: `
#include <stdio.h>

int fibonacci(int n) {
    // Your C solution for Fibonacci
}
              `,
            },
            {
              language: 'cpp',
              code: `
#include <iostream>
using namespace std;

int fibonacci(int n) {
    // Your C++ solution for Fibonacci
}
              `,
            },
          ],
        },
        {
          title: 'Insertion Sort',
          description: `
            <p>Implement the insertion sort algorithm to sort an array of numbers.</p>
            <p>Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, but it's an efficient method for small lists or mostly sorted lists.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "array": [4, 2, 1, 5, 3]
            }
            </pre>
            <p>Output:</p>
            <pre>
            [1, 2, 3, 4, 5]
            </pre>
          `,
          difficulty: Difficulty.Hard,
          tags: ['sorting', 'algorithm'],
          testCases: [
            {
              input: {
                array: [4, 2, 1, 5, 3],
              },
              output: '[1, 2, 3, 4, 5]',
            },
            {
              input: {
                array: [9, 7, 2, 1, 8],
              },
              output: '[1, 2, 7, 8, 9]',
            },
            {
              input: {
                array: [5, 4, 3, 2, 1],
              },
              output: '[1, 2, 3, 4, 5]',
            },
          ],
          baseCodes: [
            {
              language: 'javascript',
              code: `
function insertionSort(arr) {
    // Your JavaScript solution for Insertion Sort
}
              `,
            },
            {
              language: 'python',
              code: `
def insertionSort(arr):
    # Your Python solution for Insertion Sort
              `,
            },
            {
              language: 'c',
              code: `
#include <stdio.h>

void insertionSort(int arr[], int n) {
    // Your C solution for Insertion Sort
}
              `,
            },
            {
              language: 'cpp',
              code: `
#include <iostream>
using namespace std;

void insertionSort(vector<int>& arr) {
    // Your C++ solution for Insertion Sort
}
              `,
            },
          ],
        },
        {
          title: 'Palindrome Check',
          description: `
            <p>Write a function <code>isPalindrome(s: string): boolean</code> that determines if a given string is a palindrome.</p>
            <p>A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "s": "A man, a plan, a canal, Panama"
            }
            </pre>
            <p>Output:</p>
            <pre>
            true
            </pre>
            <p>Explanation: "A man, a plan, a canal, Panama" is a palindrome when spaces and capitalization are ignored.</p>
          `,
          difficulty: Difficulty.Easy,
          tags: ['string', 'palindrome'],
          testCases: [
            {
              input: {
                s: 'A man, a plan, a canal, Panama',
              },
              output: 'true',
            },
            {
              input: {
                s: 'racecar',
              },
              output: 'true',
            },
            {
              input: {
                s: 'hello world',
              },
              output: 'false',
            },
          ],
          baseCodes: [
            {
              language: 'javascript',
              code: `
function isPalindrome(s) {
    // Your JavaScript solution for Palindrome Check
}
              `,
            },
            {
              language: 'python',
              code: `
def isPalindrome(s):
    # Your Python solution for Palindrome Check
              `,
            },
            {
              language: 'c',
              code: `
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isPalindrome(char* s) {
    // Your C solution for Palindrome Check
}
              `,
            },
            {
              language: 'cpp',
              code: `
#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(string s) {
    // Your C++ solution for Palindrome Check
}
              `,
            },
          ],
        },
        {
          title: 'Maximum Subarray',
          description: `
            <p>Find the contiguous subarray within an array that has the largest sum.</p>
            <p>Write a function <code>maxSubarraySum(arr: number[]): number</code> that returns the sum of the largest subarray.</p>
            <h3>Example:</h3>
            <p>Input:</p>
            <pre>
            {
              "arr": [-2, 1, -3, 4, -1, 2, 1, -5, 4]
            }
            </pre>
            <p>Output:</p>
            <pre>
            6
            </pre>
            <p>Explanation: The contiguous subarray [4, -1, 2, 1] has the largest sum, which is 6.</p>
          `,
          difficulty: Difficulty.Medium,
          tags: ['array', 'dynamic programming'],
          testCases: [
            {
              input: {
                arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
              },
              output: '6',
            },
            {
              input: {
                arr: [1],
              },
              output: '1',
            },
            {
              input: {
                arr: [5, 4, -1, 7, 8],
              },
              output: '23',
            },
          ],
          baseCodes: [
            {
              language: 'javascript',
              code: `
function maxSubarraySum(arr) {
    // Your JavaScript solution for Maximum Subarray
}
              `,
            },
            {
              language: 'python',
              code: `
def maxSubarraySum(arr):
    # Your Python solution for Maximum Subarray
              `,
            },
            {
              language: 'c',
              code: `
#include <stdio.h>
#include <stdlib.h>

int maxSubarraySum(int arr[], int n) {
    // Your C solution for Maximum Subarray
}
              `,
            },
            {
              language: 'cpp',
              code: `
#include <iostream>
#include <vector>
using namespace std;

int maxSubarraySum(vector<int>& arr) {
    // Your C++ solution for Maximum Subarray
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
