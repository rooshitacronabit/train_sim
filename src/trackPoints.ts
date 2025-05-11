import * as THREE from "three";

import { railSegmentLength, SignalProps, trackspace } from "./common";

export const trackPoints = [

  // line 1
  { start: 3, end: -8, jointStart: 3, jointEnd: -10, joint: [trackspace, 0, trackspace, 0], line: 1 },


  // { start: -7, end: -8, jointStart: 3, jointEnd: 1, joint: [0, 0, 0, -20], line: 1, curvePath: "curveLeft", trackLength: railSegmentLength * 1 },

  { start: -4, end: -5 , jointStart: 3, jointEnd: 1, joint: [0, 0, 0, -69], line: 1, curvePath: "curveLeft", trackLength: railSegmentLength * 2},

  // { start: -9, end: -10, jointStart: 0, jointEnd: 1, joint: [-10, 0, 0, -90], line: 1, curvePath: "curveLeft", trackAngle:"curve3",trackLength: railSegmentLength * 1},

  { start: -2, end: -3, jointStart: -2, jointEnd: -2, joint: [0, trackspace, trackspace, trackspace], line: 1 }, // joint 1 
  { start: -3, end: -4, jointStart: -3, jointEnd: -3, joint: [0, trackspace, trackspace, trackspace], line: 1 }, // joint 2

  // line 2
  { start: 18, end: -10, jointStart: 15, jointEnd: -10, joint: [trackspace, trackspace, 0, trackspace], line: 2 },
   { start: -10, end: -30, jointStart: -9, jointEnd: -3, joint: [trackspace, trackspace,0, trackspace], line: 2 },
  // { start: -3, end: -4, jointStart: -1, jointEnd: -1, joint: [trackspace, trackspace, 0, 200], curvePath: "curveLeft", trackLength: railSegmentLength * 4, trackAngle: "curve1", line: 2 },
  { start: 7, end: 6, jointStart: 7, jointEnd: 7, joint: [trackspace, trackspace, trackspace * 2, trackspace], line: 2 },
  { start: 4, end: 3, jointStart: 4, jointEnd: 4, joint: [trackspace, trackspace, trackspace * 2, trackspace], line: 2 },
  { start: -6, end: -7, jointStart: -6, jointEnd: -6, joint: [trackspace, trackspace, 0, trackspace], line: 2 },


  // line 3
  // { start: 18, end: -9, jointStart: 15, jointEnd: -10, joint: [trackspace * 2, trackspace * 2, 0, trackspace * 2], line: 3 },
  { start: 18, end: -10, jointStart: 15, jointEnd: -10, joint: [trackspace*2, trackspace * 2, 0, trackspace * 2], line: 3 },
   { start: -10, end: -30, jointStart: -9, jointEnd: -3, joint: [trackspace * 2, trackspace * 2,0, trackspace * 2], line: 3 },
  // { start: -3, end: -4, jointStart: -1, jointEnd: -1, joint: [trackspace * 2, trackspace * 2, 0, 200], curvePath: "curveLeft", trackLength: railSegmentLength * 4, trackAngle: "curve2", line: 3 },
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
  { start: 3, end: -12, jointStart: 3, jointEnd: -11, joint: [trackspace * 9, trackspace * 10, trackspace * 2, trackspace * 10], line: 7 },


  // line 8
  { start: 2, end: -3, jointStart: 2, jointEnd: -2, joint: [trackspace * 10, trackspace * 11, trackspace * 10, trackspace * 11], line: 8 },

  // // line 9
  { start: 0, end: -3, jointStart: 15, jointEnd: -2, joint: [0, trackspace * -5, trackspace * -4, trackspace * -5], line: 10 },
  // // line 10
  { start: 0, end: -4, jointStart: 15, jointEnd: -3, joint: [0, trackspace * -4, 0, trackspace * -4], line: 9, },

  //Line 0_1
  { start: -13, end: -14, jointStart: 15, jointEnd: -10, joint: [trackspace * 0, trackspace * -3, trackspace * 0, trackspace * 1], line: 2 },  

  { start: -12, end: -13, jointStart: -10, jointEnd: -11, joint: [trackspace * 0, trackspace * -3, trackspace * 0, trackspace * -3], line: 2 },

  { start: -12, end: -13, jointStart: -9, jointEnd: -10, joint: [trackspace*  1, trackspace*-3, trackspace* -2, trackspace*1], line: 2 },

  { start: -5, end: -6, jointStart: -10, jointEnd: -8, joint: [-0, -69, 1 , -21], trackLength: railSegmentLength * 2, line: 2, curvePath: "curveRight" },  


// Line 0_2

  { start: -12, end: -13, jointStart: -10, jointEnd: -11, joint: [trackspace*  0, trackspace*-7, trackspace* 0, trackspace*-3], line: 2 },
  { start: -5, end: -6, jointStart: -10, jointEnd: -8, joint: [0, -69, 1 , -9], trackLength: railSegmentLength * 2, line: 2, curvePath: "curveRight" },

  { start: -9, end: -10, jointStart: 2, jointEnd: -8, joint: [0, 6, 0, 160], trackLength: railSegmentLength * 2, line: 3, curvePath: "curveLeft",trackAngle:"curve2", trackRotation: [0, (0*Math.PI),0] },
  
  // { start: -9, end: -10, jointStart: 15, jointEnd: -2, joint: [0, 194, 0, 95], trackLength: railSegmentLength * 2, line: 3, curvePath: "curveLeft",trackRotation: [0, 0 ,0] },

  {
    start: -16.84, end: -17.84, jointStart: 15, jointEnd: 2, joint: [trackspace*  0, trackspace*53.32, trackspace* 0, trackspace*53.32], line: 3 ,curvePath: "straight"
  },



  // { start: -9, end: -10 , jointStart: 1, jointEnd: 1, joint: [0, -150, 0, -69], line: 1, curvePath: "curveleft", trackLength: railSegmentLength * 1},
  { face:"reverse",start: -10, end: -9 , jointStart: 3, jointEnd: 1, joint: [0, -69, 0, -99], line: 1, curvePath: "curveRight", trackLength: railSegmentLength * 1},
  {face:"reverse",start: -9, end: -8 , jointStart: 1, jointEnd: 1, joint: [0, -99, 0, -129], line: 1, curvePath: "curveLeft", trackLength: railSegmentLength * 1},
  {start:-7.5, end:-8.5, jointStart:-1, jointEnd:3,joint: [0, -144, 0, -144], line: 1, curvePath:"straight",trackRotation: [0, (Math.PI / 2), 0]},

];


