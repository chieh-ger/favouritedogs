# SO Connect Assessment

## Description

Using the following api: https://thedogapi.com/ create an application that shows a list or a table of dog pictures. 

## Notes

- Using axios request library rather than the native fetch API as it handles many features like automatically transforming data to JSON from promises, cors issues etc without additional effort to handle that within the application as it is handled through the library. Other upsides for axios also includes built-in interceptors, cancelling requests and support for request progress (uploading/downloading for example), which are not used in this project. https://axios-http.com/

- Created some util functions especially for some code that are re-used often. I prefer to create generic functions where possible which it could then be reused by other components, reducing duplicate code.

- Instead of clicking on an image to see details about a dog, you can hover over and additional information would show up within the same tile

- Filtering by breed, temperaments and bred for categories

- For the purpose of this exercise, tests weren't created. Usually tests would be written with Jest for each component to ensure they would render as expected

- ts-ignore is used as there are some linting issues that would be overly time-consuming for the purpose of this assessment. ts-ignore should be minimised or completely avoided in a production environment

- Linting using Prettier https://prettier.io/

## Run Instructions
- Navigate to folder and run `yarn`
- After the installation of node modules is complete, run `yarn start` which should start the application on localhost:3000
