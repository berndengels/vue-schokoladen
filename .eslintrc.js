module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node" : true,
        "jquery" : true,
        "amd": true,
    },
    "extends": [
//        "standard",
        "eslint:recommended",
//        "plugin:vue/essential",
        "plugin:vue/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "iAxios": false,
        "axiosCache": false,
        "apiURL": false,

    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "vue/html-closing-bracket-newline": "error",
        "vue/html-closing-bracket-spacing": "error",
        "vue/prop-name-casing": "error",
        "vue/max-attributes-per-line": "off",
        "vue/no-v-html": "off",
        "vue/require-prop-types": "off",
        "vue/no-use-v-if-with-v-for": ["error", {
            "allowUsingIterationVar": true,
        }],
        "allowEmptyCatch": "off",
        "no-empty": "off",
        "no-unused-vars": "off",
        "no-extra-boolean-cast": "off",
    }
};
