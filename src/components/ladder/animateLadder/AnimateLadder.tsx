import React, { useEffect, useState } from "react";
import calculateBoundingBoxes from "@/components/utils/utility";
import usePrevious from "@/hooks/usePrevious";

const AnimateLadder = ({ children }) => {
    const [boundingBox, setBoundingBox] = useState({});
    const [prevBoundingBox, setPrevBoundingBox] = useState({});
    const prevChildren = usePrevious(children);

    useEffect(() => {
        const newBoundingBox = calculateBoundingBoxes(children);
        setBoundingBox(newBoundingBox);
      }, [children]);
    
      useEffect(() => {
        const prevBoundingBox = calculateBoundingBoxes(prevChildren);
        setPrevBoundingBox(prevBoundingBox);
      }, [prevChildren]);
    

    useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;


    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInTop = firstBox.top - lastBox.top;

        if (changeInTop) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInTop}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              // After the previous frame, remove
              // the transistion to play the animation
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);
      return children;
  
  };


export default AnimateLadder;



