import React, {ReactElement, useEffect, useMemo} from 'react';

import { repeat, seq } from '../../helpers/AsyncFunctions/helpers';
import on from '../../helpers/AsyncFunctions/on';
import Model from "./Model/Model";
import { on as viewOn } from '../../helpers/visitor';
import { renderToStaticMarkup } from "react-dom/server"

const DraggableCanvas = () => {
  const model = [
    <div>
      0         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
    </div>,
    <div>
      1         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
    </div>,
    <div>
      2         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
    </div>,
    <div>
      3         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
    </div>,
    <div>
      4         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
    </div>,

  ];
  //
  // function a(el: JSX.Element): ReactElement {
  //   return el;
  // }
  //
  // const b = a(<div>
  //   0         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
  // </div>)
  // model.push(b)
  //
  // console.log(model)

  const getNextElement = (cursorPosition: any, currentElement: any) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;

    return nextElement;
  };

  useEffect(() => {
    const container = document.getElementById('container');

    (async function () {
      const dnd = repeat(() => seq(
        on(container!, 'dragover'),
        on(container!, 'touchmove'),
      ));

      for await (const ev of dnd) {
        const activeElement = container!.querySelector('.box');
        const items = document.querySelectorAll('.items');
        const currentElement = (ev.target as Element).classList.contains('items') ? ev.target : activeElement;
        const nextElement = getNextElement((ev as DragEvent).clientY, currentElement);

        if (nextElement === items[items.length - 1]) {
          activeElement &&
          activeElement.parentNode!.insertBefore(activeElement, nextElement.nextElementSibling)
        } else {
          activeElement && activeElement.parentNode!.insertBefore(activeElement, nextElement)
        }
      }
    }());
  }, []);

  return (
    <div className="mobile-container">
      <div id="container" className="container-mobile-radius">
        <Model data={model} />
      </div>
      {/*<ControlBlock />*/}
    </div>
  );
};

export { DraggableCanvas };
