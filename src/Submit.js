import gql from 'graphql-tag';
import {GRAPHQL_HOST} from "./settings";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

// mutation {
//   CreateAnnotation (
//     target: "http://localhost:4000/uuid#media-fragment"
//     creator: "URL or text"
//     created: {
//       year: 2019, month: 8, day:5, minute:10, hour: 14, second:0
//     }
//     motivation: [bookmarking, describing]
//     body: "Any URL or Text"
//   ) {
//     identifier
//   }
// }

const CREATE_ANNOTATION_URL_BODY = gql`
mutation CreateAnnotation($target: [URL], $creator: URL!, $created: String!, $motivation: [AnnotationMotivation], $body: URL )  {
  CreateAnnotation (
    target: $target
    creator: $creator
    created: $created
    motivation: $motivation
    body: $body
  ) {
    identifier
  }
}
`;

const CREATE_ANNOTATION_NO_BODY = gql`
    mutation CreateAnnotation($target: [URL], $creator: URL!, $motivation: [AnnotationMotivation])  {
        CreateAnnotation (
            target: $target
            creator: $creator
            created: {
                year: 2019, month: 8, day:5, minute:10, hour: 14, second:0
            }
            motivation: $motivation
        ) {
            identifier
        }
    }
`;

const CREATE_TEXTUAL_BODY = gql`
    mutation CreateTextualBody($body: String!)  {
        CreateTextualBody (
            format: "text/plain"
            language: en
            value: $body
            type: "http://www.w3.org/ns/oa#TextualBody"
        ) {
            identifier
        }
    }
`;

const ADD_ANNOTATION_TEXTUAL_BODY = gql`
    mutation AddAnnotationTextualBody($annotationId: ID!, $textualBodyId: ID!) {
        AddAnnotationTextualBody (
            from: {identifier: $annotationId}
            to: {identifier: $textualBodyId}
        ) {
            to {
                type
            }
        }
    }
    `;


function submit_textual_body(params) {
    client.mutate({
        mutation: CREATE_ANNOTATION_URL_BODY,
        variables: {
            target: params.target,
            creator: 'creator',
            created: created,
            body: 'body',
            motivation: ['bookmarking']
        }
    }).then(result => console.log(result));
}

const MOTIVATION_URIS = {
    highlighting: "http://www.w3.org/ns/oa#highlighting",
    describing: "http://www.w3.org/ns/oa#describing",
    linking: "http://www.w3.org/ns/oa#linking"
};

/**
 *
 * @param params object with keys
 *         - target, creator, motivation, body, textualBody
 *         set one of body (uri) or textualBody (text)
 */
export function submit(params) {
    const now = new Date(Date.now());
    let created = now.toISOString();

    if (params.textualBody !== undefined) {
        submit_textual_body(params);
    } else if (params.body) {
        submit_uri_body(params);
    }


}

