import * as THREE from "three";

import { railSegmentLength, SignalProps, trackspace } from "./common";

export const trackPoints = [



  //   // line 1
  { start: 5, end: 0, jointStart: 5, jointEnd: 0, joint: [trackspace - 6.5, trackspace - 8.5, trackspace - 8.5, trackspace - 8.5], trackLength: 15, line: 1 }, // 1 line

  //   // line 2
  { start: 6, end: 0, jointStart: 6, jointEnd: 0, joint: [0, trackspace - 6.5, trackspace - 6.5, trackspace - 6.5], trackLength: 15, line: 2 }, // 2 line

  //   // line 3 
  { face: "reverse", start: -10, end: 3, jointStart: 0, jointEnd: -2, joint: [-200, -200, -200, -200], line: 3 }, // 3 line
  { face: "reverse", start: 1, end: 2, jointStart: 2, jointEnd: -8, joint: [0, -200, 0, -100], trackLength: railSegmentLength * 3, line: 3, curvePath: "curveRight", trackAngle: "curve2" }, // 3 line curve
  { start: 2, end: 1, jointStart: 2, jointEnd: -8, joint: [-100, -100, 0, 0], trackLength: railSegmentLength * 3, line: 3, curvePath: "curveRight", trackAngle: "curve1" }, // 3 line curve  
  { start: 3, end: -3, jointStart: 2, jointEnd: -2, joint: [0, 0, trackspace, 0], line: 3 }, // 3 line


  // line 4
  { start: 31, end: 2, jointStart: 2, jointEnd: 3, joint: [trackspace + 6, trackspace + 6, trackspace + 1, trackspace + 6], line: 4 }, // 4 line
  { start: 2, end: 1, jointStart: 0, jointEnd: 0, joint: [trackspace, trackspace + 1, trackspace, trackspace], line: 4 }, // 4 line
  { start: 1, end: -3, jointStart: 0, jointEnd: 0, joint: [trackspace, trackspace, trackspace, trackspace], line: 4 }, // 4 line
  { start: -1, end: -2, jointStart: 2, jointEnd: -8, joint: [0, trackspace, 0, 300], trackLength: railSegmentLength * 3, line: 3, curvePath: "curveLeft", trackAngle: "curve1" }, // p1 line curve

  { face: "reverse", start: -3, end: -2, jointStart: 5, jointEnd: 5, joint: [0, 300, 0, 305], line: 3, curvePath: "straight" }, // p1 line 
  { face: "reverse", start: -2, end: -1, jointStart: 2, jointEnd: -8, joint: [0, 305, 0, 310], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: -1, end: 0, jointStart: 2, jointEnd: -8, joint: [0, 310, 0, 315], line: 4, curvePath: "straight" }, // p2 line
  { face: "reverse", start: 0, end: 1, jointStart: 2, jointEnd: -8, joint: [0, 315, 0, 320], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 1, end: 2, jointStart: 2, jointEnd: -8, joint: [0, 320, 0, 325], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 2, end: 3, jointStart: 2, jointEnd: 0, joint: [325, 325, 0, 330], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 3, end: 4, jointStart: 2, jointEnd: -8, joint: [0, 330, 0, 335], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 4, end: 5, jointStart: 2, jointEnd: -8, joint: [0, 335, 0, 340], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 5, end: 6, jointStart: 2, jointEnd: -8, joint: [0, 340, 0, 345], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 6, end: 7, jointStart: 2, jointEnd: -8, joint: [0, 345, 0, 350], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 7, end: 8, jointStart: 2, jointEnd: -8, joint: [0, 350, 0, 355], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 8, end: 9, jointStart: 2, jointEnd: -8, joint: [0, 355, 0, 360], line: 4, curvePath: "straight" }, // p2 line 
  { face: "reverse", start: 9, end: 10, jointStart: 2, jointEnd: -8, joint: [0, 360, 0, 365], line: 4, curvePath: "straight" }, // p2 line 



  // line 5
  { start: 2, end: -3, jointStart: 2, jointEnd: -2, joint: [trackspace + 4.5, trackspace + 4.5, trackspace + 11.2, trackspace + 4.5], line: 5 }, // 5 line


  // line 6
  { start: 3, end: -3, jointStart: 3, jointEnd: -2, joint: [trackspace + 6, trackspace + 7.1, trackspace + 11.2, trackspace + 7.1], line: 6 }, // 6 line


  // // line 7
  { start: 31, end: -3, jointStart: 0, jointEnd: 0, joint: [trackspace + 11.2, trackspace + 11.2, trackspace + 11.2, trackspace + 11.2], line: 7 }, // 7 line
  { start: -1, end: -2, jointStart: 2, jointEnd: -8, joint: [0, trackspace + 11.2, 0, 297], trackLength: railSegmentLength * 3, line: 3, curvePath: "curveLeft", trackAngle: "curve2" }, // p1 line curve

  { face: "reverse", start: -3, end: -2, jointStart: 2, jointEnd: -8, joint: [0, 297, 0, 302], line: 7, curvePath: "straight" },
  { face: "reverse", start: -2, end: -1, jointStart: 2, jointEnd: -8, joint: [0, 302, 0, 307], line: 7, curvePath: "straight" },
  { face: "reverse", start: -1, end: 0, jointStart: 2, jointEnd: -8, joint: [0, 307, 0, 312], line: 7, curvePath: "straight" },
  { face: "reverse", start: 0, end: 1, jointStart: 2, jointEnd: -8, joint: [0, 312, 0, 317], line: 7, curvePath: "straight" },
  { face: "reverse", start: 1, end: 2, jointStart: 2, jointEnd: -8, joint: [0, 317, 0, 322], line: 7, curvePath: "straight" },
  { face: "reverse", start: 2, end: 3, jointStart: 2, jointEnd: -8, joint: [322, 322, 0, 327], line: 7, curvePath: "straight" },
  { face: "reverse", start: 3, end: 4, jointStart: 2, jointEnd: -8, joint: [0, 327, 0, 332], line: 7, curvePath: "straight" },
  { face: "reverse", start: 4, end: 5, jointStart: 2, jointEnd: -8, joint: [0, 332, 0, 337], line: 7, curvePath: "straight" },
  { face: "reverse", start: 5, end: 6, jointStart: 2, jointEnd: -8, joint: [0, 337, 0, 342], line: 7, curvePath: "straight" },
  { face: "reverse", start: 6, end: 7, jointStart: 2, jointEnd: -8, joint: [0, 342, 0, 347], line: 7, curvePath: "straight" },
  { face: "reverse", start: 7, end: 8, jointStart: 2, jointEnd: -8, joint: [0, 347, 0, 352], line: 7, curvePath: "straight" },
  { face: "reverse", start: 8, end: 9, jointStart: 2, jointEnd: -8, joint: [0, 352, 0, 357], line: 7, curvePath: "straight" },
  { face: "reverse", start: 9, end: 10, jointStart: 2, jointEnd: -8, joint: [0, 357, 0, 362], line: 7, curvePath: "straight" },

  // // { start: -11, end: -12, jointStart: 2, jointEnd: 1, joint: [0, trackspace + 236, trackspace + 215, trackspace + 270], curvePath: "specialCurve1", line: 3 },
  //   // { start: -12, end: -13, jointStart: 2, jointEnd: 1, joint: [0, trackspace + 270, trackspace + 215, trackspace + 292], curvePath: "specialCurve2", line: 3 },
  //   // { start: -10, end: -11, jointStart: 2, jointEnd: 1, joint: [0, trackspace + 230, trackspace + 215, trackspace + 242.5], curvePath: "specialCurve2", line: 3 },



  //  -------------------------Extra tracks---------------------------------------
  //  line 8
  { start: 3, end: -2, jointStart: 0, jointEnd: 0, joint: [trackspace + 15, trackspace + 15, trackspace + 15, trackspace + 15], line: 8 }, // 7 line
  { start: -2, end: -3, jointStart: 2, jointEnd: -8, joint: [trackspace + 15, trackspace + 15, trackspace + 16, trackspace + 16], line: 8, curvePath: "curveLeft" }, // p2 line curve
  { start: 2, end: -1, jointStart: 2, jointEnd: 0, joint: [trackspace + 15, trackspace + 19, trackspace + 19, trackspace + 19], line: 8 }, // 7 line

  // line 9
  { start: 3, end: 2, jointStart: 3, jointEnd: 2, joint: [trackspace + 11.2, trackspace + 15, trackspace + 19, trackspace + 15], line: 9 }, // 7 line
  { start: 0, end: -1, jointStart: 0, jointEnd: -1, joint: [trackspace + 19, trackspace + 19, trackspace + 19, trackspace + 15], line: 9 }, // 7 line

  // ---------------------------- Joints ------------------------------------


  // -------- p1 Joints ---------
  { start: 1, end: 0, jointStart: 2, jointEnd: 1, joint: [trackspace - 8.5, trackspace - 8.5, trackspace - 6.5, trackspace - 6.5], trackLength: 15, line: 1 }, // 1-2 line

  //   // //------------------ p2 joints --------------------
  { start: 2, end: 1, jointStart: 2, jointEnd: 1, joint: [trackspace + 1, trackspace, 0, 0], line: 3 }, // 3-4 line
  { start: -1, end: -2, jointStart: -1, jointEnd: -2, joint: [trackspace, trackspace, trackspace, 0], line: 3 }, // 4-3 lines
  { start: 3, end: 2, jointStart: 2, jointEnd: -8, joint: [-100, -100, trackspace + 6, trackspace + 6], trackLength: railSegmentLength * 2, line: 3, curvePath: "curveRight", trackAngle: "curve1" }, // 3c-4 curve

  { start: 4, end: 3, jointStart: 4, jointEnd: 3, joint: [trackspace + 6, trackspace + 11.2, trackspace + 5.5, trackspace + 11.2], line: 7 }, // 4-7 lines


  // // ------------p3 joint --------------------
  { start: 2, end: 1, jointStart: 2, jointEnd: 1, joint: [trackspace + 7.1, trackspace + 7.1, trackspace + 4.5, trackspace + 4.5], line: 1 }, // 1 line

  // //  --------------- p4 line joint --------------------
  // { start: 3, end: 2, jointStart: 2, jointEnd: 1, joint: [trackspace + 5.5, trackspace + 6, trackspace + 5.5, trackspace + 7.1], line: 6, }, // 6 line

  // //-------------- p5 joints ---------------
  { start: 3, end: 2, jointStart: 2, jointEnd: 3, joint: [trackspace + 7.1, trackspace + 11.2, trackspace + 7.1, trackspace + 11.2], line: 7 }, // 7 line
  { start: -1, end: -2, jointStart: -1, jointEnd: -2, joint: [trackspace + 15, trackspace + 15, trackspace + 19, trackspace + 11.2], line: 7 }, // 7 line
  { start: 6, end: 5, jointStart: 5, jointEnd: 6, joint: [trackspace + 7.1, trackspace + 11.2, trackspace + 6, trackspace + 11.2], line: 7 }, // 7 line


  { start: 20, end: 19, jointStart: 19, jointEnd: 20, joint: [trackspace + 6, trackspace + 11.2, trackspace + 6, trackspace + 11.2], line: 7 }, // 7 line
  { start: 4, end: 3, jointStart: 2, jointEnd: 1, joint: [trackspace + 6, trackspace + 6, 0, 0], line: 3 }, // 3-4 line

  // yard Lines

  { start: 17, end: 11, jointStart: 17, jointEnd: 9, joint: [trackspace + 6, trackspace - 3, trackspace + 4, trackspace - 3], line: 7 }, // 7 line
  { start: 16, end: 11, jointStart: 0, jointEnd: 0, joint: [trackspace - 5, trackspace + 1, trackspace - 5, trackspace + 1], line: 7 }, // 7 line
  { start: 11, end: 10, jointStart: 18, jointEnd: 11, joint: [trackspace + 6, trackspace - 3, trackspace + 6, trackspace - 3], line: 7 }, // 7 line
  { start: 12, end: 11, jointStart: 11, jointEnd: 12, joint: [trackspace + 1, trackspace + 1, trackspace - 3, trackspace - 5], line: 7 }, // 7 line
  { start: 16, end: 15, jointStart: 15, jointEnd: 16, joint: [trackspace - 3, trackspace - 3, trackspace + 1, trackspace + 1], line: 7 }, // 7 line

  // old RS Track
  { start: -1, end: -2, jointStart: 15, jointEnd: 16, joint: [300, 307, 300, 305], line: 7, curvePath: "specialCurve2" }, // 7 line
  { start: 0, end: -1, jointStart: 15, jointEnd: 16, joint: [300, 315, 300, 307], line: 7, curvePath: "specialCurve1" }, // 7 line
  { start: -6, end: -7, jointStart: 15, jointEnd: 16, joint: [300, 297, 300, 270], line: 7, curvePath: "curveLeft", trackLength: 15 }, // 7 line

];


