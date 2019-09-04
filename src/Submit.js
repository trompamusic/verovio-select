import gql from 'graphql-tag';
import {GRAPHQL_HOST, APP_LOCATION} from "./settings";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: GRAPHQL_HOST,
});

const CREATE_ANNOTATION_URL_BODY = gql`
mutation CreateAnnotation($target: [URL], $creator: URL!, $created: String!, $motivation: [URL], $body: [URL] )  {
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
    mutation CreateAnnotation($target: [URL], $creator: URL!, $created: String!, $motivation: [URL])  {
        CreateAnnotation (
            target: $target
            creator: $creator
            created: $created
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

function submit_textual_body(params) {
    client.mutate({
        mutation: CREATE_TEXTUAL_BODY,
        variables: {
            body: params.textualBody,
        }
    }).then(result => {
        const textIdentifier = result.data.CreateTextualBody.identifier;

        // TODO: super hacky, needs to know its mountpoint
        const body = APP_LOCATION + textIdentifier;
        let vars = {
            target: params.target,
            creator: 'Dummy creator',
            created: params.created,
            body: [body],
            motivation: [MOTIVATION_URIS.describing]
        };
        return client.mutate({
            mutation: CREATE_ANNOTATION_URL_BODY,
            variables: vars
        })
    }).then(
        result => console.log(result)
    ).catch(result => console.log(result));
}

function submit_uri_body(params) {
    // TODO: No check that params.body is actually an array
    const vars = {
        target: params.target,
        creator: 'Dummy creator',
        created: params.created,
        body: params.body,
        motivation: [MOTIVATION_URIS.linking]
    };
    client.mutate({
        mutation: CREATE_ANNOTATION_URL_BODY,
        variables: vars
    }).then(
        result => console.log(result)
    ).catch(result => console.log(result));
}

function submit_highlight(params) {
    client.mutate({
        mutation: CREATE_ANNOTATION_NO_BODY,
        variables: {
            target: params.target,
            creator: 'Dummy creator',
            created: params.created,
            motivation: [MOTIVATION_URIS.highlighting]
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
    params.created = now.toISOString();;

    if (params.textualBody !== undefined) {
        // Text description
        submit_textual_body(params);
    } else if (params.body !== undefined) {
        // Link to external description
        submit_uri_body(params);
    } else {
        // highlight
        submit_highlight(params);
    }


}