export const signalsPoints = [



  { x: -519, y: 0, z: 7.5, facing: "reverse", label: "S-2", type: "signal-main", rotation: [0, -Math.PI - 0.2, 0] }, //-


  { x: -540, y: 0, z: 2, facing: "forward", label: "S-5", type: "signal-main-lunar-right-three", rotation: [0, -1.5, 0] }, //-

  { x:-355, y: 0, z: -22, facing: "forward", label: "S-10", type: "signal-starter-lunar-right", rotation: [0, -Math.PI - 0.4, 0] }, //-??????????
  { x: -340, y: 0, z: 8, facing: "forward", label: "S-12", type: "signal-main", rotation: [0, -Math.PI - 0.4, 0] },


  { x:-350, y: 0, z: -8, facing: "forward", label: "S-14", type: "signal-starter-lunar-right", rotation: [0, -Math.PI - 0.4, 0] }, //-
  { x:  -160, y: 0, z: 7, facing: "forward", label: "S-16", type: "signal-starter-lunar-right"},//-


  { x: -162, y: 0, z: 30, facing: "reverse", label: "S-23", type: "signal-digital"}, //-
  { x: -9, y: 0, z: -16.5, facing: "reverse", label: "S-25", type: "signal-starter", rotation: [0, -0.05, 0] },//- 
  { x:  -10, y: 0, z: -13.5, facing: "reverse", label: "S-27", type: "signal-starter", rotation: [0, 0.1, 0] },//- 
  { x: -58, y: 0, z: 0, facing: "forward", label: "S-28", type: "signal-starter-lunar-left" },
  { x: -73, y: 0, z: 6, facing: "forward", label: "S-30", type: "signal-starter" },
  { x: -58, y: 0, z: 15, facing: "forward", label: "S-32", type: "signal-starter" },
  { x: -58, y: 0, z: 18, facing: "forward", label: "S-34", type: "signal-starter" },
  { x: railSegmentLength * 26, y: 0, z: trackspace * 2.4, facing: "forward", label: "S-36", type: "signal-starter-lunar-right"}, //-
  { x: railSegmentLength * 26, y: 0, z: trackspace * -2.4, facing: "forward", label: "S-38", type: "signal-starter-lunar-right"}, //-
  { x: -65, y: 0, z: 30, facing: "forward", label: "S-40", type: "signal-starter-lunar-right" },
  { x: -65, y: 0, z: 33, facing: "forward", label: "S-42", type: "signal-starter-lunar-right" },
  { x: 40, y: 0, z: 32.3, facing: "reverse", label: "S-45", type: "signal-starter" },
  { x: -83, y: 0, z: 27, facing: "forward", label: "S-46", type: "signal-starter-lunar-right" },

  { x: 55, y: 0, z: 12.1, facing: "reverse", label: "S-49", type: "signal-starter", rotation: [0, Math.PI + 0.23, 0] },
  { x: 40, y: 0, z: 30, facing: "reverse", label: "S-51", type: "signal-starter" },
  { x: -327 , y: 0, z: 32, facing: "forward", label: "S-52", type: "signal-starter-lunar-right", rotation: [0, -Math.PI - 0.4, 0] }, //
  { x: 55, y: 0, z: 9.1, facing: "reverse", label: "S-53", type: "signal-starter", rotation: [0, Math.PI + 0.18, 0] },
  { x: 55, y: 0, z: -0.7, facing: "reverse", label: "S-57", type: "signal-starter" },
  { x: 55, y: 0, z: 3, facing: "reverse", label: "S-59", type: "signal-main" },
  { x: 59, y: 0, z: 27, facing: "reverse", label: "S-61", type: "signal-starter" },
  { x: 350, y: 0, z: 6.5, facing: "forward", label: "S-66", type: "signal-digital" },
  { x: 280, y: 0, z: 0.5, facing: "forward", label: "S-69", type: "signal-starter" },

];



