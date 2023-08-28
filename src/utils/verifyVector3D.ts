import { Vector3D, Vector3DOrScalar } from '../models';

/**
 * Verifies and normalizes a value to a Vector3D object.
 * @param val - Either a single scalar value or an object with x, y, and z properties.
 * @returns A Vector3D object representing the normalized value.
 */
const verifyVector3D = (val: Vector3DOrScalar): Vector3D =>
  typeof val === 'number' ? { x: val, y: val, z: val } : val;

export default verifyVector3D;
