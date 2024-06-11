// export const preset = 'ts-jest';
// export const transform = {
//   '^.+\\.(ts|tsx)?$': 'ts-jest',
//   '^.+\\.(js|jsx)$': 'babel-jest',
// };

// jest.config.js
export default {
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};