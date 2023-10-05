export const LanguagesList: Language[] = [
  {
    key: 'javascript',
    extension: 'js',
    code: `console.log('Hello world!');`,
  },
  {
    key: 'python',
    extension: 'py',
    code: `print('Hello world!')`,
  },
  {
    key: 'c',
    extension: 'c',
    code: `#include <stdio.h>
int main() {
  printf("Hello world!");
  return 0;
}`,
  },
  {
    key: 'cpp',
    extension: 'cpp',
    code: `#include <iostream>
using namespace std;
int main() {
  cout << "Hello world!";
  return 0;
}`,
  },
];

export interface Language {
  key: string;
  extension: string;
  code: string;
}
