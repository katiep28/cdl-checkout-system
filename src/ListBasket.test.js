import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ListItems from './ListBasket';
import ListBasket from './ListBasket';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



it("renders when no details are passed or value missing", () => {

  act(() => {
    render(<ListBasket name="" qty=""  itemTotal= ""/>, 
    container);
  });
  expect(container.textContent).toBe("");
  
  act(() => {
    render(<ListBasket name="grapes" qty=""  itemTotal= ""/>, 
    container);
  });
  expect(container.textContent).toBe("grapes");

  act(() => {
    render(<ListBasket name="" qty="2"  itemTotal= ""/>, 
    container);
  });
  expect(container.textContent).toBe("2");


  act(() => {
    render(<ListBasket name="" qty=""  itemTotal= "1.60"/>, 
    container);
  });
  expect(container.textContent).toBe("1.60");
});

it("renders when with correct details", () => {

  act(() => {
    render(<ListBasket name="plums" qty="4"  itemTotal= "1.15"/>, 
    container);
  });
  expect(container.textContent).toBe("plums41.15");

});