export const signalsPoints = [

  // // For Testing
  // { x: railSegmentLength * 0, y: 5, z: -6, facing: "forward", label: "S-9", type: "signal-main" },
  // { x: railSegmentLength * 0, y: 5, z: -5, facing: "forward", label: "S-8", type: "signal-main-lunar" },
  // { x: railSegmentLength * 0, y: 5, z: -4, facing: "forward", label: "S-7", type: "signal-main-lunar-left" },
  // { x: railSegmentLength * 0, y: 5, z: -3, facing: "forward", label: "S-6", type: "signal-main-lunar-right" },
  // { x: railSegmentLength * 0, y: 5, z: -2, facing: "forward", label: "S-5", type: "signal-main-analog" },
  // { x: railSegmentLength * 0, y: 5, z: -1, facing: "forward", label: "S-", type: "signal-starter" },
  // { x: railSegmentLength * 0, y: 5, z: 0, facing: "forward", label: "S-24", type: "signal-starter-lunar" },
  // { x: railSegmentLength * 0, y: 5, z: 1, facing: "forward", label: "S-5", type: "signal-starter-lunar-right" },
  // { x: railSegmentLength * 0, y: 5, z: 2, facing: "forward", label: "S-24", type: "signal-starter-lunar-left" },
  // { x: railSegmentLength * 0, y: 5, z: 3, facing: "forward", label: "S-24", type: "signal-four-light" },
  // { x: railSegmentLength * 0, y: 5, z: 4, facing: "reverse", label: "S-100", type: "signal-main-lunar-right-two-model" },
  // { x: railSegmentLength * 0, y: 5, z: 5, facing: "reverse", label: "S-3", type: "signal-home-four-light-lunar-model" },
  // { x: railSegmentLength * 0, y: 5, z: 6, facing: "forward", label: "S-3", type: "signal-home-four-light-lunar-right-model" },
  // { x: -0, y: 5, z: 0, facing: "reverse", label: "S-5", type: "signal-main-lunar-right-three", rotation: [0, -1.5, 0] },

  // { x: railSegmentLength * 0, y: 5, z: 0, facing: "forward", label: "3", type: "signal-digital" },

  { x: 119, y: 0, z: 332, facing: "forward", label: "S-2", type: "signal-main", rotation: [0, -Math.PI - 0.2, 0] },
  { x: 124, y: 0, z: 336, facing: "reverse", label: "S-3", type: "signal-home-four-light-lunar-right-model", rotation: [0, -0.2, 0] },
  { x: 124, y: 0.15, z: 336, facing: "reverse", label: "S-3", type: "signal-digital", rotation: [0, -0.2, 0] },
  { x: -180, y: 0, z: 152, facing: "reverse", label: "S-5", type: "signal-main-lunar-right-three", rotation: [0, -1.5, 0] },
  { x: -104.5, y: 0, z: 292.5, facing: "forward", label: "S-10", type: "signal-main", rotation: [0, -Math.PI - 0.4, 0] },
  { x: railSegmentLength * -2.3, y: 0, z: trackspace * 5, facing: "forward", label: "S-18", type: "signal-main" },
  { x: railSegmentLength * -1, y: 0, z: trackspace * 4.8, facing: "forward", label: "S-20", type: "signal-main" },
  { x: railSegmentLength * 0, y: 0, z: trackspace * 6.1, facing: "forward", label: "S-22", type: "signal-starter" },
  { x: railSegmentLength * 0, y: 0, z: trackspace * 7.5, facing: "forward", label: "S-24", type: "signal-starter" },
  { x: railSegmentLength * -2.2, y: 0, z: trackspace * 3.5, facing: "forward", label: "S-26", type: "signal-starter", rotation: [0, 0, 0] },
  { x: railSegmentLength * -2.2, y: 0, z: trackspace * 2.7, facing: "forward", label: "S-28", type: "signal-starter", rotation: [0, 0.1, 0] },
  { x: railSegmentLength * -2.5, y: 0, z: 3, facing: "forward", label: "S-30", type: "signal-starter", rotation: [0, 0, 0] },
  // { x: railSegmentLength * 1.5, y: 0, z: trackspace * -2, facing: "reverse", label: "S-31", type: "signal-starter-lunar-left" },
  { x: railSegmentLength * 1.5, y: 0, z: trackspace * -2, facing: "reverse", label: "S-31", type: "signal-main-lunar-left" },
  
  { x: railSegmentLength * -1.95, y: 0, z: trackspace * 0.1, facing: "forward", label: "S-32", type: "signal-starter" },
  { x: railSegmentLength * 1.45, y: 0, z: trackspace * -1.1, facing: "reverse", label: "S-33", type: "signal-main-lunar-left" },
  { x: railSegmentLength * -0.8, y: 0, z: trackspace * 0.5, facing: "forward", label: "S-34", type: "signal-starter", rotation: [0, -0.05, 0] },
  { x: railSegmentLength * 0.7, y: 0, z: trackspace * 0, facing: "reverse", label: "S-35", type: "signal-main-lunar-left" },
  { x: railSegmentLength * -1.2, y: 0, z: trackspace * 0.1, facing: "forward", label: "S-36", type: "signal-starter" },
  { x: railSegmentLength * 1, y: 0, z: trackspace * 0.9, facing: "reverse", label: "S-37", type: "signal-main-lunar-right" },
  { x: railSegmentLength * 0.55, y: 0, z: trackspace * -1.1, facing: "forward", label: "S-38", type: "signal-starter", rotation: [0, -0.05, 0] },
  { x: railSegmentLength * 1, y: 0, z: trackspace * 2.4, facing: "reverse", label: "S-39", type: "signal-starter-lunar-right" },
  { x: railSegmentLength * 0.55, y: 0, z: trackspace * -1.8, facing: "forward", label: "S-40", type: "signal-starter", rotation: [0, 0.1, 0] },
  { x: railSegmentLength * 1, y: 0, z: trackspace * 3.3, facing: "reverse", label: "S-41", type: "signal-starter-lunar-right" },
  { x: railSegmentLength * 2, y: 0, z: trackspace * 4.7, facing: "reverse", label: "S-43", type: "signal-starter-lunar-right" },
  { x: railSegmentLength * 1, y: 0, z: trackspace * 5.8, facing: "reverse", label: "S-45", type: "signal-starter-lunar-right" },
  { x: railSegmentLength * 1, y: 0, z: trackspace * 7.2, facing: "reverse", label: "S-47", type: "signal-starter-lunar-right" },
  { x: railSegmentLength * 7.5, y: 0, z: 4.8 * trackspace, facing: "forward", label: "S-60", type: "signal-main-lunar" },
  { x: railSegmentLength * 7.49, y: 0.15, z: 4.8 * trackspace, facing: "forward", label: "S-60", type: "signal-digital" },
  { x: railSegmentLength * 9.5, y: 0, z: trackspace * 2.85, facing: "reverse", label: "S-61", type: "signal-main-lunar-right-two-model" },
  { x: 8.5, y: 0.15, z: -200.05, facing: "forward", label: "S-66", type: "signal-starter-lunar", rotation: [0, -Math.PI, 0] },
  { x: 8.5, y: 0.15, z: -200.05, facing: "forward", label: "S-66", type: "signal-digital", rotation: [0, -Math.PI, 0] },
  { x: 164, y: 0, z: -150, facing: "reverse", label: "S-69", type: "signal-main", rotation: [0, -1.2, 0] },
  { x: railSegmentLength * 16, y: 0.15, z: 3 * trackspace, facing: "reverse", label: "S-81", type: "signal-main" },
  { x: railSegmentLength * 19.5, y: 0.15, z: 4.8 * trackspace, facing: "forward", label: "S-98", type: "signal-four-light" },
  { x: railSegmentLength * 21.5, y: 0.15, z: 2.85 * trackspace, facing: "reverse", label: "S-99", type: "signal-main" },
  { x: railSegmentLength * 22.5, y: 0.15, z: 4.8 * trackspace, facing: "forward", label: "S-100", type: "signal-main-lunar-right-two-model" },


];
export const excludedSignalsForGrassDrySingle = ["S-38", "S-40", "S-34", "S-36"];
export const grassDrySinglePositionOverrides = {
  "S-98": [-0.5, 0, 0.8],
  "S-100": [-0.5, 0, 0.8],
  "S-60": [-0.5, 0, 0.8],
  "S-22": [-0.5, 0, 0.8],
  "S-24": [-0.5, 0, 0.8],
  "S-20": [-0.5, 0, 0.8],
  "S-28": [-0.5, 0, 0.8],
  "S-26": [-0.5, 0, 0.8],
  "S-18": [-0.5, 0, 0.8],
  "S-30": [-0.5, 0, 0.8],
  "S-32": [-0.5, 0, 0.8],
  "S-5": [-0.95, 0, -0.9],
  "S-3": [-1.2, 0, 0.5],
  "S-2": [0.2, 0, -1.1],
  "S-69": [-1.5, 0, -0.8],
};
export const signalData = [
  { label: "S-2", content: "This is S-2", imagePath: "./signalsPhotos/2.png", audioPath: "s2-new.mp3" },
  { label: "S-3", content: "This is S-3", imagePath: "./signalsPhotos/3.png", audioPath: "s3-new.mp3" },
  { label: "S-5", content: "This is S-5", imagePath: "./signalsPhotos/5.png", audioPath: "s5-new.mp3" },
  { label: "S-10", content: "This is S-10", imagePath: "./signalsPhotos/10.png", audioPath: "s10-new.mp3" },
  { label: "S-18", content: "This is S-18", imagePath: "./signalsPhotos/18.png", audioPath: "s18-new.mp3" },
  { label: "S-20", content: "This is S-20", imagePath: "./signalsPhotos/20.png", audioPath: "s20-new.mp3" },
  { label: "S-22", content: "This is S-22", imagePath: "./signalsPhotos/22.png", audioPath: "s22-new.mp3" },
  { label: "S-24", content: "This is S-24", imagePath: "./signalsPhotos/24.png", audioPath: "s24-new.mp3" },
  { label: "S-26", content: "This is S-26", imagePath: "./signalsPhotos/26.png", audioPath: "s26-new.mp3" },
  { label: "S-28", content: "This is S-28", imagePath: "./signalsPhotos/28.png", audioPath: "s28-new.mp3" },
  { label: "S-30", content: "This is S-30", imagePath: "./signalsPhotos/30.png", audioPath: "s30-new.mp3" },
  { label: "S-31", content: "This is S-31", imagePath: "./signalsPhotos/31.png", audioPath: "s31-new.mp3" },
  { label: "S-32", content: "This is S-32", imagePath: "./signalsPhotos/32.png", audioPath: "s32-new.mp3" },
  { label: "S-33", content: "This is S-33", imagePath: "./signalsPhotos/33.png", audioPath: "s33-new.mp3" },
  { label: "S-34", content: "This is S-34", imagePath: "./signalsPhotos/34.png", audioPath: "s34-new.mp3" },
  { label: "S-35", content: "This is S-35", imagePath: "./signalsPhotos/35.png", audioPath: "s35-new.mp3" },
  { label: "S-36", content: "This is S-36", imagePath: "./signalsPhotos/36.png", audioPath: "s36-new.mp3" },
  { label: "S-37", content: "This is S-37", imagePath: "./signalsPhotos/37.png", audioPath: "s37-new.mp3" },
  { label: "S-38", content: "This is S-38", imagePath: "./signalsPhotos/38.png", audioPath: "s38-new.mp3" },
  { label: "S-39", content: "This is S-39", imagePath: "./signalsPhotos/39.png", audioPath: "s39-new.mp3" },
  { label: "S-40", content: "This is S-40", imagePath: "./signalsPhotos/40.png", audioPath: "s40-new.mp3" },
  { label: "S-41", content: "This is S-41", imagePath: "./signalsPhotos/41.png", audioPath: "s41-new.mp3" },
  { label: "S-43", content: "This is S-43", imagePath: "./signalsPhotos/43.png", audioPath: "s43-new.mp3" },
  { label: "S-45", content: "This is S-45", imagePath: "./signalsPhotos/45.png", audioPath: "s45-new.mp3" },
  { label: "S-47", content: "This is S-47", imagePath: "./signalsPhotos/47.png", audioPath: "s47-new.mp3" },
  { label: "S-60", content: "This is S-60", imagePath: "./signalsPhotos/60.png", audioPath: "s60-new.mp3" },
  { label: "S-61", content: "This is S-61", imagePath: "./signalsPhotos/61.png", audioPath: "s61-new.mp3" },
  { label: "S-66", content: "This is S-66", imagePath: "./signalsPhotos/66.png", audioPath: "s66-new.mp3" },
  { label: "S-69", content: "This is S-69", imagePath: "./signalsPhotos/69.png", audioPath: "s69-new.mp3" },
  { label: "S-81", content: "This is S-81", imagePath: "./signalsPhotos/81.png", audioPath: "s81-new.mp3" },
  { label: "S-98", content: "This is S-98", imagePath: "./signalsPhotos/98.png", audioPath: "s98-new.mp3" },
  { label: "S-99", content: "This is S-99", imagePath: "./signalsPhotos/99.png", audioPath: "s99-new.mp3" },
  { label: "S-100", content: "This is S-100", imagePath: "./signalsPhotos/100.png", audioPath: "s100-new.mp3" },
];

