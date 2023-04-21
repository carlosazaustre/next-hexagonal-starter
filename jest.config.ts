import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	modulePaths: ['<rootDir>/src', '<rootDir>/tests'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);
