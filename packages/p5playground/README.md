A collection of sketches, agents and games.

The end goal is to integrate the sketches in react and nextJS applications
in some way, either to showcase or enhance the user experience.

p5.js drawings with hot reload. shared drawing with a ReactComponent that can be integrated with reactJS and nextJS applications.

The sketches are interpretations or adaptations from several sources as part of study. At the time these sources are:
Daniel Shiffman
    "The Nature of Code"
    "Learning Processing"

Keith Peters
    [codingmath](https://www.youtube.com/@codingmath/)
    there are also some books under his name. look it up.

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
