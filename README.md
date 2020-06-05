Design

To be able to change the prcicing data regularly a JSON file will be passed in containing the pricing information. This will look something like this :
{
    item:"apple",
    price:0.15,
    offer{type:"multibuy",
          qty:3
          discount:0.2}
}

There could be different types of offer in the future eg Buy one get one free or just 20% discount. This format will be able to handle those. The code would check the type and then apply a rule.

The screen layout will have 2 areas:
      A header area with a dropdown list showing the items available to buy a quantity field for how many of this item they want and an ADD button to add the item to the basket.

      The lower part of the screen will have a list of the items added to the basket with a running total at the bottom.

Each time an item is selected it will be added to an array. The code will check if the item already exists and if so just update the quantity.

Each time a new item is added to the shopping basket the code will check if there is an offer to apply and a running total will be maintained.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

