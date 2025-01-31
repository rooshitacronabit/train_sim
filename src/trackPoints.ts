import * as THREE from "three";

import { railSegmentLength, SignalProps, trackspace } from "./common";

export const trackPoints = [
  // { start: 0, end: -1, jointStart: 2, jointEnd: -8, joint: [0, trackspace, 0, 100], trackLength: railSegmentLength * 2, line: 3, curvePath: "curveLeft", trackAngle: "curve1" }, // p1 line curve
  // { face: "reverse", start: 1, end: 2, jointStart: 2, jointEnd: -8, joint: [0, -200, 0, -100], trackLength: railSegmentLength * 3, line: 3, curvePath: "curveRight", trackAngle: "curve2" }, // 3 line curve


  // line 1
  { start: 3, end: -7, jointStart: 3, jointEnd: -10, joint: [trackspace, 0, trackspace, 0], line: 1 },
  { start: -7, end: -8, jointStart: 3, jointEnd: -10, joint: [0, 0, 0, -162], line: 1, curvePath: "curveLeft", trackLength: railSegmentLength * 1, trackAngle: "curve3" },
  { start: -2, end: -3, jointStart: -2, jointEnd: -2, joint: [0, trackspace, trackspace, trackspace], line: 1 }, // joint 1 
  { start: -3, end: -4, jointStart: -3, jointEnd: -3, joint: [0, trackspace, trackspace, trackspace], line: 1 }, // joint 2

  // line 2
  { start: 18, end: -9, jointStart: 15, jointEnd: -10, joint: [trackspace, trackspace, 0, trackspace], line: 2 },
  { start: -3, end: -4, jointStart: 15, jointEnd: -11, joint: [trackspace, trackspace, 0, 200], curvePath: "curveLeft", trackLength: railSegmentLength * 3, trackAngle: "curve1", line: 2 },
  { start: 7, end: 6, jointStart: 7, jointEnd: 7, joint: [trackspace, trackspace, trackspace * 2, trackspace], line: 2 },
  { start: 4, end: 3, jointStart: 4, jointEnd: 4, joint: [trackspace, trackspace, trackspace * 2, trackspace], line: 2 },
  { start: -6, end: -7, jointStart: -6, jointEnd: -6, joint: [trackspace, trackspace, 0, trackspace], line: 2 },


  // line 3
  { start: 18, end: -9, jointStart: 15, jointEnd: -10, joint: [trackspace * 2, trackspace * 2, 0, trackspace * 2], line: 3 },
  { start: -3, end: -4, jointStart: 15, jointEnd: -11, joint: [trackspace * 2, trackspace * 2, 0, 200], curvePath: "curveLeft", trackLength: railSegmentLength * 3, trackAngle: "curve2", line: 3 },
  { start: 8, end: 7, jointStart: 8, jointEnd: 8, joint: [trackspace * 2, trackspace * 2, trackspace, trackspace * 2], line: 3 },
  { start: -3, end: -4, jointStart: -3, jointEnd: -3, joint: [trackspace * 2, trackspace * 2, trackspace, trackspace * 2], line: 3 },
  { start: -5, end: -6, jointStart: -5, jointEnd: -5, joint: [trackspace * 2, trackspace * 2, trackspace, trackspace * 2], line: 3 },
  { start: -8, end: -9, jointStart: -8, jointEnd: -8, joint: [trackspace, trackspace * 2, trackspace * 2, trackspace * 2], line: 3 },


  // line 4
  { start: 2, end: -4, jointStart: 2, jointEnd: -3, joint: [trackspace * 3, trackspace * 5, trackspace * 2, trackspace * 5], line: 4 },
  { start: 4, end: 2, jointStart: 4, jointEnd: 2, joint: [trackspace * 2, trackspace * 3, trackspace * 3, trackspace * 3], line: 4 },
  // line 5
  { start: 2, end: -3, jointStart: 2, jointEnd: -2, joint: [trackspace * 4, trackspace * 6, trackspace * 5, trackspace * 6], line: 5 },
  { start: 3, end: 2, jointStart: 3, jointEnd: -10, joint: [trackspace * 3, trackspace * 4, 0, trackspace * 4], line: 5 },
  // line 6
  { start: 5, end: -5, jointStart: 5, jointEnd: -4, joint: [trackspace * 2, trackspace * 9, trackspace * 2, trackspace * 9], line: 6 },
  { start: -4, end: -5, jointStart: 5, jointEnd: -4, joint: [trackspace * 9, trackspace * 9, trackspace * 9, trackspace * 9], line: 6 },
  { start: -4, end: -5, jointStart: -4, jointEnd: -4, joint: [trackspace * 9, trackspace * 9, trackspace * 10, trackspace * 9], line: 6 },
  // line 7
  { start: 3, end: -9, jointStart: 3, jointEnd: -8, joint: [trackspace * 9, trackspace * 10, trackspace * 4, trackspace * 10], line: 7 },
  { start: -3, end: -4, jointStart: 15, jointEnd: -11, joint: [trackspace * 4, trackspace * 4, 0, 200], curvePath: "curveLeft", trackLength: railSegmentLength * 3, trackAngle: "curve5", line: 3 },
  { start: -29.335, end: -30.335, jointStart: 3, jointEnd: -10, joint: [trackspace, 200, trackspace, 220], line: 7, curvePath: "specialCurve2", trackLength: railSegmentLength / 2 },
  { start: -3, end: -4, jointStart: -3, jointEnd: -3, joint: [trackspace * 10, trackspace * 10, trackspace * 9, trackspace * 10], line: 7 },

  // line 8
  { start: 2, end: -3, jointStart: 2, jointEnd: -2, joint: [trackspace * 10, trackspace * 11, trackspace * 10, trackspace * 11], line: 8 },

  // // line 9
  { start: 0, end: -3, jointStart: 15, jointEnd: -2, joint: [0, trackspace * -5, trackspace * -4, trackspace * -5], line: 10 },
  // // line 10
  { start: 0, end: -4, jointStart: 15, jointEnd: -3, joint: [0, trackspace * -4, 0, trackspace * -4], line: 9, },


  // extra out line
  // { start: -91, end: -92, jointStart: 3, jointEnd: -10, joint: [trackspace, 200, trackspace, 200], line: 1 , curvePath: "straight",trackLength : 5},
  { start: -30, end: -31, jointStart: 3, jointEnd: -10, joint: [trackspace, 200, trackspace, 230], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -31, end: -32, jointStart: 3, jointEnd: -10, joint: [trackspace, 230, trackspace, 260], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -32, end: -33, jointStart: 3, jointEnd: -10, joint: [trackspace, 260, trackspace, 290], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -33, end: -34, jointStart: 3, jointEnd: -10, joint: [trackspace, 290, trackspace, 320], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -34, end: -35, jointStart: 3, jointEnd: -10, joint: [trackspace, 320, trackspace, 350], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -35, end: -36, jointStart: 3, jointEnd: -10, joint: [trackspace, 350, trackspace, 380], line: 2, curvePath: "straight", trackLength: railSegmentLength / 2 },
  { start: -36, end: -37, jointStart: 3, jointEnd: -10, joint: [trackspace, 380, trackspace, 410], line: 3, curvePath: "straight", trackLength: railSegmentLength / 2  },

  { start: -89, end: -90, jointStart: 3, jointEnd: -10, joint: [trackspace, 200, trackspace, 210], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -90, end: -91, jointStart: 3, jointEnd: -10, joint: [trackspace, 210, trackspace, 220], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -91, end: -92, jointStart: 3, jointEnd: -10, joint: [trackspace, 220, trackspace, 230], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -92, end: -93, jointStart: 3, jointEnd: -10, joint: [trackspace, 230, trackspace, 240], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -93, end: -94, jointStart: 3, jointEnd: -10, joint: [trackspace, 240, trackspace, 250], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -94, end: -95, jointStart: 3, jointEnd: -10, joint: [trackspace, 250, trackspace, 260], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -95, end: -96, jointStart: 3, jointEnd: -10, joint: [trackspace, 260, trackspace, 270], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -96, end: -97, jointStart: 3, jointEnd: -10, joint: [trackspace, 270, trackspace, 280], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -97, end: -98, jointStart: 3, jointEnd: -10, joint: [trackspace, 280, trackspace, 290], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -98, end: -99, jointStart: 3, jointEnd: -10, joint: [trackspace, 290, trackspace, 300], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -99, end: -100, jointStart: 3, jointEnd: -10, joint: [trackspace, 300, trackspace, 310], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -100, end: -101, jointStart: 3, jointEnd: -10, joint: [trackspace, 310, trackspace, 320], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -101, end: -102, jointStart: 3, jointEnd: -10, joint: [trackspace, 320, trackspace, 330], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -102, end: -103, jointStart: 3, jointEnd: -10, joint: [trackspace, 330, trackspace, 340], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -103, end: -104, jointStart: 3, jointEnd: -10, joint: [trackspace, 340, trackspace, 350], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -104, end: -105, jointStart: 3, jointEnd: -10, joint: [trackspace, 350, trackspace, 360], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -105, end: -106, jointStart: 3, jointEnd: -10, joint: [trackspace, 360, trackspace, 370], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -106, end: -107, jointStart: 3, jointEnd: -10, joint: [trackspace, 370, trackspace, 380], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -107, end: -108, jointStart: 3, jointEnd: -10, joint: [trackspace, 380, trackspace, 390], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -108, end: -109, jointStart: 3, jointEnd: -10, joint: [trackspace, 390, trackspace, 400], line: 3, curvePath: "straight", trackLength: 5 },
  { start: -109, end: -110, jointStart: 3, jointEnd: -10, joint: [trackspace, 400, trackspace, 410], line: 3, curvePath: "straight", trackLength: 5 },


  // DHRANGADHRA
  { face: "reverse", start: -15.667, end: -14.667, jointStart: 3, jointEnd: -10, joint: [350, 350, 350, 250], line: 3, curvePath: "curveLeft", trackLength: railSegmentLength * 1, trackAngle: "curve4" },
  { face: "reverse", start: -15.667, end: -14.667, jointStart: 3, jointEnd: -10, joint: [350, 350, 350, 440], line: 3, curvePath: "straight" },
  { face: "reverse", start: -14.667, end: -13.667, jointStart: 3, jointEnd: -10, joint: [350, 440, 350, 530], line: 3, curvePath: "straight" },
  { face: "reverse", start: -13.667, end: -12.667, jointStart: 3, jointEnd: -10, joint: [350, 530, 350, 620], line: 3, curvePath: "straight" },
  // { face: "reverse", start: -18.667, end: -17.667, jointStart: 3, jointEnd: -10, joint: [350, 600, 350, 680], line: 3, curvePath: "straight" },


];


