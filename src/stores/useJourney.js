import create from 'zustand';

export default create((set) => {
  return {
    positionZ: -80,
    setPosition: (position) => {
      set(() => {
        return {
          positionZ: position - 80,
        };
      });
    },
    section: 'start',
    setSection: (section) => {
      set(() => {
        return {
          section: section,
        };
      });
    },
    texture: 0,
    setTexture: (texture) => {
      set(() => {
        return {
          texture: texture,
        };
      });
    },
  };
});

// export default create((set) => {
//   return {
//     positionZ: 0,
//     setPosition: (position) => {
//       set(() => {
//         return {
//           positionZ: position,
//         };
//       });
//     },
//   };
// });
