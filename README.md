Todo Test Suite using Github Workflows

The Playwright library comes with an example test suite run on a single page Todo web application. In this project I've reimplemented those tests to be succinct and readable. Since this is a single page React app I created component objects instead of page objects to keep selectors, functions and component specific data organized and abstracted. Additionally, I've added a GitHub workflow so the tests run when a push is made to any branch.
