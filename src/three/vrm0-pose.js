// VRM 0.x models: three-vrm keeps their normalized bones in the pre-rotateVRM0 frame (the model faced -Z), so a pose
// written for VRM 1.0 (arms down = rotation.z of -1.15 on the left upper arm) comes out mirrored: X and Z flip, and the
// arms point up. This is the same correction three-vrm's own Mixamo example applies to VRM 0.x (negate x and z of each
// quaternion). Applied once per frame on the procedural pose (idle, wave, nod, camera); GLB clips are left alone.
export function isVRM0(vrm) {
  return vrm?.meta?.metaVersion === '0';
}

export function mirrorPoseForVRM0(humanoid) {
  const bones = humanoid?.normalizedHumanBones;
  if (!bones) return 0;
  let flipped = 0;
  for (const bone of Object.values(bones)) {
    const q = bone?.node?.quaternion;
    if (!q) continue;
    q.x = -q.x; q.z = -q.z;
    flipped++;
  }
  return flipped;
}
