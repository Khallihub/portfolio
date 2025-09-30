declare module '@sanity/vision' {
  import type {Plugin} from 'sanity'
  const visionTool: (opts?: any) => Plugin
  export {visionTool}
  export default visionTool
}
