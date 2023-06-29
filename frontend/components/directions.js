const directions = {
    0: {
      left: false,
      up:false,
      right: 1,
      down:3
    },
    1: {
      left: 0,
      up:false,
      right: 2,
      down:4
    },
    2: {
      left: 1,
      up:false,
      right: false,
      down:5
    },
    3: {
      left: false,
      up:0,
      right: 4,
      down:6
    },
    4: {
      left: 3,
      up:1,
      right: 5,
      down:7
    },
    5: {
      left: 4,
      up:2,
      right: false,
      down:8
    },
    6: {
      left: false,
      up:3,
      right: 7,
      down:false
    },
    7: {
      left: 6,
      up:4,
      right: 8,
      down:false
    },
    8: {
      left: 7,
      up:5,
      right: false,
      down:false
    },
  };

  export default directions;