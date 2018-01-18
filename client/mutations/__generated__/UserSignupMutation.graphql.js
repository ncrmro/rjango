/**
 * @flow
 * @relayHash f01da33c11da10c44bbc2fda10ff44fc
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UserSignupMutationVariables = {|
  input: {
    email: string;
    password: string;
    clientMutationId?: ?string;
  };
|};
export type UserSignupMutationResponse = {|
  +signup: ?{|
    +authFormPayload: ?{|
      +__typename: "Viewer";
      +id: string;
      +tokens: ?{|
        +__typename: "TokensSuccess";
        +token: ?string;
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
mutation UserSignupMutation(
  $input: SignupUserMutationInput!
) {
  signup(input: $input) {
    authFormPayload {
      __typename
      ... on Viewer {
        id
        tokens {
          __typename
          ... on TokensSuccess {
            token
          }
        }
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
        "type": "SignupUserMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSignupMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "SignupUserMutationInput!"
          }
        ],
        "concreteType": "SignupUserMutationPayload",
        "name": "signup",
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
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
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
  "name": "UserSignupMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "SignupUserMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UserSignupMutation",
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
            "type": "SignupUserMutationInput!"
          }
        ],
        "concreteType": "SignupUserMutationPayload",
        "name": "signup",
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
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
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
    ]
  },
  "text": "mutation UserSignupMutation(\n  $input: SignupUserMutationInput!\n) {\n  signup(input: $input) {\n    authFormPayload {\n      __typename\n      ... on Viewer {\n        id\n        tokens {\n          __typename\n          ... on TokensSuccess {\n            token\n          }\n        }\n      }\n      ... on FormErrors {\n        errors {\n          key\n          message\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
