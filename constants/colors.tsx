
export const colors = {
    background: "#fff4f4",
    inputBg: "#fffbfb",
    primaryPink: "#ff2d98",
    deepPurple: "#120066",
    teal: "#0fc1df",
    lightLavender: "#eddfef",
  } as const;
  
  export type AppColors = keyof typeof colors;
  