export const signalsPoints = [


  { x: 350, y: 0, z: 6.5, facing: "forward", label: "S-66", type: "signal-digital" },
  { x: 280, y: 0, z: 0.5, facing: "forward", label: "S-69", type: "signal-starter" },

  { x: 55, y: 0, z: -0.7, facing: "reverse", label: "S-57", type: "signal-starter" },
  { x: 55, y: 0, z: 3, facing: "reverse", label: "S-59", type: "signal-main" },
  { x: 55, y: 0, z: 9.1, facing: "reverse", label: "S-53", type: "signal-starter", rotation: [0, Math.PI + 0.18, 0] },
  { x: 55, y: 0, z: 12.1, facing: "reverse", label: "S-49", type: "signal-starter", rotation: [0, Math.PI + 0.23, 0] },
  { x: 59, y: 0, z: 27, facing: "reverse", label: "S-61", type: "signal-starter" },
  { x: 40, y: 0, z: 30, facing: "reverse", label: "S-51", type: "signal-starter" },
  { x: 40, y: 0, z: 32.3, facing: "reverse", label: "S-45", type: "signal-starter" },


  { x: -58, y: 0, z: 0, facing: "forward", label: "S-28", type: "signal-starter-lunar-left" },
  { x: -73, y: 0, z: 6, facing: "forward", label: "S-30", type: "signal-starter" },
  { x: -58, y: 0, z: 15, facing: "forward", label: "S-32", type: "signal-starter" },
  { x: -58, y: 0, z: 18, facing: "forward", label: "S-34", type: "signal-starter" },
  { x: -83, y: 0, z: 27, facing: "forward", label: "S-46", type: "signal-starter-lunar-right" },
  { x: -65, y: 0, z: 30, facing: "forward", label: "S-40", type: "signal-starter-lunar-right" },
  { x: -65, y: 0, z: 33, facing: "forward", label: "S-42", type: "signal-starter-lunar-right" },

];

