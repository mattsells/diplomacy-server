import { DynamicObject } from '@/types/global';

// Note, types break without the extends
function removeProperties<T extends DynamicObject>(
	object: T,
	...keys: (keyof T)[]
): DynamicObject {
	return Object.fromEntries(
		Object.entries(object).filter(([key]) => !keys.includes(key)),
	);
}

export { removeProperties };

// NOTE: Saving this so I can use for a blog post
// function removeProperties(
// 	object: DynamicObject,
// 	...keys: string[]
// ): DynamicObject {
// 	const newObject: DynamicObject = {};

// 	for (const [key, value] of Object.entries(object)) {
// 		if (!keys.includes(key)) {
// 			newObject[key] = value;
// 		}
// 	}

// 	return newObject;
// }

// export { removeProperties };
