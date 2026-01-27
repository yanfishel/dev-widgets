import path from "node:path";

export const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@controllers': path.resolve(__dirname, 'src/controllers'),
  '@ipc': path.resolve(__dirname, 'src/ipc'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@views': path.resolve(__dirname, 'src/views'),
}