import { removeProperties } from '../data';

describe('removeProperties()', () => {
	it('removes the specified properties from an object', () => {
		const object = {
			foo: 'bar',
			baz: 'bon',
			roo: 'fio',
		};

		const result = removeProperties(object, 'foo', 'roo');

		expect(result).toEqual({
			baz: 'bon',
		});
	});
});
