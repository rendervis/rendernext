A collection of sketches, agents and games

p5.js drawings with hot reload. shared drawing with a ReactComponent that can be integrated with reactJS and nextJS applications.

## react import

```
import { Sketch1React } from 'p5playground'
```

## nextJS import

```
 const Sketch1React = dynamic(
   () =>
     import('p5playground').then((mod) => {
       return mod.Sketch1React
     }),
   {
     ssr: false,
   }
 )
 const sketchProps = {
   id: 'p5-container-home',
   backgroundColor: '#f0f0f0',
   // Add any other desired props here
 }
```
