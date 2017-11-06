# eslint-plugin-log-context

log context should be setup and clean before running and closing a function

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-log-context`:

```
$ npm install eslint-plugin-log-context --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-log-context` globally.

## Usage

Add `log-context` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "log-context"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "log-context/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





