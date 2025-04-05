import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/d3-realtime-chart.js',
  output: {
    file: 'dist/d3-realtime-chart.js',
    format: 'es',
    name: 'RealtimeChart',
    exports: 'default',
  },
  plugins: [terser()],
}
