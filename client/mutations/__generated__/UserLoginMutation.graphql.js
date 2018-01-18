/**
 * @flow
 * @relayHash 05323c9c1b1ac8b9a796371f11676e98
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UserLoginMutationVariables = {|
  input: {
    email: string;
    password: string;
    clientMutationId?: ?string;
  };
|};
export type UserLoginMutationResponse = {|
  +login: ?{|
    +authFormPayload: ?{|
      +__typename: "Viewer";
      +tokens: ?{|
        +__typename: "TokensSuccess";
        +token: ?string;
      |} | {|
        +__typename: "TokenError";
        +error: ?string;
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other";
      |};
    |} | {|
      +__typename: "FormErrors";
      +errors: ?$ReadOnlyArray<?{|
        +key: ?string;
        +message: string;
      |}>;
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other";
    |};
  |};
|};
*/


/*
mutation UserLoginMutation(
  $input: LoginMutationInput!
) {
  login(input: $input) {
    authFormPayload {
      __typename
      ... on Viewer {
        tokens {
          __typename
          ... on TokensSuccess {
            token
          }
          ... on TokenError {
            error
          }
        }
        id
      }
      ... on FormErrors {
        errors {
          key
          message
        }
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserLoginMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginMutationInput!"
          }
        ],
        "concreteType": "LoginMutationPayload",
        "name": "login",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": null,
            "name": "authFormPayload",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "FormErrors",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Error",
                    "name": "errors",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "key",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "message",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Viewer",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "name": "tokens",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "TokenError",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "error",
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "TokensSuccess",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "token",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UserLoginMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UserLoginMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginMutationInput!"
          }
        ],
        "concreteType": "LoginMutationPayload",
        "name": "login",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": null,
            "name": "authFormPayload",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "FormErrors",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Error",
                    "name": "errors",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "key",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "message",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Viewer",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "name": "tokens",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "TokenError",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "error",
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "TokensSuccess",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "token",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation UserLoginMutation(\n  $input: LoginMutationInput!\n) {\n  login(input: $input) {\n    authFormPayload {\n      __typename\n      ... on Viewer {\n        tokens {\n          __typename\n          ... on TokensSuccess {\n            token\n          }\n          ... on TokenError {\n            error\n          }\n        }\n        id\n      }\n      ... on FormErrors {\n        errors {\n          key\n          message\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
