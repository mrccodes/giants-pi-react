import Vector3D from './Vector3D';

/**
 * Vector3DOrScalar can either be a number or an object conforming to Vector3D.
 *
 * @example
 * // Using as a number
 * const myVar1: Vector3DOrScalar = 42;
 *
 * @example
 * // Using as an object
 * const myVar2: Vector3DOrScalar = { x: 1, y: 1, z: 1 };
 */
export type Vector3DOrScalar = Vector3D | number;
