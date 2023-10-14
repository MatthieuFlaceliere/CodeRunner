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
              callResult: "twoSum(testCase.input.nums, testCase.input.target);",
              language: 'javascript',
              code: `
function twoSum(nums, target) {
    // Your JavaScript solution for Two Sum
}
              `,
            },
            {
              callResult: "",
              language: 'python',
              code: `
def twoSum(nums, target):
    # Your Python solution for Two Sum
              `,
            },
            {
              callResult: "",
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
              callResult: "",
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
      ];

      Problem.insertMany(problems)
        .then(() => console.log('Database hydrated successfully'))
        .catch((err) => console.log(err));
    }
  });
};