export const signalData = [
  { label: "S-2", content: "This is S-2", imagePath: "./signalsPhotos/2.png", audioPath: "s2-new.mp3" },
  { label: "S-5", content: "This is S-5", imagePath: "./signalsPhotos/5.png", audioPath: "s5-new.mp3" },
  { label: "S-10", content: "This is S-10", imagePath: "./signalsPhotos/10.png", audioPath: "s10-new.mp3" },
  { label: "S-12", content: "This is S-12", imagePath: "./signalsPhotos/18.png", audioPath: "s18-new.mp3" },
  { label: "S-14", content: "This is S-14", imagePath: "./signalsPhotos/20.png", audioPath: "s20-new.mp3" },
  { label: "S-16", content: "This is S-16", imagePath: "./signalsPhotos/22.png", audioPath: "s22-new.mp3" },
  { label: "S-23", content: "This is S-23", imagePath: "./signalsPhotos/23.png", audioPath: "s23-new.mp3" },
  { label: "S-25", content: "This is S-25", imagePath: "./signalsPhotos/25.png", audioPath: "s25-new.mp3" },
  { label: "S-27", content: "This is S-27", imagePath: "./signalsPhotos/27.png", audioPath: "s27-new.mp3" },
  { label: "S-28", content: "This is S-28", imagePath: "./signalsPhotos/28.png", audioPath: "s28-new.mp3" },
  { label: "S-30", content: "This is S-30", imagePath: "./signalsPhotos/30.png", audioPath: "s30-new.mp3" },
  { label: "S-32", content: "This is S-32", imagePath: "./signalsPhotos/32.png", audioPath: "s32-new.mp3" },
  { label: "S-34", content: "This is S-34", imagePath: "./signalsPhotos/34.png", audioPath: "s34-new.mp3" },
  { label: "S-36", content: "This is S-36", imagePath: "./signalsPhotos/36.png", audioPath: "s36-new.mp3" },
  { label: "S-38", content: "This is S-38", imagePath: "./signalsPhotos/38.png", audioPath: "s38-new.mp3" },
  { label: "S-40", content: "This is S-40", imagePath: "./signalsPhotos/40.png", audioPath: "s40-new.mp3" },
  { label: "S-41", content: "This is S-42", imagePath: "./signalsPhotos/42.png", audioPath: "s42-new.mp3" },
  { label: "S-45", content: "This is S-45", imagePath: "./signalsPhotos/45.png", audioPath: "s45-new.mp3" },
  { label: "S-46", content: "This is S-46", imagePath: "./signalsPhotos/46.png", audioPath: "s46-new.mp3" },
  { label: "S-49", content: "This is S-49", imagePath: "./signalsPhotos/49.png", audioPath: "s49-new.mp3" },
  { label: "S-51", content: "This is S-51", imagePath: "./signalsPhotos/51.png", audioPath: "s51-new.mp3" },
  { label: "S-52", content: "This is S-52", imagePath: "./signalsPhotos/52.png", audioPath: "s52-new.mp3" },
  { label: "S-53", content: "This is S-53", imagePath: "./signalsPhotos/53.png", audioPath: "s53-new.mp3" },
  { label: "S-57", content: "This is S-57", imagePath: "./signalsPhotos/57.png", audioPath: "s57-new.mp3" },
  { label: "S-59", content: "This is S-59", imagePath: "./signalsPhotos/59.png", audioPath: "s59-new.mp3" },
  { label: "S-61", content: "This is S-61", imagePath: "./signalsPhotos/61.png", audioPath: "s61-new.mp3" },
  { label: "S-66", content: "This is S-66", imagePath: "./signalsPhotos/66.png", audioPath: "s66-new.mp3" },
  { label: "S-69", content: "This is S-69", imagePath: "./signalsPhotos/69.png", audioPath: "s69-new.mp3" },
];



