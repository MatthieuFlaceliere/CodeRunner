import Problem, { IProblem } from '../models/problem.model';

export const hydrateDBService = () => {
  // Check if the database is empty
  Problem.find().then((problems: IProblem[]) => {
    if (problems.length === 0) {
      // If the database is empty, hydrate it
      const problems = [
        {
          title: 'Two Sum',
          description:
            'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          difficulty: 'easy',
          tags: ['array', 'hash table'],
          testCases: [
            {
              input: '[2,7,11,15]',
              output: '9',
            },
            {
              input: '[3,2,4]',
              output: '6',
            },
            {
              input: '[3,3]',
              output: '6',
            },
          ],
        },
        {
          title: 'Reverse Integer',
          description:
            'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.',
          difficulty: 'easy',
          tags: ['math'],
          testCases: [
            {
              input: '123',
              output: '321',
            },
            {
              input: '-123',
              output: '-321',
            },
            {
              input: '120',
              output: '21',
            },
            {
              input: '0',
              output: '0',
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
