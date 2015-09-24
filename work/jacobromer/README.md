## Quantitative Data Assignment

Source code for the assignment can be found in [quantitativeData/](quantitativeData/), the relevant files are in the [src/ directory](quantitativeData/src/).

The assignment can be viewed at http://jacobmbr.github.io/major-studio-undp

To run it locally:
- Clone the repo
- `cd` into quantitativeData/
- `npm install`
- `npm run start`
- `http://localhost:3000`

Alternatively, clone and open [quantitativeData/dist/index.html](quantitativeData/dist/index.html) in a browser.

## Caveats

- Doesn't properly deal with missing data yet, `N/A` or `..` in the dataset is displayed as ~~`strike-through`~~.
- Color coding is based on arbitrarily chosen thresholds and should be rethought as dynamic.
- Pluralization should be dynamic based on value (eg. `1 years of schooling`)