export const texturePoints = [
  // p1-2

  {
    position: new THREE.Vector3(35, -0.1, 1.5),
    rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
    scale: new THREE.Vector3(1, 1, 1)

  },
  {
    position: new THREE.Vector3(40, -0.1, 1.5),
    rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
    scale: new THREE.Vector3(1, 1, 1)

  },



  //  p1a-b
  {
    position: new THREE.Vector3(45, -0.1, -4),
    rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
    scale: new THREE.Vector3(1, 1, 1)
  },

]

export const treesPosition = [
  { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(2, 2, 2,) },
  { position: new THREE.Vector3(5, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(2, 2, 2,) },
  { position: new THREE.Vector3(15, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1) },
  { position: new THREE.Vector3(25, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 2, 1) },
  { position: new THREE.Vector3(35, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1) },
  { position: new THREE.Vector3(45, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 2, 1) },
  { position: new THREE.Vector3(55, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1.2, 1) },
  { position: new THREE.Vector3(65, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 0.3, 1) },
  { position: new THREE.Vector3(75, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 2) },
  { position: new THREE.Vector3(85, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1) },
  { position: new THREE.Vector3(95, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(2, 1, 1) },
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},
  // {position : new THREE.Vector3(0,0,0),rotation : new THREE.Euler(0,0,0),scale:new THREE.Vector3(0,0,0)},

]